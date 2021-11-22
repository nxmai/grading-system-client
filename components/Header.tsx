import { useRouter } from "next/router";
import React, { useState, FC } from "react";
import CreateClassForm from "./CreateClassFrom";
import { GoogleLogout } from 'react-google-login';

const clientId = '416191100698-anqr49onakr79lg2tldn7cnv4t62rqnk.apps.googleusercontent.com';

interface HeaderProps {
  createClass: () => void;
}

const Header: FC<HeaderProps> = ({ createClass }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    localStorage.setItem('token', "");
    router.push('/auth/login');
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

        <div className="flex justify-between w-16 items-center">
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

          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
            icon={false}
            render={renderProps => (
              <svg onClick={renderProps.onClick} className="h-5 w-5 cursor-pointer hover:text-blue-700 text-[#5F6368]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            )}
          />
        </div>
      </nav>
      {isModalVisible ? <CreateClassForm closeModal={closeModal} createClass={createClass} /> : ""}
    </div>
  );
};

export default Header;
