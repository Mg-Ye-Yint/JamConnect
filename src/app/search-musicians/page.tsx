"use client";

import React, { useEffect, useState } from "react";
import { chooseLanguageStore } from "@/store";
import LanguageOptions from "@/components/dynamics/languageOptions";
import Musician from "@/components/dynamics/musician";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../../shared/firebase.config";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface MusicianType {
  id: string;
  name: string;
  age: number;
  profession: string;
  experience: number;
  location: string;
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
          profession: doc.data().profession,
          experience: doc.data().experience,
          location: doc.data().location,
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
