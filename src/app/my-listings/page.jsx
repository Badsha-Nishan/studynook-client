"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Pencil, Trash2, MapPin, Users, DollarSign, Plus } from "lucide-react";

const myRooms = [
  {
    id: 1,
    name: "Quiet Focus Zone",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    floor: "3rd Floor",
    capacity: 4,
    price: 5,
    bookings: 18,
  },
  {
    id: 2,
    name: "Creative Study Hub",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    floor: "5th Floor",
    capacity: 8,
    price: 8,
    bookings: 27,
  },
  {
    id: 3,
    name: "Minimal Reading Corner",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    floor: "2nd Floor",
    capacity: 2,
    price: 4,
    bookings: 12,
  },
];

export default function MyListingsPage() {
  const handleDelete = (id) => {
    console.log("Delete Room:", id);

    // DELETE API HERE
  };

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
              View, edit, and manage all your listed study rooms from one
              beautiful dashboard.
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

        {/* EMPTY STATE */}
        {myRooms.length === 0 ? (
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
            {myRooms.map((room, index) => (
              <motion.div
                key={room.id}
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
                    ${room.price}/hr
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* TITLE */}
                  <h2 className="text-2xl font-bold text-white">{room.name}</h2>

                  {/* INFO */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin size={18} className="text-cyan-300" />

                      <span>{room.floor}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300">
                      <Users size={18} className="text-cyan-300" />

                      <span>Capacity: {room.capacity} People</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300">
                      <DollarSign size={18} className="text-cyan-300" />

                      <span>Total Bookings: {room.bookings}</span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-8 flex gap-4">
                    {/* EDIT */}
                    <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400/20">
                      <Pencil size={18} />
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
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
