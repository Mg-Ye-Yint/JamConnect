import { Timestamp } from "firebase/firestore";
import React from "react";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

interface PostType {
  title: string;
  desc: string;
  image: string;
  date: any;
  location: string;
}

const PostItem = ({ post }: { post: PostType }) => {
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
    hour12: true, // Use 12-hour time format (am/pm)
  });

  const formattedDateTime = `${formattedDate} - ${formattedTime}`;

  return (
    <div className="w-[250px] md:w-[300px] lg:w-[350px] h-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg h-1/2 w-full" src={post.image} alt="" />
      <div className="h-[31%] p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words overflow-hidden text-ellipsis whitespace-nowrap">
          {post.desc}
        </p>
        <div className="flex items-center gap-2">
          <HiOutlineCalendar className="text-white font-bold" />
          <p className="text-gray-700 dark:text-gray-400">
            {formattedDateTime}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker className="text-white font-bold" />
          <p className="text-gray-700 dark:text-gray-400">{post.location}</p>
        </div>
      </div>
      <div className="pl-5 pt-7 pb-0">
        <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
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
      </div>
    </div>
  );
};

export default PostItem;
