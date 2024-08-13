"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LoginRequest from "./dynamics/loginRequest";
import { attemptStore, chooseLanguageStore, useLanguageStore } from "@/store";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
import Title from "./statics/title";
// import LanguageOptions from "./home/languageOptions";

function Header() {
  const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const { data: session } = useSession();

  const imageSrc = session?.user?.image;

  const pathname = usePathname();

  const { loginAttempt, setLoginAttempt } = attemptStore((state) => ({
    loginAttempt: state.loginAttempt,
    setLoginAttempt: state.setLoginAttempt,
  }));
  const languageOptions = [
    { code: "en", label: "English", flag: "/english.png" },
    { code: "my", label: "Burmese", flag: "/burmese.webp" },
    { code: "th", label: "Thai", flag: "/thai.webp" },
  ];

  const { chooseLanguages, setChooseLanguages } = chooseLanguageStore(
    (state) => ({
      chooseLanguages: state.chooseLanguage,
      setChooseLanguages: state.setChooseLanguage,
    })
  );

  const { selectedLanguage } = useLanguageStore((state) => ({
    selectedLanguage: state.selectedLanguage,
  }));

  const languageBoxToggle = () => {
    setChooseLanguages(!chooseLanguages);
  };

  const linkDestination = pathname === "/" ? "/create-post" : "/";

  const router = useRouter();

  return (
    <div className=" z-50 flex flex-row items-center justify-between w-full p-1 md:p-4 border-b-2 bg-gray-700 animate-headerDown">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Image
          src="/jamming.jpg"
          alt="sport"
          width={110}
          height={90}
          className="w-18 h-12 md:w-22 md:h-16 lg:w-40 lg:h-24 rounded-lg"
        />
        <div className="flex flex-col gap-3 justify-start">
          <Title />
          <div className="flex flex-row items-baseline group gap-2">
            <p className="text-[14px] md:text-xl lg:text-2xl font-serif font-bold text-white ">
              Language
            </p>
            <div className="flex items-center">
              <img
                src={selectedLanguage.flag}
                alt={selectedLanguage.label}
                width={20}
                height={15}
                className="rounded-md"
              />
              {chooseLanguages ? (
                <HiChevronDown
                  className="text-white h-[30px] w-[30px]"
                  onClick={languageBoxToggle}
                />
              ) : (
                <HiChevronUp
                  className="text-white h-[30px] w-[30px]"
                  onClick={languageBoxToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
          {session ? (
            <Image
              src={imageSrc}
              alt="user"
              className="w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full"
              width={100}
              height={100}
              onClick={() => router.push("/profile")}
            />
          ) : null}

          {pathname === "/" && (
            <button
              className="flex flex-col justify-center bg-blue-700 rounded-2xl items-center p-2 hover:bg-blue-800 cursor-pointer 
           w-full
            md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={() => router.push("/search-musicians")}
            >
              <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium ">
                Search Musicians
              </p>
            </button>
          )}

          {session ? (
            <Link
              className="flex flex-col justify-center bg-blue-700 rounded-2xl items-center p-2 hover:bg-blue-800 cursor-pointer  w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
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
              className="flex  w-full flex-col justify-center bg-blue-700 rounded-2xl items-center p-2 hover:bg-blue-800 cursor-pointer md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
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
              className="flex  flex-col justify-center bg-red-500 rounded-2xl items-center  p-2 hover:bg-red-600 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
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
              className="flex flex-col bg-green-500 rounded-2xl items-center justify-center p-2 hover:bg-green-600 cursor-pointer w-full md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
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
