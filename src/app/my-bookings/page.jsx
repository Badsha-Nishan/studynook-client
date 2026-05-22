"use client";

import useTitle from "@/components/shared/useTitle";
import { authClient } from "@/lib/auth-client";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  useTitle("StudyNook | My Bookings");
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${user.id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setBookings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, [user?.id]);

  const handleCancel = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) {
      toast.error("Booking cancellation aborted");
      return;
    }

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        const remaining = bookings.filter((booking) => booking._id !== id);

        setBookings(remaining);

        toast.success("Booking cancelled successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-[#0B1120] px-4 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold md:text-5xl">My Bookings</h1>

        <p className="mt-3 text-slate-400">Manage your booked study rooms</p>

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
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <img
                      src={booking.image}
                      alt="Image"
                      className="w-12 h-12 rounded-full object-cover"
                    />{" "}
                    {booking.roomName}
                  </td>

                  <td className="px-6 py-4 text-slate-300">{booking.date}</td>

                  <td className="px-6 py-4 text-slate-300">
                    {booking.startTime} - {booking.endTime}
                  </td>

                  <td className="px-6 py-4 font-semibold text-cyan-300">
                    ${booking.totalCost}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
                      confirmed
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="mt-10 text-center text-slate-400">
            You have no bookings yet.
          </div>
        )}
      </div>
    </section>
  );
}
