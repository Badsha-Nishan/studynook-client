"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const validations = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
  };
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (
      !validations.length ||
      !validations.uppercase ||
      !validations.lowercase
    ) {
      return;
    }

    // REGISTER LOGIC HERE

    const { data, error } = await authClient.signUp.email({
      name: user?.name,
      email: user?.email,
      image: user?.image,
      password: user?.password,
    });

    if (data) {
      toast.success("Registration successful! Please login.");
      router.push("/login");
      router.refresh();
    }
    if (error) {
      toast.error(`Failed! ${error.message}`);
    }
  };

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1120] px-4 py-20">
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

      {/* CARD */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        {/* TOP */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/20">
            <span className="text-2xl font-black text-white">S</span>
          </div>

          <h1 className="text-4xl font-black text-white">Create Account</h1>

          <p className="mt-3 text-slate-400">
            Join StudyNook and start booking smart study spaces.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          {/* PHOTO URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Photo URL
            </label>

            <div className="relative">
              <ImageIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                name="image"
                type="text"
                placeholder="Paste your profile image URL"
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {/* VALIDATION */}
            <div className="mt-4 space-y-2">
              <ValidationItem
                valid={validations.length}
                text="At least 6 characters"
              />

              <ValidationItem
                valid={validations.uppercase}
                text="At least one uppercase letter"
              />

              <ValidationItem
                valid={validations.lowercase}
                text="At least one lowercase letter"
              />
            </div>
          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
          >
            Register
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10"></div>

          <span className="text-sm text-slate-500">OR CONTINUE WITH</span>

          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleSignIn}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="mt-8 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-cyan-400 transition-all hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

/* VALIDATION ITEM */
function ValidationItem({ valid, text }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {valid ? (
        <CheckCircle2 size={16} className="text-green-400" />
      ) : (
        <XCircle size={16} className="text-red-400" />
      )}

      <span className={valid ? "text-green-400" : "text-red-400"}>{text}</span>
    </div>
  );
}
