import React from "react";
import Image from "next/image";

function Header() {
  const userImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  return (
    <div className="flex flex-row items-center justify-between w-full p-4 border-b-2 ">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Image
          src="/sports.jpg"
          alt="sport"
          width={100}
          height={80}
          className="w-18 h-12 md:w-22 md:h-16 lg:w-40 lg:h-24 rounded-lg"
        />
        <p className="text-[20px] md:text-2xl lg:text-5xl font-bungee font-bold">
          Sports Pair
        </p>
      </div>
      <div className=" flex items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className=" bg-violet-700 rounded-md items-center p-2 hover:bg-violet-600 cursor-pointer">
            <p className="text-white text-[10px] md:text-lg lg:text-2xl font-medium">
              Create Session
            </p>
          </div>
          <div className=" bg-green-700 rounded-md items-center p-2 hover:bg-green-600 cursor-pointer">
            <p className="text-white text-[10px] md:text-lg lg:text-2xl text-center font-medium">
              Login
            </p>
          </div>
        </div>
        <Image
          src={userImage}
          alt="user"
          className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}

export default Header;
