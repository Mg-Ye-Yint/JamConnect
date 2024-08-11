"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginRequest from "./home/loginRequest";
import { attemptStore } from "@/store";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";

function Header() {
  const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const { data: session } = useSession();
  const imageSrc = session?.user?.image || DEFAULT_IMAGE;

  const pathname = usePathname();

  const { loginAttempt, setLoginAttempt } = attemptStore((state) => ({
    loginAttempt: state.loginAttempt,
    setLoginAttempt: state.setLoginAttempt,
  }));

  const [openProfiles, setOpenProfiles] = useState(false);

  const profileToogle = () => {
    setOpenProfiles(!openProfiles);
  };

  const linkDestination = pathname === "/" ? "/create-post" : "/";

  return (
    <div className=" z-20 flex flex-row items-center justify-between w-full p-1 md:p-4 border-b-2 bg-gray-700">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Image
          src="/jamming.jpg"
          alt="sport"
          width={110}
          height={90}
          className="w-18 h-12 md:w-22 md:h-16 lg:w-40 lg:h-24 rounded-lg"
        />
        <div className="flex flex-col gap-3 justify-start">
          <p className="text-[20px] md:text-2xl lg:text-5xl font-bungee font-bold text-white">
            BandConnect
          </p>
          <div className="flex flex-row items-end group gap-2">
            <p className="text-[14px] md:text-xl lg:text-2xl font-serif font-bold text-white ">
              See Profiles
            </p>
            {openProfiles ? (
              <HiChevronUp
                className="text-white h-[30px] w-[30px]"
                onClick={profileToogle}
              />
            ) : (
              <HiChevronDown
                className="text-white h-[30px] w-[30px]"
                onClick={profileToogle}
              />
            )}
          </div>
        </div>
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
          {session ? (
            <Link
              className="flex flex-col justify-center bg-blue-700 rounded-md items-center p-2 hover:bg-blue-800 cursor-pointer md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px]"
              href={linkDestination}
            >
              {pathname === "/" ? (
                <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium ">
                  Create Session
                </p>
              ) : (
                <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium ">
                  Home Page
                </p>
              )}
            </Link>
          ) : (
            <button
              className="flex flex-col justify-center bg-blue-700 rounded-md items-center p-2 hover:bg-blue-800 cursor-pointer md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px]"
              onClick={() => {
                setLoginAttempt(true);
              }}
            >
              <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium ">
                Create Session
              </p>
            </button>
          )}
          {loginAttempt ? <LoginRequest /> : null}
          {session ? (
            <button
              className="flex flex-col justify-center bg-red-500 rounded-md items-center  p-2 hover:bg-red-600 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px]"
              onClick={() => {
                signOut();
              }}
            >
              <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium">
                Sign Out
              </p>
            </button>
          ) : (
            <button
              className="flex flex-col bg-green-500 rounded-md items-center justify-center p-2 hover:bg-green-600 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px]"
              onClick={() => {
                signIn();
              }}
            >
              <p className="text-white text-[10px] md:text-lg lg:text-xl  font-medium">
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
