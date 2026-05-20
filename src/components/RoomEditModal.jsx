import { Envelope, Pencil } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

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

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const RoomEditModal = ({ room }) => {
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

  return (
    <Modal>
      <div>
        <Button
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-8 font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400/20"
        >
          <Pencil size={18} />
          Edit Room
        </Button>
      </div>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-5xl bg-[#134E8E]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-white">Edit Room</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted text-white">
                Update the details of your room listing.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6 bg-[#134E8E]">
              <Surface className="bg-[#134E8E]" variant="default">
                <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl md:p-10">
                  <form
                    // onSubmit={handleAddRoom}
                    className="grid gap-8 md:grid-cols-2 "
                  >
                    {/* ROOM NAME */}
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
                          defaultValue={room?.roomName}
                          type="text"
                          name="roomName"
                          required
                          placeholder="Enter room name"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* IMAGE URL */}
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
                          defaultValue={room?.image}
                          type="text"
                          name="image"
                          required
                          placeholder="Paste image URL"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* FLOOR */}
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
                          defaultValue={room?.floor}
                          type="text"
                          name="floor"
                          required
                          placeholder="e.g. 3rd Floor"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* CAPACITY */}
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
                          defaultValue={room?.capacity}
                          type="number"
                          name="capacity"
                          required
                          placeholder="e.g. 4"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* PRICE */}
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
                          defaultValue={room?.hourlyRate}
                          type="number"
                          name="hourlyRate"
                          required
                          placeholder="e.g. 5"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    {/* EMPTY FOR ALIGNMENT */}
                    <div className="hidden md:block"></div>

                    {/* DESCRIPTION */}
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
                          defaultValue={room?.description}
                          name="description"
                          rows="5"
                          required
                          placeholder="Describe the room, environment, and facilities..."
                          className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 pt-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                        ></textarea>
                      </div>
                    </div>

                    {/* AMENITIES */}
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

                      <Modal.Footer>
                        <Button
                          className={"w-full mt-5"}
                          slot="close"
                          variant="secondary"
                        >
                          Cancel
                        </Button>
                        <Button className={"w-full mt-5"} type="submit">
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </div>
                  </form>
                </div>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default RoomEditModal;
