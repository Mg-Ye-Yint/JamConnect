"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LanguageOptions from "@/components/dynamics/languageOptions";
import { chooseLanguageStore } from "@/store";
import SessionRecruitForm from "@/components/dynamics/session/sessionRecruitForm";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession();

  if (session.data === null) return redirect("/");
  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));
  return (
    <>
      {" "}
      <div className="w-full h-[20px] p-1">
        {chooseLanguages ? <LanguageOptions /> : null}
      </div>{" "}
      <div className="flex flex-row justify-center items-center h-full">
        <SessionRecruitForm />
      </div>
    </>
  );
};

export default page;
