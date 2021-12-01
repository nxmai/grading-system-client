import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import {useRouter} from 'next/router';

type AppProps = {
    classId: any;
}

export default function GradeStructureMenu( { classId }: AppProps) {
    const router = useRouter();

    return (
        <Fragment>
            <Menu as="div" className="relative text-right flex align-middle justify-self-center">
                <Menu.Button>
                    <DotsVerticalIcon className="h-4 w-4 text-blue-500" />
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
                    <Menu.Items className="absolute left-0 top-4 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                    onClick={()=>router.push(`/class/${classId}/grade`)}
                                        className={`${active ? "bg-blue-50" : "text-gray-900"
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        Go to
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
