import React from "react";
import {
  HiOutlineCake,
  HiOutlineBriefcase,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi";
import MusicianInfo from "./musicianInfo";

interface MusicianTypes {
  id: number;
  name: string;
  profession: string;
  location: string;
  photo: string;
  age: string;
  experience: string;
}

const MusicianProfile = ({
  musician,
  choosen = false,
}: {
  musician: MusicianTypes;
  choosen: boolean;
}) => {
  const openModal = () => {
    const dialog = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-start lg:w-[350px] md:-[350px] h-[150px] bg-gray-700 m-3 p-2 rounded-lg shadow-deep animate-myPulse ">
      <p className="text-white font-gugi overflow-hidden text-ellipsis max-w-full text-sm md:text-base ">
        {musician.name}
      </p>
      <div className="w-full flex items-center justify-start gap-3">
        <div className="flex flex-col gap-2 h-full box-border w-full">
          <img
            src="/sample-profile.jpg"
            alt="sample profile"
            className="h-[75px] w-[75px] rounded-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <HiOutlineCake className="inline-block mr-2 text-amber-400" />
            <p className="text-white font-gugi font-semibold overflow-hidden text-ellipsis max-w-[100px] text-sm md:text-base ">
              {musician.age}
            </p>
          </div>
          <div className="flex items-center">
            <HiOutlineBriefcase className="inline-block mr-2 text-amber-400" />
            <p className="text-white font-gugi font-semibold  overflow-hidden text-ellipsis max-w-[100px] text-sm md:text-base ">
              {musician.profession}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <HiOutlineClock className="inline-block mr-2 text-amber-400" />
            <p className="text-white font-gugi font-semibold  overflow-hidden text-ellipsis max-w-[100px] tetext-sm md:text-base ">
              {musician.experience} years
            </p>
          </div>
          <div className="flex items-center">
            <HiOutlineLocationMarker className="inline-block mr-2 text-amber-400 " />
            <p className="text-white font-gugi font-semibold overflow-hidden text-ellipsis max-w-[100px] text-sm md:text-base ">
              {musician.location}
            </p>
          </div>
        </div>
      </div>

      {!choosen ? <MusicianInfo /> : null}

      <a
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        onClick={() => openModal()}
      >
        About
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
};

export default MusicianProfile;
