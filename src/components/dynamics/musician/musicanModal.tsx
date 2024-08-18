import React from "react";
import { HiX } from "react-icons/hi";
import MusicianProfile from "./musicianProfile";

function MusicianModal({ choosenMusician }) {
  if (!choosenMusician) {
    return null;
  }
  return (
    <div className="rounded-lg ">
      <dialog id="my_modal_2" className="modal rounded-lg overflow-visible">
        <form method="dialog" className="modal-backdrop">
          <MusicianProfile musician={choosenMusician} choosen={false} />
          <button className="absolute top-[-10px] right-[-10px] p-1 z-30 bg-red-400 hover:bg-red-500 rounded-full">
            <HiX size={24} className="text-white" />
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default MusicianModal;
