/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import { chooseLanguageStore } from "@/store";
import LanguageOptions from "@/components/dynamics/languageOptions";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../../shared/firebase.config";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import MusicianProfile from "@/components/dynamics/musicianProfile";
import Musician from "@/components/dynamics/musician";

interface MusicianType {
  id: string;
  name: string;
  instrument: string;
  location: string;
  imageUrl: string;
  age: string;
  experience: string;
  about: string;
  email: string;
  phoneNumber: string;
  postedTime: string;
  level: string;
  othersDescription: string;
  gender: string;
}

const page = () => {
  const session = useSession();

  if (session.data === null) return redirect("/");

  const db = getFirestore(app);

  const [musicians, setMusicians] = useState<MusicianType[]>([]);

  useEffect(() => {
    getMusicians();
  }, []);

  const getMusicians = async () => {
    const querySnapshot = await getDocs(collection(db, "musicians"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    const musicianData: MusicianType[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          name: doc.data().name,
          age: doc.data().age,
          instrument: doc.data().instrument,
          experience: doc.data().experience,
          location: doc.data().location,
          imageUrl: doc.data().imageUrl,
          about: doc.data().about,
          email: doc.data().email,
          phoneNumber: doc.data().phoneNumber,
          postedTime: doc.data().postedTime,
          level: doc.data().level,
          othersDescription: doc.data().othersDescription,
          gender: doc.data().gender,
        } as MusicianType)
    );
    setMusicians(musicianData);
  };

  console.log(musicians);

  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));

  return (
    <>
      <div className="w-full h-[20px] p-1">
        {chooseLanguages ? <LanguageOptions /> : null}
      </div>
      <Musician musician={musicians} />
    </>
  );
};

export default page;
