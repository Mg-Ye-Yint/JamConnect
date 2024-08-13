"use client";

import React, { useState } from "react";

const Categories = () => {
  const [activeTab, setActiveTab] = useState("band");
  const [isDelayed, setIsDelayed] = useState(false);

  const tabChoose = (tab) => {
    setActiveTab(tab);
    setIsDelayed(false);

    setTimeout(() => {
      setIsDelayed(true);
    }, 500);
  };
  return (
    <div className="relative flex gap-1 md:gap-3  h-[50px] w-3/4 md:h-[40px] md:w-1/2 rounded-lg m-3 animate-myPulse ">
      <div
        className={`group ${
          activeTab === "band" && isDelayed
            ? "rounded-t-lg rounded-r-lg rounded-l-lg rounded-b-none"
            : "rounded-lg"
        } hover:bg-gray-600 flex flex-col w-1/2 h-full items-center  justify-center text-center bg-gray-700`}
        onClick={() => tabChoose("band")}
      >
        <p className="text-white group-hover:text-gray-100 font-ubuntu font-semibold text-base md:text-lg lg:text-xl">
          Band Recircuitments
        </p>
      </div>
      <div className="w-[2px] bg-white h-full"></div>
      <div
        className={`group ${
          activeTab === "sessions" && isDelayed
            ? "rounded-t-lg rounded-r-lg rounded-l-lg rounded-b-none"
            : "rounded-lg"
        } hover:bg-gray-600 flex flex-col w-1/2 h-full items-center   justify-center text-center bg-gray-700`}
        onClick={() => tabChoose("sessions")}
      >
        <p className="text-white group-hover:text-gray-100 font-ubuntu font-semibold  text-base md:text-lg lg:text-xl">
          Session Recircuitment
        </p>
      </div>
      <div
        className={`absolute bottom-0 w-full h-[4px] bg-blue-500 transition-all duration-300 ${
          activeTab === "band"
            ? "left-0 w-[calc(50%-0.28rem)] md:left-0 md:w-[calc(50%-0.85rem)]"
            : "left-[calc(50%+0.35rem)] w-[calc(50%-0.45rem)] md:left-[calc(50%+0.85rem)] md:w-[calc(50%-0.85rem)]"
        }`}
      ></div>
    </div>
  );
};

export default Categories;
