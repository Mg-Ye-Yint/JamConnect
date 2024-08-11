"use client";

import Footer from "@/components/footer";
import Body from "@/components/home/body";
import InstrumentsList from "@/components/home/instrumentsList";
import SearchBar from "@/components/home/searchBar";
import app from "../../shared/firebase.config";
import {
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "@/components/home/post";

interface Post {
  title: string;
  desc: string;
  imageUrl: string;
  date: Timestamp;
  location: string;
  userEmail: string;
  userImage: string;
  userName: string;
  postedTime: Timestamp;
}

export default function Home() {
  const db = getFirestore(app); // original firebase provided code မှာပါတဲ့ app ကို getFireStore နဲ့ပြန်ယူလိုက်တယ်

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPost();
  }, []);

  console.log(posts);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts")); //app သိမ်းထားတဲ့ variable ကို getDocs function                                                      သုံးပြီးပေးထားတဲ့ dataBase နာမည်အတိုင်းရှာတယ်
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
    });
    const postsData: Post[] = querySnapshot.docs.map(
      (doc) =>
        ({
          title: doc.data().title,
          desc: doc.data().desc,
          imageUrl: doc.data().imageUrl,
          date: doc.data().date === undefined ? "" : doc.data().date.toDate(),
          location: doc.data().location,
          userEmail: doc.data().userEmail,
          userImage: doc.data().userImage,
          userName: doc.data().userName,
          postedTime:
            doc.data().postedTime === undefined
              ? ""
              : doc.data().postedTime.toDate(),
        } as Post)
    );
    setPosts(postsData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Body />
      <SearchBar />
      <InstrumentsList />
      <Post posts={posts} />
      <Footer />
    </main>
  );
}
