import React from "react";

const PlainProfile = () => {
  return (
    <div className="w-full h-[500px] gap-10 flex flex-col justify-start items-center  animate-myPulse">
      <p className="text-gray-700 text-7xl font-semibold mt-32">
        You haven&apos;t posted anything yet.
      </p>
      <p className="text-gray-700 text-6xl">
        Click{" "}
        <a href="/post-type-choose" className="underline hover:text-blue-500">
          here
        </a>{" "}
        to post vacancies.
      </p>
    </div>
  );
};

export default PlainProfile;
