"use client";

import React from "react";
import SubmitForm from "@/components/home/submitForm";
import LoginRequest from "@/components/home/loginRequest";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const session = useSession();

  if (session.data === null) return redirect("/");

  return (
    <div className="flex flex-row justify-center items-center h-full">
      <SubmitForm />
    </div>
  );
};

export default page;
