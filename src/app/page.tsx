"use client";

import Footer from "@/components/wrappers/footer";

import InstrumentsList from "@/components/dynamics/instrumentsList";
import app from "../../shared/firebase.config";
import {
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import LanguageOptions from "@/components/dynamics/languageOptions";
import { activeTabStore, attemptStore, chooseLanguageStore } from "@/store";
import Categories from "@/components/dynamics/catagories";
import Body from "@/components/statics/body";
import SearchBar from "@/components/dynamics/searchBar";
import LoginRequest from "@/components/dynamics/loginRequest";
import SessionPost from "@/components/dynamics/sessionPost";
import Plain from "@/components/statics/plain";

interface SessionPostType {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  date: Timestamp;
  time: string;
  experience: string;
  level: string;
  paymentStatus: string;
  location: string;
  userEmail: string;
  userImage: string;
  userName: string;
  postedTime: Timestamp;
  phoneNumber: string;
  instrument: string;
  othersDescription: string;
}

export default function Home() {
  const db = getFirestore(app); // original firebase provided code မှာပါတဲ့ app ကို getFireStore နဲ့ပြန်ယူလိုက်တယ်

  const [sessionPosts, setSessionPosts] = useState<SessionPostType[]>([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts")); //app သိမ်းထားတဲ့ variable ကို getDocs function                                                      သုံးပြီးပေးထားတဲ့ dataBase နာမည်အတိုင်းရှာတယ်
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
    });
    const postsData: SessionPostType[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          title: doc.data().title,
          desc: doc.data().desc,
          imageUrl: doc.data().imageUrl,
          date: doc.data().date === undefined ? "" : doc.data().date.toDate(),
          time: doc.data().time,
          location: doc.data().location,
          userEmail: doc.data().userEmail,
          userImage: doc.data().userImage,
          userName: doc.data().userName,
          phoneNumber: doc.data().phoneNumber,
          experience: doc.data().experience,
          level: doc.data().level,
          paymentStatus: doc.data().paymentStatus,
          instrument: doc.data().instrument,
          othersDescription: doc.data().othersDescription,
          postedTime:
            doc.data().postedTime === undefined
              ? ""
              : doc.data().postedTime.toDate(),
        } as SessionPostType)
    );
    setSessionPosts(postsData);
  };

  console.table(sessionPosts);

  const { loginAttempt } = attemptStore((state) => ({
    loginAttempt: state.loginAttempt,
  }));

  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));

  const { activeTab } = activeTabStore((state) => ({
    activeTab: state.activeTab,
  }));

  return (
    <>
      <div className="w-full h-[20px] p-1">
        {chooseLanguages ? <LanguageOptions /> : null}
      </div>

      {loginAttempt ? <LoginRequest /> : null}

      <main className="flex relative min-h-screen flex-col items-center justify-between">
        <Body />
        <SearchBar />

        <InstrumentsList />
        <Categories />
        {activeTab === "sessions" ? <SessionPost posts={sessionPosts} /> : null}
        {activeTab === "band" ? <Plain text={"vacancy"} /> : null}
        <Footer />
      </main>
    </>
  );
}
