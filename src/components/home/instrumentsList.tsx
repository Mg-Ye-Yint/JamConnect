"use client";

import React, { useEffect, useState } from "react";
import instruments from "../../../shared/data";

const InstrumentsList = () => {
  const [instrument, setInstrument] = useState([]);

  useEffect(() => {
    setInstrument(instruments);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 m-4 gap-4 md:gap-8 lg:gap-12 pt-10">
      {instrument.map((item: any) => (
        <div
          key={item.id}
          className="cursor-pointer hover:animate-bounce transation-all duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]"
          />
          <h2 className="font-bold text-center text-gray-700 text-base md:text-xl lg:text-2xl pt-4">
            {item.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default InstrumentsList;
