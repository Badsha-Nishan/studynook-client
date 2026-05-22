"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  MapPin,
  Wifi,
  Monitor,
  Snowflake,
} from "lucide-react";
import { useEffect, useState } from "react";

const amenityIcons = {
  "Wi-Fi": <Wifi size={14} />,
  Projector: <Monitor size={14} />,
  AC: <Snowflake size={14} />,
};

export default function FeaturedRooms() {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/add-room`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await res.json();

        setFeaturedRooms(data.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedRooms();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-24">
      {/* BG GLOW */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* SECTION HEADER */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              Featured Study Spaces
            </div>

            <h2 className="max-w-2xl text-4xl font-black leading-tight text-white md:text-5xl">
              Explore Our Most Popular Study Rooms
            </h2>
          </div>

          <Link
            href="/rooms"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
          >
            View All Rooms
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <h2 className="text-2xl font-bold text-white">
              Loading featured rooms...
            </h2>
          </div>
        ) : featuredRooms.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-white/10 bg-white/5">
            <h2 className="text-2xl font-bold text-white">
              No Rooms Available
            </h2>
          </div>
        ) : (
          /* ROOMS GRID */
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featuredRooms.map((room, index) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.roomName}
                    className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>

                  {/* PRICE */}
                  <div className="absolute right-5 top-5 rounded-2xl bg-cyan-400/20 px-4 py-2 text-sm font-bold text-cyan-300 backdrop-blur-md">
                    ${room.hourlyRate}/hr
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* TITLE */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {room.roomName}
                      </h3>

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
                    {room.amenities?.map((item, idx) => (
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
                  <div className="mt-auto">
                    <Link
                      href={`/rooms/${room._id}`}
                      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-4 font-semibold text-white shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02]"
                    >
                      View Details
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
