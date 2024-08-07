"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Body from "@/components/home/body";
import InstrumentsList from "@/components/home/instrumentsList";
import SearchBar from "@/components/home/searchBar";
import app from "../../shared/firebase.config";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect } from "react";

export default function Home() {
  const db = getFirestore(app);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Body />
      <SearchBar />
      <InstrumentsList />
      <Footer />
    </main>
  );
}
