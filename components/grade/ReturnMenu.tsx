import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import UploadScoreAssignment from "./UploadScoreAssignmentModal";

type AppProps = {
    returnScoreFunc: VoidFunction,
    saveScoreDraftFunc: VoidFunction,
}

export default function ReturnMenu({returnScoreFunc, saveScoreDraftFunc}: AppProps) {
    const [openUploadScoreAssignment, setOpenUploadScoreAssignment] = useState<boolean>(false);

    const returnScoreFunction = () => {
        returnScoreFunc();
    };

    const saveScoreDraftFunction = () => {
        saveScoreDraftFunc();
    };

    return (
        <Fragment>
            {/* <UploadScoreAssignment isOpen={openUploadScoreAssignment} setShowModal={setOpenUploadScoreAssignment} classId={undefined} assignmentId={undefined} /> */}
            
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button>
                    {/* <DotsVerticalIcon className="h-5 w-5 text-blue-500" /> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
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
                                        onClick={saveScoreDraftFunction}
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
                                        Save as draft
                                    </button>
                                    
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={returnScoreFunction}
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
                                        Return score
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
                stroke="#065F46"
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
                fill="#065F46"
                stroke="#065F46"
                strokeWidth="2"
            />
        </svg>
    );
}
