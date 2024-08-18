"use client";

import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import SessionPostmodal from "./sessionPostModal";
import SessionPostItem from "./sessionPostItem";
import { useInstrumentListStore } from "@/store";
import Plain from "../statics/plain";

interface SessionPostType {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  date: Timestamp;
  location: string;
  userImage: string;
  userName: string;
  userEmail: string;
  postedTime: any;
  phoneNumber: string;
  time: string;
  experience: string;
  level: string;
  paymentStatus: string;
  instrument: string;
  othersDescription: string;
}

const SessionPost = ({ posts }: { posts: SessionPostType[] }) => {
  const [uniquePost, setUniquePost] = useState(null);

  const getOrder = (date: any) => {
    if (date instanceof Timestamp) {
      return date.toDate().getTime(); // Firebase Timestamp
    } else if (date instanceof Date) {
      return date.getTime(); // JavaScript Date
    } else if (typeof date === "string") {
      return new Date(date).getTime(); // Date string
    }
    return 0;
  };

  const { selectedProfession } = useInstrumentListStore((state) => ({
    selectedProfession: state.selectedProfession,
  }));

  const filteredPosts = posts
    .filter((post) => getOrder(post.date) > Date.now())
    .sort((a, b) => getOrder(a.date) - getOrder(b.date));

  const sortedPosts =
    selectedProfession === "All"
      ? filteredPosts
      : filteredPosts
          .filter((post) => selectedProfession === post.instrument)
          .sort((a, b) => getOrder(a.date) - getOrder(b.date));

  return (
    <div>
      <SessionPostmodal uniquePost={uniquePost} />

      {sortedPosts.length === 0 ? (
        <Plain text={"vacancy"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-myPulse">
          {sortedPosts.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setUniquePost(item);
              }}
            >
              <SessionPostItem post={item} modal={true} manage={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionPost;
