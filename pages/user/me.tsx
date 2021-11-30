/* eslint-disable @next/next/no-img-element */
import UserMenu from "components/user/UserMenu";
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchUserInfo, selectUser } from "features/user/userSlice";

export default function UserMe() {
    const userInfo = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const [rerender, setRerender] = useState<boolean>(false);
    function reRenderPage() { setRerender(!rerender);}

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <section className="py-8 bg-red">
                <div className="container mx-auto px-4 bg-red">
                    <div className="flex flex-col min-w-0 break-words bg-red w-full shadow-xl rounded-lg mt-8">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center w-full">
                                <div className="lg:w-4/12 px-4 lg:order-1"></div>
                                <div className="lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="">
                                        {userInfo.photoUrl ? (
                                            <img
                                                alt="photo url"
                                                width={100}
                                                height={100}
                                                src={userInfo.photoUrl}
                                                className="rounded-full h-auto align-middle border-none  "
                                            />
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-16 w-20 cursor-pointer text-[#5F6368]"
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
                                    </div>
                                </div>
                                <div className="lg:w-4/12 px-4 lg:order-3 text-right lg:self-center">
                                    <div className="py-6 px-3 sm:mt-0">
                                        <UserMenu />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2 mt-2">
                                    {userInfo.firstName} {userInfo.lastName}
                                </h3>
                                {userInfo.studentCardID ? (
                                    <div className="text-sm leading-normal mt-2 mb-2 text-gray-500 font-bold uppercase">
                                        {userInfo.studentCardID}
                                    </div>
                                ) : (
                                    <div className="text-sm leading-normal mt-4 mb-4 text-red-500 font-bold uppercase">
                                        Please update your student card ID to
                                        view your grade
                                    </div>
                                )}
                                <div className="mb-2 text-gray-700 mt-10">
                                    {userInfo.email}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                            Request to join Doodle ClassRoom
                                        </p>
                                        <a
                                            href="#pablo"
                                            className="font-normal text-main"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Show more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
