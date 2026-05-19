"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  ShieldCheck,
  BadgeDollarSign,
  CalendarCheck2,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    icon: <CalendarCheck2 size={28} />,
    title: "Easy Room Booking",
    description:
      "Reserve your ideal study space in just a few clicks with our smooth and modern booking system.",
  },
  {
    icon: <Clock3 size={28} />,
    title: "Real-Time Availability",
    description:
      "Instantly check room availability and avoid booking conflicts with smart scheduling.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Authentication",
    description:
      "Your account and bookings are protected using JWT authentication and secure access control.",
  },
  {
    icon: <BadgeDollarSign size={28} />,
    title: "Affordable Pricing",
    description:
      "Find premium study environments at student-friendly hourly rates without hidden costs.",
  },
  {
    icon: <Users size={28} />,
    title: "Perfect For Teams",
    description:
      "Book collaborative spaces for group discussions, projects, and brainstorming sessions.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Modern Experience",
    description:
      "Enjoy a sleek, responsive, and distraction-free platform designed for modern learners.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-24">
      {/* BG EFFECT */}
      <div className="absolute left-[-120px] top-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-[-120px] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            Why Students Love StudyNook
          </div>

          <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
            Everything You Need For Better Study Sessions
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            StudyNook combines comfort, technology, and simplicity to create the
            ultimate room booking experience for focused learning and
            collaboration.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/10"
            >
              {/* HOVER GLOW */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100"></div>

              {/* ICON */}
              <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-cyan-300 transition-all duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="relative z-10 text-2xl font-bold text-white">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="relative z-10 mt-4 leading-relaxed text-slate-400">
                {item.description}
              </p>

              {/* NUMBER */}
              <div className="absolute bottom-5 right-6 text-6xl font-black text-white/[0.04]">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-10 backdrop-blur-xl">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-3xl font-black text-white md:text-4xl">
                Ready To Find Your Perfect Study Space?
              </h3>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
                Join thousands of students already using StudyNook to discover
                peaceful, productive, and fully equipped study rooms.
              </p>
            </div>

            <Link
              href="/rooms"
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.03]"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
