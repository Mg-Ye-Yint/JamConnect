"use client";

import React, { useEffect, useState } from "react";
import PostItem from "./postItem";
import Postmodal from "./postModal";

interface PostType {
  title: string;
  desc: string;
  image: string;
  date: Date;
  location: string;
}

const Post = ({ posts }: { posts: PostType[] }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log("Posts", posts);
  }, [posts]);

  const openModal = () => {
    const dialog = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  return (
    <div>
      <Postmodal posts={post} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              openModal();
              setPost(item);
            }}
          >
            <PostItem post={item} modal={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
