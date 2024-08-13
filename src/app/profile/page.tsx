"use client";

import LanguageOptions from "@/components/dynamics/languageOptions";
import Manager from "@/components/dynamics/manager";
import { chooseLanguageStore } from "@/store";
import React from "react";

const page = () => {
  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));
  return (
    <>
      {chooseLanguages ? <LanguageOptions /> : null}
      <Manager />
    </>
  );
};

export default page;
