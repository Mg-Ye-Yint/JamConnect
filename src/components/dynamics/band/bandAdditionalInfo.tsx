import Image from "next/image";
import React from "react";

interface InfoType {
  userImage: string;
  userName: string;
  userEmail: string;
  postedTime: any;
  phoneNumber: string;
  experience: string;
  level: string;
}

const BandAdditionalInfo = ({ info }: { info: InfoType }) => {
  const postDate = new Date(info?.postedTime);

  const formattedDate = postDate.toLocaleTimeString([], {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div className="ml-2 mt-1 mr-2 h-[120px] mb-14">
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-[100px] h-[35px] bg-amber-400 rounded-lg flex items-center justify-center">
          <p className="text-base text-gray-700 font-semibold font-ubuntu">
            {info.level}
          </p>
        </div>
        <div className="w-[170px] h-[35px] bg-amber-400 rounded-lg flex items-center justify-center">
          <p className="text-base text-gray-700 font-semibold font-ubuntu">
            Experience: {info.experience} years
          </p>
        </div>
      </div>
      <p className="font-bold text-amber-400 font-2xl mt-2">Posted By :</p>
      <div className="flex gap-2 items-center mb-3 mt-2">
        {info?.userImage ? (
          <div className="flex flex-row items-start justify-center pb-2 gap-3">
            <Image
              src={info?.userImage}
              alt="user-image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col items-start justify-start mb-2">
              <p className="text-amber-400 font-bold">{info?.userName}</p>
              <div className="flex flex-col md:flex-row items-start gap-3">
                <a
                  className="text-white hover:underline hover:text-blue-700"
                  href={`mailto:${info?.userEmail}`}
                >
                  Email : {info?.userEmail}
                </a>

                <div className="flex flex-col md:flex-row items-start gap-3">
                  <p className="text-white">Phone: {info?.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <h2 className="text-[14px] font-medium"></h2>
          <h2 className="text-[14px] font-light"></h2>
        </div>
      </div>
      <p className="font-bold text-amber-400 font-xl">Posted On </p>
      <p className=" text-white font-base md:font-lg lg:font-xl">
        {formattedDate}
      </p>
    </div>
  );
};

export default BandAdditionalInfo;
