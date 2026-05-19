"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Search,
  SlidersHorizontal,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Snowflake,
  ArrowRight,
} from "lucide-react";

const roomsData = [
  {
    id: 1,
    name: "Quiet Focus Zone",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    description:
      "Peaceful environment designed for deep focus and distraction-free learning sessions.",
    floor: "3rd Floor",
    capacity: "2-4 People",
    price: 5,
    amenities: ["Wi-Fi", "Projector", "AC"],
  },
  {
    id: 2,
    name: "Creative Study Hub",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    description:
      "Modern collaborative room for brainstorming, discussions, and productive teamwork.",
    floor: "5th Floor",
    capacity: "4-8 People",
    price: 8,
    amenities: ["Wi-Fi", "Whiteboard", "Projector"],
  },
  {
    id: 3,
    name: "Minimal Reading Corner",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    description:
      "Cozy and minimal room with calming interiors perfect for solo study and reading.",
    floor: "2nd Floor",
    capacity: "1-2 People",
    price: 4,
    amenities: ["Quiet Zone", "Wi-Fi", "Power Outlets"],
  },
  {
    id: 4,
    name: "Innovation Workspace",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=1200&auto=format&fit=crop",
    description:
      "Premium study room equipped with modern facilities and a creative atmosphere.",
    floor: "7th Floor",
    capacity: "5-10 People",
    price: 10,
    amenities: ["AC", "Wi-Fi", "Projector"],
  },
];

const filters = [
  "Wi-Fi",
  "Projector",
  "Whiteboard",
  "Quiet Zone",
  "Power Outlets",
  "AC",
];

const amenityIcons = {
  "Wi-Fi": <Wifi size={14} />,
  Projector: <Monitor size={14} />,
  AC: <Snowflake size={14} />,
};

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (item) => {
    if (selectedFilters.includes(item)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== item));
    } else {
      setSelectedFilters([...selectedFilters, item]);
    }
  };

  const filteredRooms = roomsData.filter((room) => {
    const matchSearch = room.name.toLowerCase().includes(search.toLowerCase());

    const matchFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((filter) => room.amenities.includes(filter));

    return matchSearch && matchFilters;
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1120] px-4 py-20">
      {/* BG EFFECTS */}
      <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-3xl"></div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            Explore Study Spaces
          </div>

          <h1 className="text-4xl font-black text-white md:text-5xl">
            Available Study Rooms
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            Discover modern, quiet, and fully equipped study environments
            tailored for focused learning and collaboration.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          {/* SEARCH */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search study rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-14 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
            />
          </div>

          {/* FILTERS */}
          <div className="mt-6">
            <div className="mb-4 flex items-center gap-2 text-slate-300">
              <SlidersHorizontal size={18} />
              <span className="font-medium">Filter By Amenities</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {filters.map((item, index) => {
                const active = selectedFilters.includes(item);

                return (
                  <button
                    key={index}
                    onClick={() => handleFilterChange(item)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredRooms.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 text-center backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white">No Rooms Found</h2>

            <p className="mt-4 text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          /* ROOM GRID */
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent"></div>

                  {/* PRICE */}
                  <div className="absolute right-5 top-5 rounded-2xl bg-cyan-400/20 px-4 py-2 text-sm font-bold text-cyan-300 backdrop-blur-md">
                    ${room.price}/hr
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* TITLE */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {room.name}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                        <MapPin size={15} />
                        {room.floor}
                      </div>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-5 line-clamp-3 leading-relaxed text-slate-400">
                    {room.description}
                  </p>

                  {/* CAPACITY */}
                  <div className="mt-5 flex items-center gap-2 text-slate-300">
                    <Users size={18} className="text-cyan-300" />

                    <span className="text-sm">{room.capacity}</span>
                  </div>

                  {/* AMENITIES */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {room.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
                      >
                        {amenityIcons[item]}
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* BUTTON */}
                  <Link
                    href={`/rooms/${room.id}`}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-4 font-semibold text-white shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02]"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
