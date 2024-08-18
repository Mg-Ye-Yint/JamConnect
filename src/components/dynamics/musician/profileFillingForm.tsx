import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { doc, setDoc, Timestamp, getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  getStorage,
} from "firebase/storage";
import app from "../../../../shared/firebase.config";
import LoadingWheel from "@/components/statics/loadingWheel";
import ProfileFillingInstructions from "@/components/statics/profileFillingInstructions";
import { profileInputs } from "../../../../shared/data";
import Finished from "@/components/statics/finished";

interface InputState {
  name?: string;
  about?: string;
  age?: number;
  location?: string;
  instrument?: string;
  experience?: number;
  level?: number;
  image?: string;
  phoneNumber?: string;
}

const ProfileFillingForm = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState<InputState>({});
  const [image, setImage] = useState<File | null>(null);
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [othersDescription, setOthersDescription] = useState("");
  const [aboutCharsLeft, setAboutCharsLeft] = useState(400);
  const [locationCharsLeft, setLocationCharsLeft] = useState(200);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otherDescriptionCharsLeft, setOtherDescriptionCharsLeft] =
    useState(50);
  const [submitting, setSubmitting] = useState(false);
  const [postSucceed, setPostSucceed] = useState(false);

  const db = getFirestore(app);
  const storage = getStorage(app);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
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
        email: session.user.email,
      }));
    }
  }, [session]);

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
        case "about":
          setAboutCharsLeft(maxLength - value.length);
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
          imageUrl,
          postedTime,
          phoneNumber,
          ...(showOthersInput && { othersDescription }),
        };

        await setDoc(doc(db, "musicians", Date.now().toString()), dataToSave);
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
          router.push("/search-musicians");
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className=" flex flex-col  justify-center m-3 gap-y-3">
        {submitting && <LoadingWheel text={"Loading..."} />}
        <ProfileFillingInstructions />
        <form onSubmit={handleSubmit} className="animate-myPulse">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={handleChange}
              className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] pr-14 md:pr-12"
            />
          </div>
          <div className="relative">
            <textarea
              name="about"
              placeholder="About yourself"
              required
              onChange={handleChange}
              maxLength={400}
              className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md mt-3 pr-14 md:pr-12"
            />
            <CharCount left={aboutCharsLeft} max={400} />
          </div>
          <select
            name="instrument"
            required
            onChange={handleChange}
            className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
          >
            <option value="" disabled selected>
              Profession
            </option>
            {profileInputs.map((item) => (
              <option key={item.id}>{item.profession}</option>
            ))}
          </select>
          {showOthersInput && (
            <div className="relative">
              <input
                type="text"
                name="othersDescription"
                required
                placeholder="Describe What You Can Do"
                maxLength={25}
                onChange={(e) => setOthersDescription(e.target.value)}
                value={othersDescription}
                className="bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3"
              />{" "}
              <CharCount left={otherDescriptionCharsLeft} max={25} />
            </div>
          )}
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
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                name="age"
                placeholder="Age"
                required
                min={7}
                onChange={handleChange}
                className="bg-zinc-300 border border-black placeholder:text-sm md:placeholder:text-base placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 "
                onKeyPress={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Tab" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  }
                }}
              />
              <div className="absolute left-24 top-5 text-gray-500 text-sm md:text-base hidden sm:block">
                Years
              </div>
            </div>
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
              name="level"
              required
              onChange={handleChange}
              className=" flex-1 bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 text-sm md:text-base"
            >
              <option
                value=""
                disabled
                selected
                className="text-sm md:text-base"
              >
                Level
              </option>
              <option className="text-sm md:text-base">Beginner</option>
              <option className="text-sm md:text-base">Intermediate</option>
              <option className="text-sm md:text-base">Advanced</option>
              <option className="text-sm md:text-base">Expert</option>
            </select>
            <select
              name="gender"
              required
              onChange={handleChange}
              className=" flex-1 bg-zinc-300 border border-black placeholder-black focus:placeholder-blue-500 w-full rounded-md h-[35px] mt-3 text-sm md:text-base"
            >
              <option
                value=""
                disabled
                selected
                className="text-sm md:text-base"
              >
                Gender
              </option>
              <option className="text-sm md:text-base">Male</option>
              <option className="text-sm md:text-base">Female</option>
              <option className="text-sm md:text-base">Non-Binary</option>
              <option className="text-sm md:text-base">
                Prefer not to say
              </option>
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
          <div className="relative">
            <input
              type="file"
              required
              accept="image/gif, image/jpeg, image/png"
              className="bg-zinc-300 border border-black placeholder-black w-full p-1 rounded-md text-black mt-3"
              onChange={handleFileChange}
            />
            <div className="absolute right-2 top-4 text-gray-500 text-sm ">
              Your Photo
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 border border-black w-full rounded-md h-[35px] mt-3 text-white font-semibold"
          >
            Submit
          </button>
        </form>
        {postSucceed ? <Finished text={`Profile uploaded`} /> : null}
      </div>{" "}
    </>
  );
};

export default ProfileFillingForm;
