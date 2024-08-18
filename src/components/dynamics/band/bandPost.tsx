/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Plain from "@/components/statics/plain";
import React, { useState } from "react";
import BandPostModal from "./bandPostModal";
import BandPostItem from "./bandPostItem";
import { Timestamp } from "firebase/firestore";
import { useInstrumentListStore } from "@/store";

interface BandPostType {
  id: string;
  bandName: string;
  desc: string;
  experience: string;
  imageUrl: string;
  instrument: string;
  level: string;
  location: string;
  othersDescription: string;
  phoneNumber: string;
  postedTime: Timestamp;
  userEmail: string;
  userImage: string;
  userName: string;
}

const BandPost = ({ posts }: { posts: BandPostType[] }) => {
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

  const sortedPosts =
    selectedProfession === "All"
      ? posts
      : posts.filter((post) => selectedProfession === post.instrument);

  return (
    <div>
      <BandPostModal uniquePost={uniquePost} />

      {sortedPosts.length === 0 ? (
        <Plain text={"vacancy"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-myPulse mb-2">
          {sortedPosts.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setUniquePost(item);
              }}
            >
              <BandPostItem post={item} modal={true} manage={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BandPost;
