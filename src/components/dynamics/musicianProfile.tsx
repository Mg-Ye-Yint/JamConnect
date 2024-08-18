"use client";

import React, { useRef, useState } from "react";
import {
  HiOutlineCake,
  HiOutlineBriefcase,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi";
import MusicianInfo from "./musicianInfo";
import { HiUserCircle } from "react-icons/hi";

interface MusicianTypes {
  id: string;
  name: string;
  instrument: string;
  location: string;
  imageUrl: string;
  age: string;
  experience: string;
  about: string;
  email: string;
  phoneNumber: string;
  postedTime: string;
  level: string;
  othersDescription: string;
  gender: string;
}

const MusicianProfile = ({
  musician,
  choosen = false,
}: {
  musician: MusicianTypes;
  choosen: boolean;
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [showFullTextTwo, setShowFullTextTwo] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);
  const textRefTwo = useRef<HTMLParagraphElement>(null);

  const handleMouseEnter = () => {
    const isOverflowing =
      textRef.current &&
      textRef.current.scrollWidth > textRef.current.clientWidth;
    if (isOverflowing) {
      setShowFullText(true);
    }
  };

  const handleMouseLeave = () => {
    setShowFullText(false);
  };

  const handleMouseEnterTwo = () => {
    const isOverflowing =
      textRefTwo.current &&
      textRefTwo.current.scrollWidth > textRefTwo.current.clientWidth;
    if (isOverflowing) {
      setShowFullTextTwo(true);
    }
  };

  const handleMouseLeaveTwo = () => {
    setShowFullTextTwo(false);
  };

  const openModal = () => {
    const dialog = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${
        !choosen ? "min-h-[350px]" : "h-[150px]"
      } justify-start lg:w-[350px] md:-[350px]  bg-gray-700 m-3 p-2 rounded-lg shadow-deep animate-myPulse`}
    >
      <p
        className={`text-white font-gugi overflow-hidden text-ellipsis max-w-full text-sm md:text-base ${
          !choosen && "min-h-[50px]"
        }`}
      >
        {musician.name}
      </p>

      <div className="w-full flex items-center justify-start gap-3">
        <div className="flex flex-col gap-2 h-full box-border w-full">
          <img
            src={musician.imageUrl}
            alt="sample profile"
            className="h-[75px] w-[75px] rounded-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center flex-1">
            <HiOutlineCake className="inline-block mr-2 text-amber-400 w-[17px] h-[17px]" />
            <p className="text-white font-gugi font-semibold overflow-hidden text-ellipsis max-w-[100px] max-h-[25px] text-sm md:text-base ">
              {musician.age}
            </p>
          </div>
          <div
            className="flex items-center flex-1"
            onMouseEnter={handleMouseEnterTwo}
            onMouseLeave={handleMouseLeaveTwo}
          >
            <HiOutlineBriefcase className="inline-block mr-2 text-amber-400 w-[17px] h-[17px]" />
            <p
              className="text-white font-gugi font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-h-[25px] max-w-[75px] text-sm md:text-base"
              ref={textRefTwo}
            >
              {musician.othersDescription ? (
                <>{musician.othersDescription}</>
              ) : (
                <>{musician.instrument}</>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <HiOutlineClock className="inline-block mr-2 text-amber-400 w-[17px] h-[17px]" />
            <p className="text-white font-gugi font-semibold  overflow-hidden text-ellipsis max-h-[25px] max-w-[100px] text-sm md:text-base ">
              {musician.experience} years
            </p>
          </div>

          <div
            className="flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <HiOutlineLocationMarker className="inline-block mr-2 text-amber-400 w-[17px] h-[17px]" />
            <p
              className="text-white font-gugi font-semibold overflow-hidden text-ellipsis max-h-[25px] max-w-[100px] text-sm md:text-base "
              ref={textRef}
            >
              {musician.location}
            </p>
          </div>
        </div>
      </div>

      {showFullText ? (
        <div className=" absolute mt-6 p-2 bg-gray-800 text-white text-sm rounded opacity-90">
          {musician.location}
        </div>
      ) : null}
      {showFullTextTwo ? (
        <div className=" absolute mt-6 p-2 bg-gray-800 text-white text-sm rounded opacity-90">
          {musician.othersDescription ? (
            <>{musician.othersDescription}</>
          ) : (
            <>{musician.instrument}</>
          )}
        </div>
      ) : null}
      {!choosen ? <MusicianInfo info={musician} /> : null}

      {choosen ? (
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
      ) : null}
    </div>
  );
};

export default MusicianProfile;
