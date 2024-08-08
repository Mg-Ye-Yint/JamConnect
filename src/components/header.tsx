"use client";

import React from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const { data: session } = useSession();
  const imageSrc = session?.user?.image || DEFAULT_IMAGE;
  return (
    <div className="flex flex-row items-center justify-between w-full p-4 border-b-2 bg-gray-700">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Image
          src="/jamming.jpg"
          alt="sport"
          width={110}
          height={90}
          className="w-18 h-12 md:w-22 md:h-16 lg:w-40 lg:h-24 rounded-lg"
        />
        <p className="text-[20px] md:text-2xl lg:text-5xl font-bungee font-bold text-white">
          JamConnect
        </p>
      </div>
      <div className=" flex items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Image
            src={imageSrc}
            alt="user"
            className="w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full"
            width={100}
            height={100}
          />
          <button className="flex flex-col justify-center bg-blue-700 rounded-md items-center p-2 hover:bg-blue-800 cursor-pointer md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px]">
            <p className="text-white text-[10px] md:text-lg lg:text-2xl font-medium ">
              Create Session
            </p>
          </button>
          {session ? (
            <button
              className=" bg-red-500 rounded-md items-center p-2 hover:bg-red-600 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px]"
              onClick={() => {
                signOut();
              }}
            >
              <p className="text-white text-[10px] md:text-lg lg:text-2xl text-center font-medium lg:h-[62px]">
                Sign Out
              </p>
            </button>
          ) : (
            <button
              className=" bg-green-500 rounded-md items-center p-2 hover:bg-green-600 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px]"
              onClick={() => {
                signIn();
              }}
            >
              <p className="text-white text-[10px] md:text-lg lg:text-2xl text-center font-medium">
                Sign In
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
