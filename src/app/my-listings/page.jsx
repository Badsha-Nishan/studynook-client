"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, DollarSign, Plus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";



export default function MyListingsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/add-room");

        if (!res.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await res.json();

        setRooms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

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
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              Manage Your Rooms
            </div>

            <h1 className="text-4xl font-black text-white md:text-5xl">
              My Listings
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
              View all your listed study rooms beautifully in one place.
            </p>
          </div>

          {/* ADD ROOM BUTTON */}
          <Link
            href="/add-room"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-7 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.03]"
          >
            <Plus size={20} />
            Add New Room
          </Link>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <h2 className="text-2xl font-bold text-white">Loading rooms...</h2>
          </div>
        ) : rooms.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 text-center backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-white">No Listings Found</h2>

            <p className="mt-4 text-slate-400">
              You haven&apos;t added any study rooms yet.
            </p>

            <Link
              href="/add-room"
              className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 font-semibold text-white"
            >
              Add Your First Room
            </Link>
          </div>
        ) : (
          /* ROOMS GRID */
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room, index) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
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
                    ${room.hourlyRate}/hr
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* TITLE */}
                  <h2 className="text-2xl font-bold text-white">
                    {room?.roomName}
                  </h2>

                  {/* INFO */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin size={18} className="text-cyan-300" />

                      <span>{room.floor}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300">
                      <Users size={18} className="text-cyan-300" />

                      <span>{room.capacity}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300">
                      <DollarSign size={18} className="text-cyan-300" />

                      <span>${room.hourlyRate} per hour</span>
                    </div>
                  </div>

                  {/* VIEW DETAILS BUTTON */}
                  <Link
                    href={`/rooms/${room._id}`}
                    className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
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
