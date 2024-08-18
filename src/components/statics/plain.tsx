import React from "react";

const Plain = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-[500px] gap-10 flex flex-col justify-start items-center  animate-myPulse">
      <p className="text-gray-700 text-7xl font-semibold mt-32">
        Currently, no {text}
      </p>
      <p className="text-gray-700 text-6xl">
        Please check back later for updates.
      </p>
    </div>
  );
};

export default Plain;
