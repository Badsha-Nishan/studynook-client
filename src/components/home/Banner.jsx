"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { MdStart } from "react-icons/md";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120]">
      {/* BACKGROUND GLOW */}
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-indigo-500/20 blur-3xl"></div>

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

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-4 py-20 md:px-8 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* BADGE */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
            <Sparkles size={16} />
            Smart Library Booking Platform
          </div>

          {/* HEADING */}
          <h1 className="max-w-2xl text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
            Find Your
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Perfect{" "}
            </span>
            Study Room
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Discover quiet, modern, and fully equipped study rooms for
            productive learning. Book your ideal environment anytime, anywhere.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/rooms"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-7 py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.03]"
            >
              Explore Rooms
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={"/rooms"}
              className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <MdStart />
              </div>
              Get Started
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-14 flex flex-wrap gap-8">
            <div>
              <h3 className="text-3xl font-black text-white">150+</h3>
              <p className="mt-1 text-slate-400">Study Rooms</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-white">10K+</h3>
              <p className="mt-1 text-slate-400">Happy Students</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-white">24/7</h3>
              <p className="mt-1 text-slate-400">Booking Access</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* MAIN IMAGE */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <img
              src="https://i.ibb.co/ZYW3VTp/study-room.jpg"
              alt="Study Room"
              className="h-[600px] w-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-transparent to-transparent"></div>

            {/* FLOATING CARD */}
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Featured Room</p>

                  <h3 className="mt-1 text-xl font-bold text-white">
                    Quiet Focus Zone
                  </h3>
                </div>

                <div className="rounded-2xl bg-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-300">
                  $5/hr
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                  Wi-Fi
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                  Air Conditioning
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                  Quiet Zone
                </span>
              </div>
            </div>
          </div>

          {/* FLOATING SMALL CARD */}
          <div className="absolute -left-8 top-12 hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl lg:block">
            <p className="text-sm text-slate-300">Available Today</p>

            <h3 className="mt-2 text-3xl font-black text-white">28</h3>
          </div>

          {/* FLOATING SMALL CARD */}
          <div className="absolute -bottom-6 right-10 hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl lg:block">
            <p className="text-sm text-slate-300">Average Rating</p>

            <h3 className="mt-2 text-3xl font-black text-white">4.9★</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
