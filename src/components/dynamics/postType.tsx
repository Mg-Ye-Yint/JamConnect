import React from "react";

const PostType = ({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src: string;
}) => {
  return (
    <div className="max-w-sm shadow-deep h-[270px] md:h-[420px] bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 mt-6 md:mt-16 mx-3">
      <a href="#">
        <img
          className="rounded-t-lg w-full h-[100px] md:h-[200px]"
          src={src}
          alt="images representing band and session"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm md:text-lg">
          {description}
        </p>
        <a
          href={title === "Band Recruitment" ? "/" : "/recruit"}
          className="inline-flex w-[70px] h-[30px] md:w-[100px] md:h-[50px] items-center px-3 py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-sm md:text-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Recruit
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PostType;
