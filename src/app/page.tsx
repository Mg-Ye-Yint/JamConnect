"use client";

import Footer from "@/components/footer";

import InstrumentsList from "@/components/dynamics/instrumentsList";
import app from "../../shared/firebase.config";
import {
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "@/components/dynamics/post";
import LanguageOptions from "@/components/dynamics/languageOptions";
import { chooseLanguageStore } from "@/store";
import Categories from "@/components/dynamics/catagories";
import Body from "@/components/statics/body";
import SearchBar from "@/components/dynamics/searchBar";

interface Post {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  date: Timestamp;
  location: string;
  userEmail: string;
  userImage: string;
  userName: string;
  postedTime: Timestamp;
  phoneNumber: string;
}

export default function Home() {
  const db = getFirestore(app); // original firebase provided code မှာပါတဲ့ app ကို getFireStore နဲ့ပြန်ယူလိုက်တယ်

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts")); //app သိမ်းထားတဲ့ variable ကို getDocs function                                                      သုံးပြီးပေးထားတဲ့ dataBase နာမည်အတိုင်းရှာတယ်
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
    });
    const postsData: Post[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          title: doc.data().title,
          desc: doc.data().desc,
          imageUrl: doc.data().imageUrl,
          date: doc.data().date === undefined ? "" : doc.data().date.toDate(),
          location: doc.data().location,
          userEmail: doc.data().userEmail,
          userImage: doc.data().userImage,
          userName: doc.data().userName,
          phoneNumber: doc.data().phoneNumber,
          postedTime:
            doc.data().postedTime === undefined
              ? ""
              : doc.data().postedTime.toDate(),
        } as Post)
    );
    setPosts(postsData);
  };

  console.log(posts);

  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));

  return (
    <>
      <div className="w-full h-[20px] p-1">
        {chooseLanguages ? <LanguageOptions /> : null}
      </div>

      <main className="flex relative min-h-screen flex-col items-center justify-between">
        <Body />
        <SearchBar />

        <InstrumentsList />
        <Categories />
        <Post posts={posts} />
        <Footer />
      </main>
    </>
  );
}
