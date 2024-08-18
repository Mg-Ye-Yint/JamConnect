"use client";

import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import app from "../../../../shared/firebase.config";
import Finished from "../../statics/finished";
import DeletingWheel from "../../statics/delete";
import { initialBandDeleteStore } from "@/store";

const BandPostDeleteConfirm = () => {
  const [deleting, setDeleting] = useState(false);
  const [deleteSucceed, setDeleteSucceed] = useState(false);

  const { setInitialBandDelete, setBandPostIdToDelete, bandPostIdToDelete } =
    initialBandDeleteStore((state) => ({
      setInitialBandDelete: state.setInitialBandDelete,
      setBandPostIdToDelete: state.setBandPostIdToDelete,
      bandPostIdToDelete: state.bandPostIdToDelete,
    }));

  const db = getFirestore(app);

  const handleBandDelete = async () => {
    if (bandPostIdToDelete) {
      setDeleting(true);
      try {
        const postRef = doc(db, "bands", bandPostIdToDelete);
        await deleteDoc(postRef);
        setBandPostIdToDelete(null);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
      setDeleting(false);
      setDeleteSucceed(true);
      setTimeout(() => {
        setDeleteSucceed(false);
      }, 3000);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-black bg-opacity-50 justify-center items-center z-30">
      {deleting ? <DeletingWheel text={"Deleting..."} /> : null}
      <div className="relative flex flex-col bg-slate-400 justify-center items-center  w-[250px] md:w-[350px] lg:w-[500px] h-[150px] z-30 rounded-md shadow-lg shadow-gray-700/50">
        <p className="font-bold text-lg md:text-xl lg:text-2xl text-white font-bungee text-center">
          Are you sure you want to delete this post?
        </p>
        <div className="flex flex-row w-full items-center justify-evenly">
          <button
            className="text-font-semibold text-white bg-yellow-500 hover:bg-yellow-600 text-lg p-2
        md:text-xl lg:text-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 rounded-2xl"
            onClick={() => setInitialBandDelete(false)}
          >
            Cancel
          </button>
          <button
            className="text-font-semibold text-white bg-red-700 p-2 hover:bg-red-800 text-lg md:text-xl lg:text-2xl
        transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 rounded-2xl"
            onClick={handleBandDelete}
          >
            Delete
          </button>
          {deleteSucceed ? <Finished text={"Post Deleted"} /> : null}
        </div>
      </div>
    </div>
  );
};

export default BandPostDeleteConfirm;
