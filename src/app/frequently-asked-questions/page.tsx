"use client";

import LanguageOptions from "@/components/dynamics/languageOptions";
import { chooseLanguageStore } from "@/store";
import React, { useState } from "react";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const { chooseLanguages } = chooseLanguageStore((state) => ({
    chooseLanguages: state.chooseLanguage,
  }));

  const faqItems = [
    {
      question: "What is MusicianHub?",
      answer:
        "MusicianHub is a platform designed to help musicians connect with each other, find bandmates, and collaborate on exciting musical projects.",
    },
    {
      question: "How do I join MusicianHub?",
      answer:
        "You can join MusicianHub by signing up on our website. Create a profile, display your expertise, and start connecting with other musicians!",
    },
    {
      question: "Is MusicianHub free to use?",
      answer: "Yes, MusicianHub is free to use!",
    },
    {
      question: "How do I find other musicians on MusicianHub?",
      answer:
        "Use our search and filter options to find musicians based on their expertise. You can also participate in events to meet new musicians.",
    },
    {
      question: "How can I contact MusicianHub for support?",
      answer:
        "If you need support, you can reach us through our Contact Us page.",
    },
  ];
  return (
    <>
      {" "}
      <div className="w-full h-[20px] bg-gray-100 p-1">
        {chooseLanguages ? <LanguageOptions /> : null}
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 text-center">
            Frequently Asked Questions
          </h1>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center bg-white shadow-md rounded px-4 py-3 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="bg-white shadow-inner rounded-b px-4 py-3 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
