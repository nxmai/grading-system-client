import React, { Fragment, useEffect, useState } from "react";
import Modal from "components/Modal";
import { UserModel } from "features/user/userSlice";
import userApi from "api/user";
import router from "next/router";
import Button from "components/Button";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: UserModel;
};

export default function UserUpdateModal({
    isOpen,
    setShowModal,
    userInfo,
}: AppProps) {
    const [isProcess, setProcess] = useState<boolean>(false);

    const [userInfoState, setUserInfoState] = useState({
        ...userInfo,
    });

    function onActionClick() {
        setProcess(true);
        userApi
            .updateOne(userInfo._id, userInfoState)
            .catch((error: any) => {
                console.log(error);
            })
            .finally(() => {
                router.push("", undefined, { shallow: true });
                setProcess(false);
            });
    }

    const onInfoChange = (e: any) => {
        const { name, value } = e.target;
        setUserInfoState({ ...userInfoState, [name]: value });
    };

    const handleWithStudentID = () => {
        if (userInfoState.studentCardID) {
            const cardId = userInfoState.studentCardID;
            setUserInfoState({
                ...userInfoState,
                studentCardIDScraft: cardId,
                studentCardID: "",
            });
        }
        if (userInfoState.studentCardIDScraft) {
            const cardId = userInfoState.studentCardIDScraft;
            setUserInfoState({
                ...userInfoState,
                studentCardID: cardId,
                studentCardIDScraft: "",
            });
        }
    };

    useEffect(() => {}, [userInfoState]);

    console.log(userInfoState);

    return (
        <Modal
            open={isOpen}
            onSubmit={onActionClick}
            onClose={() => setShowModal(false)}
            options={{
                title: "Update User",
                submitText: "Update",
            }}
            isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">
                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                        <div className="md:col-span-3">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={onInfoChange}
                                value={userInfoState.firstName}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={onInfoChange}
                                value={userInfoState.lastName}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-6">
                            <label htmlFor="photoUrl">Photo url</label>
                            <input
                                type="text"
                                name="photoUrl"
                                id="photoUrl"
                                onChange={onInfoChange}
                                value={userInfoState.photoUrl}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-6">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={onInfoChange}
                                value={userInfoState.email}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-6 pt-4">
                            <button
                                onClick={handleWithStudentID}
                                className={
                                    userInfoState.studentCardID
                                        ? "bg-red-500 hover:bg-red-700 duration-300 text-white text-sm py-2 px-4 rounded"
                                        : "bg-blue-500 hover:bg-blue-700 duration-300 text-white text-sm py-2 px-4 rounded"
                                }
                            >
                                {userInfoState.studentCardID
                                    ? "Unmap "
                                    : "Map "}
                                card ID
                            </button>
                        </div>

                        <div className="md:col-span-3">
                            <label htmlFor="studentCardID">StudentID</label>
                            <input
                                type="text"
                                name="studentCardID"
                                id="studentCardID"
                                onChange={onInfoChange}
                                disabled
                                value={userInfoState.studentCardID}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor="studentCardIDScraft">
                                StudentId UnMap
                            </label>
                            <input
                                type="text"
                                name="studentCardIDScraft"
                                id="studentCardIDScraft"
                                onChange={onInfoChange}
                                disabled
                                value={userInfoState.studentCardIDScraft}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-200"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="role">Role</label>
                            <select
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                name="role"
                                onChange={onInfoChange}
                                value={userInfoState.role}
                            >
                                <option value={"user"}>User</option>
                                <option value={"admin"}>Admin</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="active">Status</label>
                            <select
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                name="active"
                                onChange={onInfoChange}
                                value={userInfoState.active ? "1" : "0"}
                            >
                                <option value={""}>Disactivated</option>
                                <option value={"1"}>Activated</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="black_type">Black Type</label>
                            <select
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                name="black_type"
                                onChange={onInfoChange}
                                value={userInfoState.black_type}
                            >
                                <option value={"none"}>None</option>
                                <option value={"block"}>Block</option>
                                <option value={"ban"}>Ban</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
