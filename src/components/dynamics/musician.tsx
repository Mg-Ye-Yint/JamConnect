"use client";

import React, { useState } from "react";
import InstrumentsList from "./instrumentsList";
import MusicianProfile from "./musicianProfile";
import MusicianModal from "./musicanModal";

interface MusicianType {
  id: string;
  name: string;
  age: number;
  profession: string;
  experience: number;
  location: string;
}

const Musician = ({ musician }: { musician: MusicianType[] }) => {
  const [choosenMusician, setChoosenMusician] = useState(null);

  return (
    <div>
      <MusicianModal choosenMusician={choosenMusician} />
      <div className="flex flex-col justify-center w-full items-center">
        <InstrumentsList />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {musician.map((musician: any) => (
            <div
              key={musician.id}
              onClick={() => {
                setChoosenMusician(musician);
              }}
            >
              <MusicianProfile musician={musician} choosen={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Musician;
