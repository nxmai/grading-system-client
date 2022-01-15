import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socketUrl } from "api/generic";
import { useAppSelector } from "app/hooks";
import { selectUser } from "features/user/userSlice";
import userApi from "api/user";

const socket = io(socketUrl);

export default function NotificationMenu() {
    const userInfo = useAppSelector(selectUser);

    const [notifications, setNotifications] = useState([]);
    async function isRead(notificationId: any) {
        await userApi.updateNotificationRead({ notificationId }).then(result => fetchNotifications());
    }

    async function fetchNotifications() {
        await userApi.getNotifications().then(result => setNotifications(result.data));
    }

    socket.on(`${userInfo._id}`, data => fetchNotifications());

    useEffect(() => { fetchNotifications(); }, []);

    return (
        <Fragment>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="-mb-4">
                    <button className="py-4 px-1 relative rounded-full hover:text-blue-700 text-[#5F6368] focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        {notifications.length !== 0 ? <span className="absolute inset-0 object-right-top -mr-6">
                            <div className="inline-flex items-center px-1.5 py-0.5 border-white rounded-full text-xs font-semibold bg-red-500 text-white">
                                {notifications.filter((notification: any) => !notification.isRead).length}
                            </div>
                        </span> : <></>}
                    </button>
                </Menu.Button>
                {notifications.length != 0 ?
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-[300px] max-h-[550px] overflow-y-scroll origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                {notifications.map((notification: any, index) =>
                                    <Menu.Item key={index}>
                                        <button
                                            onClick={() => isRead(notification._id)}
                                            className={`${notification.isRead ? "text-gray-700" : "text-gray-900 bg-blue-50"
                                                } group flex rounded-md flex-col items-start text-left w-full mb-[2px] px-2 py-2 text-sm`}
                                        >
                                            <a href={notification.link}>{notification.content}</a>
                                            <p className="text-gray-500 text-xs">{new Date(notification.createdAt).toDateString()}</p>
                                        </button>
                                    </Menu.Item>
                                ).reverse()}
                            </div>
                        </Menu.Items>
                    </Transition> : <></>}


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