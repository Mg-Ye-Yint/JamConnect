"use client";

import { chooseLanguageStore, useLanguageStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { languageOptions } from "../../../shared/data";

const LanguageOptions = () => {
  const { chooseLanguages, setChooseLanguages } = chooseLanguageStore(
    (state) => ({
      chooseLanguages: state.chooseLanguage,
      setChooseLanguages: state.setChooseLanguage,
    })
  );

  const { setSelectedLanguage } = useLanguageStore((state) => ({
    setSelectedLanguage: state.setSelectedLanguage,
  }));

  const languageBoxRef = useRef(null);

  const languageChoose = (language) => {
    setSelectedLanguage(language);
    setChooseLanguages(false);
  };

  const clickOutside = (event) => {
    if (
      languageBoxRef.current &&
      !languageBoxRef.current.contains(event.target)
    ) {
      setChooseLanguages(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <>
      {chooseLanguages && (
        <div
          className="relative z-50 left-[0] md:left-[140px] lg:left-[200px] rounded-lg bg-gray-700 w-[120px]"
          ref={languageBoxRef}
        >
          {languageOptions.map((language, index) => (
            <div
              key={index}
              className="relative group flex items-center justify-between p-2 hover:bg-gray-400   cursor-pointer z-70 overflow-hidden"
              onClick={() => languageChoose(language)}
            >
              <p className="text-sm font-medium text-white group-hover:text-black">
                {language.label}
              </p>
              <img
                src={language.flag}
                alt={language.label}
                width={20}
                height={15}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LanguageOptions;
