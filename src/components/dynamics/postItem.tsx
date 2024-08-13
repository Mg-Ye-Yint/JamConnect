import React from "react";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiTrash,
} from "react-icons/hi";
import PosterInfo from "./posterInfo";
import { initialDeleteStore } from "@/store";

interface PostType {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  date: any;
  location: string;
  userImage: string;
  userName: string;
  userEmail: string;
  postedTime: any;
  phoneNumber: string;
}

const PostItem = ({
  post,
  modal = false,
  manage = false,
}: {
  post: PostType;
  modal: boolean;
  manage: boolean;
}) => {
  if (!post) {
    return null;
  }

  const postDate = new Date(post.date);

  const formattedDate = postDate.toLocaleDateString([], {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = postDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const openModal = () => {
    const dialog = document.getElementById("my_modal_2") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const formattedDateTime = `${formattedDate} - ${formattedTime}`;

  const { setInitialDelete, setPostIdToDelete } = initialDeleteStore(
    (state) => ({
      setInitialDelete: state.setInitialDelete,
      setPostIdToDelete: state.setPostIdToDelete,
    })
  );

  const handleTryDelete = () => {
    setInitialDelete(true);
    setPostIdToDelete(post.id);
  };

  return (
    <>
      {!modal ? (
        <div className="fixed inset-0 flex bg-black bg-opacity-30 justify-center items-center z-10"></div>
      ) : null}

      <div
        className={`relative ${
          !modal
            ? "w-[250px] md:min-w-[450px] lg:min-w-[700px] h-[500px] md:h-[600px] lg:h-[660px] overflow-y-auto  pb-2 "
            : "w-[250px] md:w-[300px] lg:w-[350px] h-[400px] "
        } bg-white border border-gray-200 rounded-lg shadow-deep dark:bg-gray-800 dark:border-gray-700 z-20`}
      >
        {post.imageUrl ? (
          <img
            className="rounded-t-lg h-1/2 w-full"
            src={post.imageUrl}
            alt=""
          />
        ) : (
          <img
            className="rounded-t-lg h-1/2 w-full"
            src="/jamming.jpg"
            alt=""
          />
        )}

        <div className={`p-5 ${!modal ? "min-h-[31%] " : "h-[31%]"}`}>
          <div className="w-[96%]">
            <h5
              className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white  ${
                !modal
                  ? "break-words text-justify"
                  : "break-words overflow-hidden text-ellipsis whitespace-nowrap"
              }`}
            >
              {post.title}
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
          <div className="flex items-center gap-2">
            <HiOutlineCalendar className="text-white font-bold h-[20px] w-[20px] flex-shrink-0" />
            <p
              className={`${
                !modal ? "text-orange-500" : "dark:text-gray-400"
              } ==`}
            >
              {formattedDateTime}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <HiOutlineLocationMarker className="text-white font-bold h-[20px] w-[20px] flex-shrink-0" />
            <div className="w-[92%] ">
              <p
                className={`mb-3 font-normal  ${
                  !modal
                    ? "break-words text-justify text-blue-700"
                    : "break-words overflow-hidden text-ellipsis whitespace-nowrap dark:text-gray-400"
                }`}
              >
                {post.location}
              </p>
            </div>
          </div>
        </div>

        {!modal ? <PosterInfo user={post} /> : null}

        {modal ? (
          <div className="pl-5 pt-7 pb-0">
            {!manage ? (
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
              </a>
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

export default PostItem;
