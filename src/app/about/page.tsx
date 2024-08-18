import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 text-center">
          About Us
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700 mb-6">
            <strong>MusicianHub</strong> is your ultimate platform for
            connecting with fellow musicians. Whether you&apos;re looking to
            find bandmates, collaborators, or just a group of musicians to jam
            with, MusicianHub is the place to make those connections.
          </p>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700 mb-6">
            Our mission is to create a vibrant community where musicians of all
            skill levels can come together to share ideas, create music, and
            inspire one another. We believe that every musician deserves the
            chance to find the perfect musical match, and MusicianHub is here to
            make that happen.
          </p>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700 mb-6">
            Join MusicianHub today and be part of a thriving network of
            musicians. Discover new talents, collaborate on exciting projects,
            and bring your musical visions to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
