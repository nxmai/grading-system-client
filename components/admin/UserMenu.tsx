import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { UserModel } from "features/user/userSlice";
import UserUpdateModal from "./UserUpdateModal";

type AppProps = {
    user: UserModel
}

export default function UserMenu({ user }: AppProps) {
    // const [openUploadScoreAssignment, setOpenUploadScoreAssignment] = useState<boolean>(false);
    // const [openDownloadScoreAssignment, setOpenDownloadScoreAssignment] = useState<boolean>(false);
    const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);

    return (
        <Fragment>
            {/* <UploadScoreAssignment isOpen={openUploadScoreAssignment} setShowModal={setOpenUploadScoreAssignment} classId={classId} assignmentId={assignmentId} reRender={reRender}/>
            <DownLoadScoreAssignment isOpen={openDownloadScoreAssignment} setShowModal={setOpenDownloadScoreAssignment} classId={classId} assignmentId={assignmentId}/> */}
            <UserUpdateModal isOpen={openUpdateUser} setShowModal={setOpenUpdateUser} userInfo={user}/>
            <Menu as="div" className="relative inline-block text-left z-20 bg-white">
                <Menu.Button>
                    <DotsVerticalIcon className="h-5 w-5 text-blue-500" />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setOpenUpdateUser(true)}
                                        className={`${active ? "bg-blue-50" : "text-gray-900"
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        {active ? (
                                            <EditActiveIcon
                                                className="w-5 h-5 mr-2"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <EditInactiveIcon
                                                className="w-5 h-5 mr-2"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Update
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </Fragment>
    );
}

function EditInactiveIcon(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#3B82F6"
                strokeWidth="2"
            />
        </svg>
    );
}

function EditActiveIcon(props: any) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#3B82F6"
                stroke="#70a7ff"
                strokeWidth="2"
            />
        </svg>
    );
}
