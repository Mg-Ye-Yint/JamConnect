"use client";

import React, { useState } from "react";
import InstrumentsList from "./instrumentsList";
import MusicianProfile from "./musicianProfile";
import MusicianModal from "./musicanModal";
import { useInstrumentListStore } from "@/store";
import Plain from "../statics/plain";
import { Timestamp } from "firebase/firestore";

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

const Musician = ({ musician }: { musician: MusicianType[] }) => {
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

  const [choosenMusician, setChoosenMusician] = useState(null);

  const { selectedProfession } = useInstrumentListStore((state) => ({
    selectedProfession: state.selectedProfession,
  }));

  const filteredMusicians = musician.sort(
    (a, b) => getOrder(a.postedTime) - getOrder(b.postedTime)
  );

  const sortedMusicians =
    selectedProfession === "All"
      ? filteredMusicians
      : filteredMusicians
          .filter((item) => selectedProfession === item.instrument)
          .sort((a, b) => getOrder(a.postedTime) - getOrder(b.postedTime));

  return (
    <div>
      <MusicianModal choosenMusician={choosenMusician} />

      <div className="flex flex-col justify-center w-full items-center">
        <InstrumentsList />
        {sortedMusicians.length === 0 ? (
          <Plain text={"musician"} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {sortedMusicians.map((musician: MusicianType, index) => (
              <div
                key={index}
                onClick={() => {
                  setChoosenMusician(musician);
                }}
              >
                <MusicianProfile musician={musician} choosen={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Musician;
