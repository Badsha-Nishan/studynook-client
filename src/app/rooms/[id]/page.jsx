"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  DollarSign,
  Wifi,
  Monitor,
  Snowflake,
  VolumeX,
  PlugZap,
  CalendarDays,
} from "lucide-react";

import RoomEditModal from "@/components/RoomEditModal";
import DeleteAlert from "@/components/DeleteAlert";
import { authClient } from "@/lib/auth-client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const amenityIcons = {
  "Wi-Fi": <Wifi size={18} />,
  Projector: <Monitor size={18} />,
  "Air Conditioning": <Snowflake size={18} />,
  AC: <Snowflake size={18} />,
  "Quiet Zone": <VolumeX size={18} />,
  "Power Outlets": <PlugZap size={18} />,
};

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function RoomDetailsPage({ params }) {
  const { id } = use(params);

  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // FETCH ROOM DETAILS
  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);

        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
          {
            headers: token
              ? {
                  authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        const data = await res.json();

        setRoom(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120] text-3xl font-bold text-white">
        Loading...
      </div>
    );
  }

  // NO ROOM
  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1120] text-3xl font-bold text-red-400">
        Room Not Found
      </div>
    );
  }

  // TOTAL PRICE
  const calculateTotal = () => {
    if (!startTime || !endTime) return 0;

    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);

    return (end - start) * room?.hourlyRate;
  };

  // BOOKING
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const form = e.target;

    const date = form.date.value;

    const { _id, roomName, description, image, floor, capacity, hourlyRate } =
      room;

    const bookingData = {
      userId: user?.id,
      userEmail: user?.email,
      userImage: user?.image,
      userName: user?.name,
      roomId: _id,
      roomName,
      description,
      image,
      floor,
      capacity,
      hourlyRate,
      date,
      startTime,
      endTime,
      totalCost: calculateTotal(),
      status: "confirmed",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Booking failed!");
        return;
      }

      toast.success("Room Booked Successfully!");

      router.push("/my-bookings");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong!");
    }
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
        {/* TOP GRID */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <img
              src={room?.image}
              alt={room?.roomName}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              {/* BADGE */}
              <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                Premium Study Space
              </div>

              {/* TITLE */}
              <h1 className="text-4xl font-black text-white md:text-5xl">
                {room?.roomName}
              </h1>

              {/* INFO */}
              <div className="mt-6 flex flex-wrap gap-5">
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                  <MapPin size={18} className="text-cyan-300" />
                  {room?.floor}
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                  <Users size={18} className="text-cyan-300" />
                  {room?.capacity}
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                  <DollarSign size={18} className="text-cyan-300" />$
                  {room?.hourlyRate}/hr
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-8 text-lg leading-relaxed text-slate-400">
                {room?.description}
              </p>

              {/* BOOKINGS */}
              <div className="mt-8 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-cyan-300">
                {room?.bookingCount || 0} Bookings Completed
              </div>

              {/* AMENITIES */}
              <div className="mt-10">
                <h3 className="mb-5 text-2xl font-bold text-white">
                  Amenities
                </h3>

                <div className="flex flex-wrap gap-4">
                  {room?.amenities?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-slate-300"
                    >
                      <span className="text-cyan-300">
                        {amenityIcons[item]}
                      </span>

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* OWNER ACTIONS */}
            {user && (
              <div className="mt-10 flex flex-wrap gap-4">
                <RoomEditModal room={room} />

                <DeleteAlert room={room} />
              </div>
            )}
          </motion.div>
        </div>

        {/* BOOKING FORM */}
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10"
          >
            {/* HEADER */}
            <div className="mb-10">
              <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                Reserve Your Slot
              </div>

              <h2 className="text-4xl font-black text-white">
                Book This Study Room
              </h2>

              <p className="mt-4 text-lg text-slate-400">
                Choose your preferred date and time slot.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleBooking}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* DATE */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Booking Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    name="date"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* NOTE */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Special Note
                </label>

                <input
                  type="text"
                  placeholder="Optional note..."
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>

              {/* START */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Start Time
                </label>

                <select
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 text-white outline-none focus:border-cyan-400"
                >
                  <option value="">Select Start Time</option>

                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* END */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  End Time
                </label>

                <select
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#111827] px-4 text-white outline-none focus:border-cyan-400"
                >
                  <option value="">Select End Time</option>

                  {timeSlots
                    .filter((slot) => !startTime || slot > startTime)
                    .map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                </select>
              </div>

              {/* TOTAL */}
              <div className="md:col-span-2">
                <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-6">
                  <h3 className="text-lg font-semibold text-slate-300">
                    Total Booking Cost
                  </h3>

                  <h2 className="mt-2 text-5xl font-black text-cyan-300">
                    ${calculateTotal()}
                  </h2>
                </div>
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.01]"
                >
                  Book Now
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="mt-10">
            <Link
              href="/login"
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.01]"
            >
              Login to Book
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
