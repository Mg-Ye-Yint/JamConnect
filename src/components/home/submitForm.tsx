"use client";

import React, { useEffect, useState } from "react";
import instruments from "../../../shared/data";
import { useSession } from "next-auth/react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../../shared/firebase.config";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";

interface InputState {
  title?: string;
  desc?: string;
  date?: Date;
  location?: string;
  zip?: string;
  instrument?: string;
  userName?: string;
  userImage?: string;
  email?: string;
}

const SubmitForm = () => {
  const { data: session } = useSession();

  const [input, setInput] = useState<InputState>({});
  const db = getFirestore(app);

  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      setInput((values) => ({
        ...values,
        userName: session.user.name,
        userImage: session.user.image,
        email: session.user.email,
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(typeof input.date);
    e.preventDefault();
    if (!input.date) {
      console.error("Date is required");
      return;
    }
    const convertedDate = new Date(input.date);
    console.log(typeof convertedDate);
    if (isNaN(convertedDate.getTime())) {
      console.error("Invalid date value");
      return;
    }

    const timestamp = Timestamp.fromDate(convertedDate);
    console.log(typeof timestamp);
    const dataToSave = {
      ...input,
      date: timestamp,
    };

    await setDoc(doc(db, "posts", Date.now().toString()), dataToSave);
    window.location.reload();
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className=" flex flex-col  justify-center m-3 gap-y-3">
      <h2 className="text-blue-700 font-bungee text-lg md:text-xl lg:text-2xl font-bold">
        Create Session
      </h2>
      <h5 className="text-black font-bungee text-base md:text-lg lg:text-xl font-semibold">
        Create a playing session for your favourite instruments and invite other
        musicians!
      </h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px]"
        />

        <textarea
          name="desc"
          placeholder="Description"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md mt-3"
        />

        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 "
        />

        <input
          type="text"
          name="zip"
          placeholder="Zip"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 "
        />

        <select
          name="instrument"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
        >
          <option value="" disabled>
            Select an instrument
          </option>
          {instruments.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 border border-black w-full rounded-md h-[35px] mt-3 text-white font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitForm;
