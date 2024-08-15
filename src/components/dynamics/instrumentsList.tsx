"use client";

import React, { useEffect, useState } from "react";
import { instruments } from "../../../shared/data";
import { usePathname } from "next/navigation";
import { useInstrumentListStore } from "@/store";

const InstrumentsList = () => {
  const [instrument, setInstrument] = useState([]);

  const [selectedInstrument, setSelectedInstrument] = useState("All");

  const { selectedProfession, setSelectedProfession } = useInstrumentListStore(
    (state) => ({
      selectedProfession: state.selectedProfession,
      setSelectedProfession: state.setSelectedProfession,
    })
  );

  useEffect(() => {
    setInstrument(instruments);
  }, []);

  const instrumentChoose = (name: string, profession: string) => {
    setSelectedInstrument(name);
    setSelectedProfession(profession);
  };

  console.log(selectedInstrument);

  const pathname = usePathname();

  console.log(selectedProfession);

  return (
    <div
      className={`${
        pathname === "/search-musicians"
          ? "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 m-2 gap-2 md:gap-3 lg:gap-4 "
          : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 m-4 gap-4 md:gap-8 lg:gap-12 "
      }  pt-6 animate-myPulse`}
    >
      {instrument.map((item: any) => (
        <div
          key={item.id}
          onClick={() => instrumentChoose(item.name, item.profession)}
          className={`flex flex-col justify-center items-center rounded-md group cursor-pointer hover:animate-bounce transition-all duration-300 ${
            selectedInstrument === item.name
              ? "bg-gradient-to-b from-yellow-300 to-green-300"
              : "bg-transparent"
          } `}
        >
          <img
            src={item.image}
            alt={item.name}
            className={`${
              pathname === "/search-musicians"
                ? "w-[20px] h-[20px] md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px]"
                : "w-[40px] h-[40px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]"
            } pt-2 object-contain`}
          />
          <h2
            className={`font-bold ${
              pathname === "/search-musicians"
                ? "text-[12px] md:text-base  lg:text-lg pt-0"
                : "text-base md:text-xl  lg:text-2xl pt-4"
            } text-gray-700  group-hover:text-blue-700`}
          >
            {item.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default InstrumentsList;
