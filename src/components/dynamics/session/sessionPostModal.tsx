import React from "react";

import { HiX } from "react-icons/hi";
import SessionPostItem from "./sessionPostItem";

function SessionPostmodal({ uniquePost }) {
  return (
    <div className="rounded-lg ">
      <dialog id="my_modal_2" className="modal rounded-lg overflow-visible">
        <form method="dialog" className="modal-backdrop">
          <SessionPostItem post={uniquePost} modal={false} manage={false} />
          <button className="absolute top-[-10px] right-[-10px] p-1 z-30 bg-red-400 hover:bg-red-500 rounded-full">
            <HiX size={24} className="text-white" />
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default SessionPostmodal;
