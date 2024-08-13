"use client";

import { initialDeleteStore } from "@/store";
import DeleteConfirm from "./deleteConfirm";
import PostItem from "./postItem";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import app from "../../../shared/firebase.config";

const Manager = () => {
  const { data: session } = useSession();
  const [userPost, setUserPost] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    getUserPost();
  }, [session]);

  const getUserPost = async () => {
    if (session?.user.email) {
      const q = query(
        collection(db, "posts"),
        where("userEmail", "==", session?.user?.email)
      );
      const posts = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        posts.push(data);
      });
      setUserPost(posts);
    }
  };

  const { initialDelete } = initialDeleteStore((state) => ({
    initialDelete: state.initialDelete,
  }));

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold font-gugi animate-slideInLeft">
        Manage Your Posts
      </p>
      {initialDelete && <DeleteConfirm />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
        {userPost.map((item, index) => (
          <div key={index} className="animate-myPulse">
            <PostItem post={item} modal={true} manage={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manager;
