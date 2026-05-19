"use client";

import { Trash2 } from "lucide-react";

const bookings = [
  {
    id: 1,
    room: "Quiet Focus Zone",
    date: "22 May 2026",
    time: "10:00 - 13:00",
    cost: 15,
    status: "confirmed",
  },
  {
    id: 2,
    room: "Creative Study Hub",
    date: "25 May 2026",
    time: "14:00 - 17:00",
    cost: 24,
    status: "confirmed",
  },
  {
    id: 3,
    room: "Minimal Reading Corner",
    date: "15 May 2026",
    time: "09:00 - 11:00",
    cost: 8,
    status: "cancelled",
  },
];

export default function MyBookingsPage() {
  const handleCancel = (id) => {
    console.log("Cancel booking:", id);
  };

  return (
    <section className="min-h-screen bg-[#0B1120] px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <h1 className="text-4xl font-bold md:text-5xl">My Bookings</h1>
        <p className="mt-3 text-slate-400">Manage your booked study rooms</p>

        {/* TABLE */}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-white/10 bg-white/5">
              <tr className="text-slate-300">
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  {/* ROOM */}
                  <td className="px-6 py-4 font-medium">{b.room}</td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-slate-300">{b.date}</td>

                  {/* TIME */}
                  <td className="px-6 py-4 text-slate-300">{b.time}</td>

                  {/* COST */}
                  <td className="px-6 py-4 text-cyan-300 font-semibold">
                    ${b.cost}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        b.status === "confirmed"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    {b.status === "confirmed" ? (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-red-400 hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={16} />
                        Cancel
                      </button>
                    ) : (
                      <span className="text-slate-500 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY NOTE */}
        {bookings.length === 0 && (
          <div className="mt-10 text-center text-slate-400">
            You have no bookings yet.
          </div>
        )}
      </div>
    </section>
  );
}
