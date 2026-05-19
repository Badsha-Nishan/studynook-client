"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // temporary auth state
  const user = true;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
  ];

  const privateLinks = [
    { name: "Add Room", href: "/add-room" },
    { name: "My Listings", href: "/my-listings" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/20">
            <span className="text-lg font-black text-white">S</span>
          </div>

          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">
              StudyNook
            </h2>
            <p className="-mt-1 text-xs text-slate-400">Smart Study Booking</p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-5 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-4 lg:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-slate-300 transition-all hover:border-cyan-400 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.03]"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="group relative">
              <button className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition-all hover:bg-white/10">
                <Image
                  src="/logo.png"
                  alt="user"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="text-left">
                  <h4 className="text-sm font-semibold text-white">
                    Rakib Hasan
                  </h4>
                  <p className="text-xs text-slate-400">Student</p>
                </div>

                <ChevronDown
                  size={18}
                  className="text-slate-400 transition-transform group-hover:rotate-180"
                />
              </button>

              {/* DROPDOWN */}
              <div className="invisible absolute right-0 mt-3 w-56 translate-y-3 rounded-2xl border border-white/10 bg-[#111827] p-3 opacity-0 shadow-2xl shadow-black/30 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="mb-3 border-b border-white/10 pb-3">
                  <p className="font-semibold text-white">Rakib Hasan</p>
                  <p className="text-sm text-slate-400">rakib@gmail.com</p>
                </div>

                <div className="flex flex-col gap-1">
                  {privateLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="rounded-xl px-3 py-2 text-sm text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  ))}

                  <button className="mt-2 rounded-xl bg-red-500/10 px-3 py-2 text-left text-sm font-medium text-red-400 transition-all hover:bg-red-500/20">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0B1120] px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-2">
            {[...navLinks, ...(user ? privateLinks : [])].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-xl px-4 py-3 text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="mt-3 rounded-xl border border-white/10 px-4 py-3 text-center text-slate-300"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-center font-semibold text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <button className="mt-3 rounded-xl bg-red-500/10 px-4 py-3 text-left font-medium text-red-400">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
