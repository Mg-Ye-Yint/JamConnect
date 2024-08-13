import React from "react";
import { HiCheck } from "react-icons/hi";

const Finished = ({ text }: { text: string }) => {
  return (
    <div className="fixed inset-0 flex bg-black bg-opacity-50 justify-center items-center z-40">
      <div className="relative flex flex-col  bg-white justify-center items-center  w-[200px] h-[200px] z-30 rounded-lg shadow-lg shadow-gray-700/50">
        <HiCheck className="h-[150px] w-[150px] text-green-500" />
        <p className="font-bold text-lg md:text-xl lg:text-2xl">{text}</p>
      </div>
    </div>
  );
};

export default Finished;
