import React from "react";

const SessionRecruitInstructions = () => {
  return (
    <>
      <h2 className="text-blue-700 font-bungee text-xl md:text-2xl lg:text-3xl font-bold animate-slideInLeft">
        Find Musicians for a Casual Jam Session
      </h2>
      <h5 className="text-black font-bungee text-base md:text-lg lg:text-xl text-justify font-semibold animate-slideInLeft">
        Whether you need a musician for a fun{" "}
        <span className="text-amber-400 inline">jam session</span>, an{" "}
        <span className="text-amber-400 inline">urgent replacement</span>{" "}
        <br className="hidden sm:block" />, a
        <span className="text-amber-400 inline"> paid gig</span>, or as a{" "}
        <span className="text-amber-400 inline">substitute</span>, click here to
        find the right player
      </h5>
    </>
  );
};

export default SessionRecruitInstructions;
