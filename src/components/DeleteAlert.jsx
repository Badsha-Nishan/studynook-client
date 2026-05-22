"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const DeleteAlert = ({ room }) => {
  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${room?._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
      }
    );
    const data = await res.json();

    toast.success("Room Deleted Successfully.");
    redirect("/rooms");
  };
  return (
    <AlertDialog>
      <Button
        variant="none"
        className="flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-6 py-8 font-semibold text-red-300 transition-all duration-300 hover:bg-red-500/20"
      >
        <Trash2 size={18} />
        Delete Room
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#231322]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              {/* <AlertDialog.Icon status="danger" /> */}
              <AlertDialog.Heading className="text-white">
                Delete this room?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently remove the listing and any associated
                bookings. This cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Room
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteAlert;
