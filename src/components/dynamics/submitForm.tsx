"use client";

import React, { useEffect, useState } from "react";
import { instruments } from "../../../shared/data";
import { useSession } from "next-auth/react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../../shared/firebase.config";
import { Timestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import Instractions from "./instructions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Finished from "../statics/finished";
import LoadingWheel from "../statics/wheel";

interface InputState {
  title?: string;
  desc?: string;
  date?: Date;
  location?: string;
  zip?: string;
  instrument?: string;
  userName?: string;
  userImage?: string;
  userEmail?: string;
  image?: string;
  phoneNumber?: string;
}

const SubmitForm = () => {
  const { data: session } = useSession();

  const [input, setInput] = useState<InputState>({});
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const db = getFirestore(app);
  const storage = getStorage(app); //ဓာတ်ပုံထည့်ချင်ရင်လိုအပ်တယ်
  const [titleCharsLeft, setTitleCharsLeft] = useState(150);
  const [descCharsLeft, setDescCharsLeft] = useState(400);
  const [locationCharsLeft, setLocationCharsLeft] = useState(200);
  const [zipCharsLeft, setZipCharsLeft] = useState(5);
  const [postSucceed, setPostSucceed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const capitalizeFirstLetter = (str: any) => {
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1);
  };

  useEffect(() => {
    if (session && session.user) {
      setInput((values) => ({
        ...values,
        userName: session.user.name,
        userImage: session.user.image,
        userEmail: session.user.email,
      }));
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!submitting) {
      setSubmitting(true);
      try {
        if (!input.date) {
          console.error("Date is required");
          return;
        }
        const convertedDate = new Date(input.date);
        if (isNaN(convertedDate.getTime())) {
          console.error("Invalid date value");
          return;
        }

        const timestamp = Timestamp.fromDate(convertedDate);
        const postedTime = Timestamp.now();

        let imageUrl = "";
        if (image) {
          const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot: UploadTaskSnapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} % done`);
              },
              (error) => {
                console.error(error.message);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  imageUrl = downloadURL;
                  resolve();
                });
              }
            );
          });
        }

        const dataToSave = {
          ...input,
          date: timestamp,
          imageUrl,
          postedTime,
          phoneNumber,
        };

        await setDoc(doc(db, "posts", Date.now().toString()), dataToSave);
        // window.location.reload();
      } catch (error) {
        console.log("Error", error);
        window.alert("Failed to create event.");
      } finally {
        setSubmitting(false);
        setPostSucceed(true);
        setTimeout(() => {
          setPostSucceed(false);
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "title") {
      setTitleCharsLeft(150 - value.length);
    }

    if (name === "desc") {
      setDescCharsLeft(400 - value.length);
    }

    if (name === "location") {
      setLocationCharsLeft(200 - value.length);
    }

    if (name === "zip") {
      setZipCharsLeft(5 - value.length);
    }

    setInput((values) => ({
      ...values,
      [name]: capitalizeFirstLetter(value.trim()),
    }));
  };

  return (
    <div className=" flex flex-col  justify-center m-3 gap-y-3">
      {submitting && <LoadingWheel text={"Loading..."} />}
      <Instractions />
      <form onSubmit={handleSubmit} className="animate-myPulse">
        <div className="relative">
          <input
            type="text"
            name="title"
            maxLength={150}
            placeholder="Title"
            required
            onChange={handleChange}
            className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] pr-14 md:pr-12"
          />
          <div
            className={`absolute right-2 top-2 text-gray-500 text-sm ${
              titleCharsLeft === 0 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {titleCharsLeft}/150
          </div>
        </div>
        <div className="relative">
          <textarea
            name="desc"
            placeholder="Description"
            required
            onChange={handleChange}
            maxLength={400}
            className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md mt-3 pr-14 md:pr-12"
          />
          <div
            className={`absolute right-2 top-4 text-gray-500 text-sm ${
              descCharsLeft === 0 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {descCharsLeft}/400
          </div>
        </div>
        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
        />
        <div className="relative">
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            maxLength={200}
            onChange={handleChange}
            className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 pr-14 md:pr-12 "
          />
          <div
            className={`absolute right-2 top-4 text-gray-500 text-sm ${
              locationCharsLeft === 0 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {locationCharsLeft}/200
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            name="zip"
            placeholder="Zip"
            required
            maxLength={5}
            onChange={handleChange}
            className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 "
          />
          <div
            className={`absolute right-2 top-4 text-gray-500 text-sm ${
              zipCharsLeft === 0 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {zipCharsLeft}/5
          </div>
        </div>
        <div className="relative">
          <PhoneInput
            country={"us"}
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            containerStyle={{
              width: "100%",
              marginTop: "12px",
            }}
            inputStyle={{
              backgroundColor: "#D4D4D4",
              border: "1px solid black",
              width: "100%",
              borderRadius: "8px",
              height: "35px",
            }}
            buttonStyle={{
              border: "1px solid black",
              borderRadius: "8px",
              backgroundColor: "#D4D4D4",
            }}
          />
          <div className="absolute right-2 top-2 text-gray-500 text-sm ">
            Phone Number
          </div>
        </div>
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
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png"
          className="bg-zinc-300 border border-black placeholder-black w-full p-1 rounded-md text-black mt-3"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 border border-black w-full rounded-md h-[35px] mt-3 text-white font-semibold"
        >
          Submit
        </button>
      </form>
      {postSucceed ? <Finished text={"Posted"} /> : null}
    </div>
  );
};

export default SubmitForm;

function setSubmit(arg0: boolean) {
  throw new Error("Function not implemented.");
}
