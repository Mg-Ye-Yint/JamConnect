import React from "react";
import { FaGithub, FaFacebook, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 p-4 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">MusicianHub</h2>
          <p className="mt-2 text-sm">
            Connect with fellow musicians, find bandmates, and create the music
            you&apos;ve always dreamed of. <br /> MusicianHub is your platform
            to discover new talents and collaborate on exciting musical
            projects.
          </p>
        </div>

        {/* Links to Key Pages */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          <a href="/about" className="text-sm hover:text-white mb-2 md:mb-0">
            About Us
          </a>
          <a href="/contact" className="text-sm hover:text-white mb-2 md:mb-0">
            Contact
          </a>
          <a
            href="/frequently-asked-questions"
            className="text-sm hover:text-white mb-2 md:mb-0"
          >
            FAQ
          </a>
          <a href="/privacy-policy" className="text-sm hover:text-white">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a
            href="https://github.com/Mg-Ye-Yint"
            className="text-gray-400 hover:text-white text-lg"
            target="_blank"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100076424138067"
            className="text-gray-400 hover:text-white text-lg"
            target="_blank"
          >
            <FaFacebook />
          </a>
          <a
            href="https://t.me/willy3890"
            className="text-gray-400 hover:text-white text-lg"
            target="_blank"
          >
            <FaTelegram />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-4 pt-4 text-sm text-center">
        <p>
          &copy; {new Date().getFullYear()} Ye Yint Thway. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
