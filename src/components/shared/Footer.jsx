import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B1120]">
      {/* GRADIENT GLOW */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/20">
                <span className="text-xl font-black text-white">S</span>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  StudyNook
                </h2>
                <p className="-mt-1 text-sm text-slate-400">
                  Smart Study Booking
                </p>
              </div>
            </div>

            <p className="max-w-sm leading-relaxed text-slate-400">
              Discover quiet and modern study rooms for focused learning. Book
              your perfect environment anytime, anywhere.
            </p>

            {/* SOCIALS */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://www.facebook.com/badsha.nishan"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-white"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="https://x.com/Badsha2Nishan"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-white"
              >
                <FaXTwitter size={18} />
              </Link>

              <Link
                href="https://www.linkedin.com/in/badsha-nishan"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </Link>

              <Link
                href="https://www.instagram.com"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:text-white"
              >
                <FaInstagram size={18} />
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                Home
              </Link>

              <Link
                href="/rooms"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                Rooms
              </Link>

              <Link
                href="/add-room"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                Add Room
              </Link>

              <Link
                href="/my-bookings"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                My Bookings
              </Link>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Resources</h3>

            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                Terms & Conditions
              </Link>

              <Link
                href="#"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                Support Center
              </Link>

              <Link
                href="#"
                className="text-slate-400 transition-all hover:translate-x-1 hover:text-cyan-400"
              >
                Help & FAQ
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Contact Us</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white">badshanisan14@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-white">+880 1886-862697</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-cyan-400" />

                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-white">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} StudyNook-Badsha. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Crafted for focused learners 📚
          </p>
        </div>
      </div>
    </footer>
  );
}
