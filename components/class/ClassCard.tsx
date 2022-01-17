/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ClassCardProps {
  classInfo: any;
  attemptHandle: () => boolean;
}

const ClassCard: FC<ClassCardProps> = ({ classInfo, attemptHandle }) => {
  const router = useRouter();
  function onClick() {
    if (!attemptHandle()) {
      router.push(`class/${classInfo._id}`);
    }
  }
  return (
    <div onClick={onClick}>
      <div className="w-[320px] rounded overflow-hidden shadow-lg cursor-pointer">
        <div className="relative h-28 z-[-1]">
          <img
            className="w-full h-28 absolute z-[-1]"
            src="/images/banner.jpg"
            alt="Sunset in the mountains"
          />
          <div className="ml-4 mr-4 pt-2">
            <p className="text-2xl font-bold text-white">
              {classInfo.name}
            </p>
            <p className="text-lg font-semibold text-white">
              {classInfo.subject}
            </p>
          </div>
          {/* <div className="ml-4 mr-4 pt-2">
            <p className="text-white text-base">classInfo.classTeacher</p>
          </div> */}
        </div>

        <div className="px-6 py-4 ">
          <div className=" text-xl mb-2">Upcomming function</div>
          {/* <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p> */}
        </div>
        <hr />
        <div className="px-6 h-14 flex justify-end items-center gap-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#5F6368] cursor-pointer hover:text-blue-700 duration-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#5F6368] cursor-pointer hover:text-blue-700 duration-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
