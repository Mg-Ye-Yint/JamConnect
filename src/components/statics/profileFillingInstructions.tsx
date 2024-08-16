import React from "react";

const ProfileFillingInstructions = () => {
  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-blue-700 font-bungee text-xl md:text-2xl lg:text-3xl font-bold animate-slideInLeft">
        Build your musician profile
      </h2>
      <h5 className="text-black font-bungee text-base md:text-lg lg:text-xl text-justify font-semibold animate-slideInLeft">
        <span className="text-amber-400 inline">Start</span> by filling out your
        personal details, name, profession, experiences and level.
        <br />
        <span className="text-amber-400 inline">Make</span> sure to upload a
        profile picture. <span className="text-amber-400 inline">Add</span>{" "}
        links to your social media.
        <span className="text-amber-400 inline">Once</span> completed, <br />{" "}
        your profile will be visible to other musicians and bands looking for
        new members.
      </h5>
    </div>
  );
};

export default ProfileFillingInstructions;
