"use client";

import React, { useEffect, useState } from "react";
import { instruments, payment, levels } from "../../../../shared/data";
import { useSession } from "next-auth/react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../../../../shared/firebase.config";
import { Timestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Finished from "../../statics/finished";

import { useRouter } from "next/navigation";
import SessionRecruitInstructions from "../../statics/sessionRecruitInstructions";
import LoadingWheel from "../../statics/loadingWheel";

interface InputState {
  title?: string;
  desc?: string;
  date?: Date;
  location?: string;
  instrument?: string;
  userName?: string;
  userImage?: string;
  userEmail?: string;
  image?: string;
  phoneNumber?: string;
}

const SessionRecruitForm = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState<InputState>({});
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [titleCharsLeft, setTitleCharsLeft] = useState(150);
  const [descCharsLeft, setDescCharsLeft] = useState(400);
  const [locationCharsLeft, setLocationCharsLeft] = useState(200);
  const [otherDescriptionCharsLeft, setOtherDescriptionCharsLeft] =
    useState(50);

  const [postSucceed, setPostSucceed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [othersDescription, setOthersDescription] = useState("");

  const capitalizeFirstLetter = (str: any) => {
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1);
  };

  const CharCount = ({ left, max }: { left: number; max: number }) => (
    <div
      className={`absolute right-2 top-3 text-gray-500 text-sm ${
        left === 0 ? "text-red-600" : "text-gray-600"
      }`}
    >
      {left}/{max}
    </div>
  );

  const router = useRouter();

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

  const handleChange = (e: any) => {
    const { name, value, maxLength } = e.target;

    if (name === "instrument") {
      if (value === "Others") {
        setShowOthersInput(true);
      } else {
        setShowOthersInput(false);
        setOthersDescription("");
      }
    }

    if (maxLength) {
      switch (name) {
        case "title":
          setTitleCharsLeft(maxLength - value.length);
          break;
        case "desc":
          setDescCharsLeft(maxLength - value.length);
          break;
        case "location":
          setLocationCharsLeft(maxLength - value.length);
          break;
        case "othersDescription":
          setOtherDescriptionCharsLeft(maxLength - value.length);
        default:
          break;
      }
    }

    setInput((values) => ({
      ...values,
      [name]: capitalizeFirstLetter(value.trim()),
    }));
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
          ...(showOthersInput && { othersDescription }),
        };

        await setDoc(doc(db, "posts", Date.now().toString()), dataToSave);
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
          router.push("/");
        }, 1000);
      }
    }
  };

  return (
    <div className=" flex flex-col  justify-center m-3 gap-y-3">
      {submitting && <LoadingWheel text={"Loading..."} />}
      <SessionRecruitInstructions />
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
          <CharCount left={titleCharsLeft} max={150} />
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
          <CharCount left={descCharsLeft} max={400} />
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
            className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
          />
          <input
            type="time"
            name="time"
            required
            onChange={handleChange}
            className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
          />
        </div>
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
          <CharCount left={locationCharsLeft} max={200} />
        </div>
        <select
          name="instrument"
          required
          onChange={handleChange}
          className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
        >
          <option value="" disabled selected>
            Type of player
          </option>
          {instruments.map((item) => (
            <option key={item.id}>{item.profession}</option>
          ))}
        </select>
        {showOthersInput && (
          <div className="relative">
            <input
              type="text"
              name="othersDescription"
              required
              placeholder="Describe the type of player"
              maxLength={50}
              onChange={(e) => setOthersDescription(e.target.value)}
              value={othersDescription}
              className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
            />{" "}
            <CharCount left={otherDescriptionCharsLeft} max={50} />
          </div>
        )}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              name="experience"
              placeholder="Experience"
              required
              min={0}
              step={0.5}
              onChange={handleChange}
              className="bg-zinc-300 border border-black placeholder:text-sm md:placeholder:text-base placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 "
            />
            <div className="absolute left-24 top-5 text-gray-500 text-sm md:text-base hidden sm:block">
              Years
            </div>
          </div>
          <select
            name="paymentStatus"
            required
            onChange={handleChange}
            className=" flex-1 bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 text-sm md:text-base"
          >
            <option value="" disabled selected className="text-xs md:text-base">
              Payment Status
            </option>
            {payment.map((item) => (
              <option key={item.id} className="text-sm md:text-base">
                {item.paymentStatus}
              </option>
            ))}
          </select>
          <select
            name="level"
            required
            onChange={handleChange}
            className=" flex-1 bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 text-sm md:text-base"
          >
            <option value="" disabled selected className="text-sm md:text-base">
              Level
            </option>
            {levels.map((item) => (
              <option key={item.id} className="text-sm md:text-base">
                {item.level}
              </option>
            ))}
          </select>
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

export default SessionRecruitForm;

function setSubmit(arg0: boolean) {
  throw new Error("Function not implemented.");
}
