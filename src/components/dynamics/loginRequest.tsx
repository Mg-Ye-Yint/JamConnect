import { attemptStore } from "@/store";
import React from "react";
import { HiX } from "react-icons/hi";

const LoginRequest = () => {
  const { setLoginAttempt } = attemptStore((state) => ({
    setLoginAttempt: state.setLoginAttempt,
  }));
  return (
    <div className="fixed inset-0 flex bg-black bg-opacity-50 justify-center items-center z-20">
      <div className="relative flex flex-row  bg-gray-700 justify-center items-center  w-[250px] md:w-[350px] lg:w-[500px] h-[150px] z-30 rounded-md shadow-lg shadow-gray-700/50">
        <button
          className="absolute top-[-10px] right-[-10px] p-1 bg-red-400 hover:bg-red-500 rounded-full"
          onClick={() => {
            setLoginAttempt(false);
          }}
        >
          <HiX size={24} className="text-white" />
        </button>
        <p className="font-bold text-white font-mono text-lg md:text-xl lg:text-2xl">
          Please Sign In
        </p>
      </div>
    </div>
  );
};

export default LoginRequest;
