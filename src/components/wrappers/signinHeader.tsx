"use client";

import React from "react";
import Image from "next/image";
import Title from "../statics/title";
import { chooseLanguageStore, useLanguageStore } from "@/store";
import { HiChevronDown, HiChevronUp, HiHome } from "react-icons/hi";
import { useRouter } from "next/navigation";

const SigninHeader = () => {
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

  const ChevronIcon = chooseLanguages ? HiChevronDown : HiChevronUp;

  const router = useRouter();

  return (
    <div className=" z-50 flex flex-row items-center justify-between w-full p-1 md:p-4 border-b-2 bg-gray-700 animate-headerDown">
      <div className="flex flex-col md:flex-row items-center gap-3 mt-2 md:mt-0">
        <Image
          src="/jamming.jpg"
          alt="sport"
          width={110}
          height={90}
          className="w-18 h-16 md:w-22 md:h-16 lg:w-40 lg:h-24 rounded-lg"
        />

        <div className="flex flex-row md:flex-col gap-12 md:gap-3 justify-start">
          <Title />
          <div className="flex flex-row items-baseline group gap-2">
            <p className="text-[14px] md:text-xl lg:text-2xl font-serif font-bold text-white hidden sm:block">
              Language
            </p>

            <div className="flex items-center">
              <Image
                src={selectedLanguage.flag}
                alt={selectedLanguage.label}
                width={20}
                height={15}
                className="rounded-md "
              />
              <ChevronIcon
                className="text-white h-[30px] w-[30px]"
                onClick={languageBoxToggle}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center gap-4 mr-2 md:mr-0">
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-8 items-center">
          <button
            className="flex flex-col justify-center bg-blue-700  items-center p-2 hover:bg-blue-800 cursor-pointer 
           w-full  rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            md:h-[68px] md:w-[78px] lg:w-[150px] lg:h-[68px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => router.push("/")}
          >
            <HiHome className="text-white text-2xl md:hidden" />
            <p className="text-white text-[10px] md:text-lg lg:text-xl font-medium hidden sm:block">
              Home Page
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninHeader;
