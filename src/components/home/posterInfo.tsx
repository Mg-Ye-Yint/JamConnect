import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import React from "react";

interface UserType {
  userImage: string;
  userName: string;
  userEmail: string;
  postedTime: any;
}

function PosterInfo({ user }: { user: UserType }) {
  const postDate = new Date(user?.postedTime);

  const formattedDate = postDate.toLocaleTimeString([], {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="ml-2 mt-1 mr-2 h-[120px] mb-14">
      <p className="font-bold text-white font-2xl">Posted By :</p>
      <div className="flex gap-2 items-center mb-3 mt-2">
        {user?.userImage ? (
          <div className="flex flex-row items-start justify-center pb-2 gap-3">
            <Image
              src={user?.userImage}
              alt="user-image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col items-start justify-start mb-2">
              <p className="text-white font-bold">{user?.userName}</p>
              <a
                className="text-white hover:underline hover:text-blue-700"
                href={`mailto:${user?.userEmail}`}
              >
                {user?.userEmail}
              </a>
            </div>
          </div>
        ) : null}
        <div>
          <h2 className="text-[14px] font-medium"></h2>
          <h2 className="text-[14px] font-light"></h2>
        </div>
      </div>
      <p className="font-bold text-white font-xl">Posted On </p>
      <p className=" text-white font-base md:font-lg lg:font-xl">
        {formattedDate}
      </p>
    </div>
  );
}

export default PosterInfo;
