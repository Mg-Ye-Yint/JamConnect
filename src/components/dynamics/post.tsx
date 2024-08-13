"use client";

import React, { useState } from "react";
import PostItem from "./postItem";
import Postmodal from "./postModal";
import { Timestamp } from "firebase/firestore";

interface PostType {
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
}

const Post = ({ posts }: { posts: PostType[] }) => {
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

  const sortedPosts = [...posts]
    .filter((post) => getOrder(post.date) > Date.now())
    .toSorted((a, b) => getOrder(a.date) - getOrder(b.date));

  return (
    <div>
      <Postmodal uniquePost={uniquePost} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-myPulse">
        {sortedPosts.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setUniquePost(item);
            }}
          >
            <PostItem post={item} modal={true} manage={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
