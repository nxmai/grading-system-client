/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, FC, useEffect } from "react";
import CreateClassForm from "./class/CreateClassFrom";
import { GoogleLogout } from "react-google-login";
import { fetchUserInfo, selectUser } from "features/user/userSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import NotificationMenu from "./notification/NotificationMenu";
import classApi from "api/classes";

const clientId =
    "416191100698-anqr49onakr79lg2tldn7cnv4t62rqnk.apps.googleusercontent.com";

// interface HeaderProps {
//     createClass: () => void;
// }

const Header: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [studentClassId, setStudentClassId] = useState("");

    const userInfo = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const logout = () => {
        localStorage.clear();
        router.push("/auth/login");
    };

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const getStudentClassId = async () => {
            try {
                const response = await classApi.getStudentClassId(id);
                setStudentClassId(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        getStudentClassId();
    }, [id]);

    return (
        <div>
            <nav
                className={
                    router.pathname.substring(1, 6) === "class"
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

                {router.pathname.substring(1, 6) === "class" ? (
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
                                    router.push(`/class/${id}/assignment`)
                                }
                                className={
                                    "w-24 h-full flex justify-center items-center cursor-pointer font-semibold hover:bg-blue-100 border-b-2 " +
                                    (router.pathname ===
                                    "/class/[id]/assignment"
                                        ? "text-[#1967D2]  border-blue-700"
                                        : "text-gray-400  border-white hover:border-blue-100")
                                }
                            >
                                Assignments
                            </li>
                            <li
                                onClick={() =>
                                    router.push(`/class/${id}/people`)
                                }
                                className={
                                    "w-24 h-full flex justify-center items-center cursor-pointer font-semibold hover:bg-blue-100 border-b-2 " +
                                    (router.pathname === "/class/[id]/people"
                                        ? "text-[#1967D2]  border-blue-700"
                                        : "text-gray-400  border-white hover:border-blue-100")
                                }
                            >
                                People
                            </li>
                            {studentClassId != "" ? (
                                <li
                                    onClick={() =>
                                        router.push(`/class/${id}/grade`)
                                    }
                                    className={
                                        "group relative w-24 h-full flex justify-center items-center cursor-pointer font-semibold hover:bg-blue-100 border-b-2 " +
                                        (router.pathname === "/class/[id]/grade"
                                            ? "text-[#1967D2]  border-blue-700"
                                            : "text-gray-400  border-white hover:border-blue-100")
                                    }
                                >
                                    Grade
                                    <ul className="hidden group-hover:block absolute border-2 bg-white rounded-lg shadow-md w-[150px] top-[60px] right-[-5px] p-[10px]">
                                        <li
                                            className="hover:bg-blue-50 cursor-pointer p-2"
                                            onClick={() =>
                                                router.push(
                                                    `/class/${id}/download_score`
                                                )
                                            }
                                        >
                                            Donwload Full Score
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                ) : (
                    ""
                )}
                <div className="flex gap-4 justify-end items-center">
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
                    <NotificationMenu />
                    <div className="group relative">
                        {userInfo.photoUrl ? (
                            <img
                                src={userInfo.photoUrl}
                                alt="avt"
                                className="w-10 rounded-full"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 cursor-pointer hover:text-blue-700 text-[#5F6368]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                        <ul className="hidden group-hover:block absolute border-2 bg-white rounded-lg shadow-md w-[150px] top-[40px] right-[-5px] p-[10px]">
                            <li
                                className="hover:bg-blue-50 cursor-pointer p-2"
                                onClick={() => router.push("/user/me")}
                            >
                                View Profile
                            </li>
                            <GoogleLogout
                                clientId={clientId}
                                buttonText="Logout"
                                onLogoutSuccess={logout}
                                icon={false}
                                render={(renderProps) => (
                                    <li
                                        onClick={renderProps.onClick}
                                        className="hover:bg-blue-50 cursor-pointer p-2"
                                    >
                                        Logout
                                    </li>
                                )}
                            />
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
            {isModalVisible ? (
                <CreateClassForm
                    closeModal={closeModal}
                    // createClass={createClass}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default Header;
