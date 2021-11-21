import React, { useState, FC } from "react";
import CreateClassForm from "./CreateClassFrom";
import { useRouter } from "next/router";
import Link from "next/link";

interface HeaderProps {
  // createClass: () => void;
}

const Header: FC<HeaderProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <nav
        className={
          router.pathname !== "/"
            ? "items-center h-[70px] pl-6 pr-6 grid grid-cols-3"
            : "items-center h-[70px] pl-6 pr-6 grid grid-cols-2"
        }
      >
        <div className="flex items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#5F6368] cursor-pointer hover:text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <h1
            className="ml-4 text-lg cursor-pointer"
            onClick={() => router.push("/")}
          >
            Doodle classroom
          </h1>
        </div>
        {router.pathname !== "/" ? (
          <div className="h-full">
            <ul className="flex h-full justify-center items-center ">
              <li
                onClick={() => router.push(`/class/${id}`)}
                className={
                  "w-24 h-full flex justify-center items-center cursor-pointer font-semibold hover:bg-blue-100 border-b-2 " +
                  (router.pathname === "/class/[id]"
                    ? "text-[#1967D2]  border-blue-700"
                    : "text-gray-400  border-white hover:border-blue-100")
                }
              >
                Stream
              </li>
              <li
                onClick={() =>
                  router.push(`/class/${id}/classwork`)
                }
                className={
                  "w-24 h-full flex justify-center items-center cursor-pointer font-semibold hover:bg-blue-100 border-b-2 " +
                  (router.pathname === "/class/[id]/classwork"
                    ? "text-[#1967D2]  border-blue-700"
                    : "text-gray-400  border-white hover:border-blue-100")
                }
              >
                Classwork
              </li>
              <li
                onClick={() => router.push(`/class/${id}/people`)}
                className={
                  "w-24 h-full flex justify-center items-center cursor-pointer font-semibold hover:bg-blue-100 border-b-2 " +
                  (router.pathname === "/class/[id]/people"
                    ? "text-[#1967D2]  border-blue-700"
                    : "text-gray-400  border-white hover:border-blue-100")
                }
              >
                People
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-3 justify-end">
          {router.pathname === "/" ? (
            <div onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer hover:text-blue-700 text-[#5F6368]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          ) : (
            ""
          )}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer hover:text-blue-700 text-[#5F6368]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </nav>
      <hr />
      {isModalVisible ? <CreateClassForm closeModal={closeModal} /> : ""}
    </div>
  );
};

export default Header;
