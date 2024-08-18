"use client";

import { initialDeleteStore } from "@/store";
import { Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { HiOutlineLocationMarker, HiTrash } from "react-icons/hi";
import BandAdditionalInfo from "./bandAdditionalInfo";

interface BandPostType {
  id: string;
  bandName: string;
  desc: string;
  experience: string;
  imageUrl: string;
  instrument: string;
  level: string;
  location: string;
  othersDescription: string;
  phoneNumber: string;
  postedTime: Timestamp;
  userEmail: string;
  userImage: string;
  userName: string;
}

const BandPostItem = ({
  post,
  modal = false,
  manage = false,
}: {
  post: BandPostType;
  modal: boolean;
  manage: boolean;
}) => {
  const { setInitialDelete, setPostIdToDelete } = initialDeleteStore(
    (state) => ({
      setInitialDelete: state.setInitialDelete,
      setPostIdToDelete: state.setPostIdToDelete,
    })
  );

  const [showFullText, setShowFullText] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  if (!post) {
    return null;
  }

  const handleMouseEnter = () => {
    const isOverflowing =
      textRef.current &&
      textRef.current.scrollWidth > textRef.current.clientWidth;
    if (isOverflowing) {
      setShowFullText(true);
    }
  };

  const handleMouseLeave = () => {
    setShowFullText(false);
  };

  const openModal = () => {
    const dialog = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleTryDelete = () => {
    setInitialDelete(true);
    setPostIdToDelete(post.id);
  };

  const renderContent = () => (
    <div className={`relative p-5 ${!modal ? "min-h-[31%] " : "h-[31%]"}`}>
      <div className="w-[96%]">
        <h5
          className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white  ${
            !modal
              ? "break-words text-justify"
              : "break-words overflow-hidden text-ellipsis whitespace-nowrap"
          }`}
        >
          {post.bandName}
        </h5>
      </div>
      <div className="w-[96%]">
        <p
          className={`mb-3 font-normal text-gray-700 dark:text-gray-400 ${
            !modal
              ? "break-words text-justify"
              : "break-words overflow-hidden text-ellipsis whitespace-nowrap"
          }`}
        >
          {post.desc}
        </p>
      </div>
      {showFullText ? (
        <div className=" absolute mt-4 p-2 bg-gray-800 text-white text-sm rounded opacity-90">
          {post.othersDescription ? post.othersDescription : post.instrument}
        </div>
      ) : null}
      <div className="flex items-start gap-2">
        <HiOutlineLocationMarker className="text-amber-400 font-bold h-[20px] w-[20px] flex-shrink-0 " />
        <div className="w-[92%] ">
          <p
            className={`mb-3 font-normal  ${
              !modal
                ? "break-words text-justify "
                : "break-words overflow-hidden text-ellipsis whitespace-nowrap "
            }text-gray-400`}
          >
            {post.location}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!modal && (
        <div className="fixed inset-0 flex bg-black bg-opacity-30 justify-center items-center z-10"></div>
      )}

      <div
        className={`relative ${
          !modal
            ? "w-[250px] md:min-w-[450px] lg:min-w-[700px] h-[500px] md:h-[600px] lg:h-[660px] overflow-y-auto  pb-2 "
            : "w-[250px] md:w-[300px] lg:w-[350px] h-[400px] "
        } bg-white border border-gray-200 rounded-lg shadow-deep dark:bg-gray-800 dark:border-gray-700 z-20`}
      >
        {renderContent()}
        {!modal ? <BandAdditionalInfo info={post} /> : null}

        {modal ? (
          <div className="pl-5 pt-7 pb-0">
            {!manage ? (
              <div className="flex flex-row items-center gap-2">
                <div
                  className={`relative w-[120px] h-[35px] bg-amber-400 rounded-lg flex items-center justify-center`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p
                    className={`text-[16px]  text-gray-700 font-semibold font-ubuntu 
                   overflow-hidden text-ellipsis  whitespace-nowrap
                   `}
                    ref={textRef}
                  >
                    {post.othersDescription ? (
                      <>{post.othersDescription}</>
                    ) : (
                      <>{post.instrument}</>
                    )}
                  </p>{" "}
                </div>
                <a
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  onClick={() => {
                    openModal();
                  }}
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>{" "}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <a
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-600 cursor-pointer  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  onClick={handleTryDelete}
                >
                  Delete
                  <HiTrash className="h-[20px] w-[20px]" />
                </a>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BandPostItem;
