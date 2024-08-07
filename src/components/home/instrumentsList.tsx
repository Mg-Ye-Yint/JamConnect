"use client";

import React, { useEffect, useState } from "react";
import instruments from "../../../shared/data";

const InstrumentsList = () => {
  const [instrument, setInstrument] = useState([]);

  useEffect(() => {
    setInstrument(instruments);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4 gap-3 md:gap-5 lg:gap-7 pt-10">
      {instrument.map((item: any) => (
        <div
          key={item.id}
          className="cursor-pointer hover:animate-bounce transation-all duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-[100px] h-[100px] md:w-[175px] md:h-[175px] lg:w-[250px] lg:h-[250px]"
          />
          <h2 className="font-bold text-center text-black text-base md:text-xl lg:text-2xl pt-4">
            {item.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default InstrumentsList;
