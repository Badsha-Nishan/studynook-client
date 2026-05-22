import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import useTitle from "@/components/shared/useTitle";

export default function NotFound() {
  useTitle("StudyNook | Not Found");
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1120] px-4">
      {/* BG GLOW */}
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

      {/* CONTENT */}
      <div className="relative text-center">
        {/* 404 */}
        <h1 className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-8xl font-black text-transparent md:text-[180px]">
          404
        </h1>

        {/* TITLE */}
        <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
          Page Not Found
        </h2>

        {/* DESC */}
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>

        {/* BUTTON */}
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-7 py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.03]"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
