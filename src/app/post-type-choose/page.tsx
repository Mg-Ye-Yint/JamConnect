/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import PostType from "@/components/dynamics/postType";
import React from "react";
import { postTypes } from "../../../shared/data";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const session = useSession();

  if (session.data === null) return redirect("/");

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-evenly align-middle">
      {postTypes.map((post, index) => (
        <div key={index} className="animate-myPulse mb-2">
          <PostType
            title={post.title}
            description={post.description}
            src={post.src}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
