"use client";

import InstrumentsList from "@/components/dynamics/instrumentsList";
import MusicianProfile from "@/components/dynamics/musicianProfile";
import { musicians } from "../../../shared/data";
import React from "react";
import { chooseLanguageStore } from "@/store";
import LanguageOptions from "@/components/dynamics/languageOptions";

const page = () => {
  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));

  return (
    <div className="flex flex-col justify-center w-full items-center">
      {chooseLanguages ? <LanguageOptions /> : null}
      <InstrumentsList />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {musicians.map((item: any) => (
          <MusicianProfile
            key={item.id}
            name={item.name}
            age={item.age}
            location={item.location}
            experience={item.experience}
            profession={item.profession}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
