import React from "react";

interface MusicianTypes {
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
  gender: string;
}

const MusicianInfo = ({ info }: { info: MusicianTypes }) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-3">
      <p className="text-white break-all">{info.about}</p>
      <div className="h-[35px] min-w-[100px] p-2 bg-amber-400 rounded-lg">
        <div className="flex flex-row items-center justify-center h-full">
          <p className="text-gray-700 text-base font-bold">Gender : </p>
          <p className="text-gray-700 text-base font-semibold">
            &nbsp; {info.gender}
          </p>
        </div>
      </div>
      <div className="h-[35px] min-w-[160px] p-2 bg-amber-400 rounded-lg">
        <div className="flex flex-row items-center justify-center h-full">
          <p className="text-gray-700 text-base font-bold">Level : </p>
          <p className="text-gray-700 text-base font-semibold">
            &nbsp; {info.level}
          </p>
        </div>
      </div>

      <p className="text-white font-bold">Contacts</p>
      <div className="flex flex-row">
        {" "}
        <p className="text-white text-base font-bold">Phone: </p>
        <p className="text-white text-base font-semibold ml-2">
          {info.phoneNumber}
        </p>
      </div>
      <div className="flex flex-row">
        <p className="text-white text-base font-bold">Email: </p>
        <p className="text-white text-base font-semibold ml-2">{info.email}</p>
      </div>
    </div>
  );
};

export default MusicianInfo;
