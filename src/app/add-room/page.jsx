"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  Layers3,
  Users,
  DollarSign,
  FileText,
  DoorOpen,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/components/shared/useTitle";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function AddRoomPage() {
  useTitle("StudyNoook | Add Room");

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const router = useRouter();

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const form = e.target;

    const imageUrl = form.image.value;

    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (!isValidUrl(imageUrl)) {
      toast.error("Please enter a valid image URL");
      return;
    }

    const { data: session } = await authClient.getSession();

    const user = session?.user;

    const roomData = {
      roomName: form.roomName.value,
      description: form.description.value,
      image: imageUrl,
      floor: form.floor.value,
      capacity: Number(form.capacity.value),
      hourlyRate: Number(form.hourlyRate.value),
      amenities: selectedAmenities,

      ownerEmail: user?.email,
      ownerName: user?.name,
      ownerId: user?.id,
      createdAt: user?.createdAt,
    };

    try {
      const { data: tokenData } = await authClient.token();

      const token = tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add room");
        return;
      }

      toast.success("Room Added Successfully.");

      router.push("/rooms");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1120] px-4 py-20">
      <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-3xl"></div>

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

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            Create New Study Space
          </div>

          <h1 className="text-4xl font-black text-white md:text-5xl">
            Add A New Study Room
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            Share your study room with students and help them discover the
            perfect environment for productive learning.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl md:p-10">
          <form onSubmit={handleAddRoom} className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Room Name
              </label>

              <div className="relative">
                <DoorOpen
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="roomName"
                  required
                  placeholder="Enter room name"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Room Image URL
              </label>

              <div className="relative">
                <ImageIcon
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Paste image URL"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Floor
              </label>

              <div className="relative">
                <Layers3
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="floor"
                  required
                  placeholder="e.g. 3rd Floor"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Seat Capacity
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="number"
                  name="capacity"
                  required
                  placeholder="e.g. 4"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Hourly Rate ($)
              </label>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="number"
                  name="hourlyRate"
                  required
                  placeholder="e.g. 5"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="hidden md:block"></div>

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Description
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-5 text-slate-500"
                />

                <textarea
                  name="description"
                  rows="5"
                  required
                  placeholder="Describe the room, environment, and facilities..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 pt-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                ></textarea>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-5 block text-sm font-medium text-slate-300">
                Select Amenities
              </label>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {amenitiesList.map((amenity, index) => {
                  const selected = selectedAmenities.includes(amenity);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAmenityChange(amenity)}
                      className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300 ${
                        selected
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30"
                      }`}
                    >
                      <span>{amenity}</span>

                      {selected && <Check size={18} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="mt-4 flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.01]"
              >
                Add Study Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
