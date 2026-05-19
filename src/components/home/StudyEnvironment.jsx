"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Wifi,
  Coffee,
  Lightbulb,
  ShieldCheck,
  VolumeX,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen size={28} />,
    title: "Focused Learning",
    description:
      "Designed for distraction-free study sessions so you can stay productive and fully concentrated.",
  },
  {
    icon: <Wifi size={28} />,
    title: "High-Speed Wi-Fi",
    description:
      "Enjoy uninterrupted internet access for research, online classes, and collaborative work.",
  },
  {
    icon: <Coffee size={28} />,
    title: "Comfort & Relaxation",
    description:
      "Cozy seating, calming interiors, and refreshing environments built for long study hours.",
  },
  {
    icon: <Lightbulb size={28} />,
    title: "Creative Atmosphere",
    description:
      "Bright modern spaces that inspire creativity, brainstorming, and productive teamwork.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Booking",
    description:
      "Book rooms safely with protected access, verified users, and real-time availability updates.",
  },
  {
    icon: <VolumeX size={28} />,
    title: "Quiet Zones",
    description:
      "Dedicated silent areas perfect for exam preparation, reading, and deep focus sessions.",
  },
];

export default function StudyEnvironment() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24">
      {/* BG EFFECTS */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            Better Study Experience
          </div>

          <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
            Built For Productive & Comfortable Learning
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            StudyNook provides modern, peaceful, and fully equipped study
            environments where students can focus, collaborate, and achieve more
            every day.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
                alt="Study Environment"
                className="h-[650px] w-full object-cover"
              />
            </div>

            {/* FLOATING CARD */}
            <div className="absolute -bottom-8 left-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-3xl font-black text-white">98%</h3>

              <p className="mt-1 text-slate-300">Student Satisfaction</p>
            </div>
          </motion.div>

          {/* RIGHT FEATURES */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/10"
              >
                {/* ICON */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 text-cyan-300 transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-4 leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
