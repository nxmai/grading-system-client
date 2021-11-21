import React, { useState, FC } from "react";
import CreateClassForm from "./CreateClassFrom";

interface HeaderProps {
  createClass: () => void;
}

const Header:FC<HeaderProps> = ({createClass}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <nav className="flex items-center justify-between border-2 p-6">
        <div className="flex items-center">
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
          <h1 className="ml-4 text-lg">Doodle classroom</h1>
        </div>
        
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
      </nav>
      {isModalVisible ? <CreateClassForm closeModal={closeModal} createClass={createClass}/> : ""}
    </div>
  );
};

export default Header;
