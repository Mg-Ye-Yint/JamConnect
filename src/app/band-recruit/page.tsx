/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import BandRecruitForm from "@/components/dynamics/band/bandRecruitForm";
import LanguageOptions from "@/components/dynamics/languageOptions";
import { chooseLanguageStore } from "@/store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const session = useSession();

  if (session.data === null) return redirect("/");
  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));
  return (
    <>
      {" "}
      <div className="w-full h-[20px]  p-1">
        {chooseLanguages ? <LanguageOptions /> : null}
      </div>{" "}
      <div className="flex flex-row justify-center items-center h-full">
        <BandRecruitForm />
      </div>
    </>
  );
};

export default page;
