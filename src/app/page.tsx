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

import Plain from "@/components/statics/plain";
import SessionPost from "@/components/dynamics/session/sessionPost";
import BandPost from "@/components/dynamics/band/bandPost";

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

export default function Home() {
  const db = getFirestore(app);

  const [sessionPosts, setSessionPosts] = useState<SessionPostType[]>([]);
  const [bandPosts, setBandPosts] = useState<BandPostType[]>([]);

  useEffect(() => {
    getSessionPost(), getBandPost();
  }, []);

  const getSessionPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {});
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

  const getBandPost = async () => {
    const querySnapshot = await getDocs(collection(db, "bands"));
    querySnapshot.forEach((doc) => {});
    const postsDataTwo: BandPostType[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          bandName: doc.data().bandName,
          desc: doc.data().desc,
          imageUrl: doc.data().imageUrl,
          location: doc.data().location,
          userEmail: doc.data().userEmail,
          userImage: doc.data().userImage,
          userName: doc.data().userName,
          phoneNumber: doc.data().phoneNumber,
          experience: doc.data().experience,
          level: doc.data().level,
          instrument: doc.data().instrument,
          othersDescription: doc.data().othersDescription,
          postedTime:
            doc.data().postedTime === undefined
              ? ""
              : doc.data().postedTime.toDate(),
        } as BandPostType)
    );
    setBandPosts(postsDataTwo);
  };

  console.table(sessionPosts);
  console.log("bandposts", bandPosts);

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
        <InstrumentsList />
        <Categories />
        {activeTab === "sessions" ? <SessionPost posts={sessionPosts} /> : null}
        {activeTab === "band" ? <BandPost posts={bandPosts} /> : null}
      </main>
    </>
  );
}
