/* eslint-disable @next/next/no-img-element */
import UserMenu from "components/user/UserMenu";
import React, { Fragment, useEffect, useState } from "react";
import Header from "components/Header";
import userApi from "api/user";

export default function UserMe() {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        studentCardID: "",
        photoUrl: "",
        active: "",
        email: "",
    });
    const [rerender, setRerender] = useState<boolean>(false);

    const updateCardId = (card: string) => {
        setUserInfo({ ...userInfo, studentCardID: card });
    };

    function reRenderPage() { setRerender(!rerender);}

    useEffect(() => {
        async function getUser() {
            try {
                const res = await userApi.getMe();
                setUserInfo(res.data);
            } catch (error: any) {
                console.log(error.message);
            }
        }
        getUser();
    }, [rerender]);

    console.log(userInfo.photoUrl);

    //   const myLoader = () => {
    //     return "https://images.unsplash.com/photo-1637352532486-4046253f49b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
    //   };

    return (
        <div>
            <Header createClass={() => {}} />
            <section className="py-8 bg-red">
                <div className="container mx-auto px-4 bg-red">
                    <div className="flex flex-col min-w-0 break-words bg-red w-full shadow-xl rounded-lg mt-8">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center w-full">
                                <div className="lg:w-4/12 px-4 lg:order-1"></div>
                                <div className="lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="">
                                        {userInfo.photoUrl !== "" ? (
                                            <img
                                                alt="photo url"
                                                width={100}
                                                height={100}
                                                src={userInfo.photoUrl}
                                                className="rounded-full h-auto align-middle border-none  "
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="lg:w-4/12 px-4 lg:order-3 text-right lg:self-center">
                                    <div className="py-6 px-3 sm:mt-0">
                                        <UserMenu updateCardId={updateCardId} reRenderPage={reRenderPage}/>
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
