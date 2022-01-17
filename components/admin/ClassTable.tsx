import React, { useEffect, useState } from "react";
import { UserModel, ClassModal } from "features/user/userSlice";
import userApi from "api/user";
import UserMenu from "components/admin/UserMenu";
import { useRouter } from "next/router";
import classApi from "api/classes";
import ClassDetailModal from "./ClassDetailModal";

export default function ClassTable() {
    const router = useRouter();
    // const [userList, setUserList] = useState<Array<UserModel>>([]);
    const [classList, setClassList] = useState<Array<ClassModal>>([]);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [classToOpen, setClassToOpen] = useState({});

    const queryInit = router.query;

    const fetchListClasses = async function (filter: any) {
        try {
            const clasess = await classApi.getAllClasses(filter);
            setClassList(clasess.data);
        } catch (err) {
            console.log("]> err: ", err);
            setClassList([]);
        }
    };

    useEffect(() => {
        const queryInit = router.query;
        const obj = {
            __sort: queryInit.__sort,
            t__search: queryInit.t__search,
        };
        fetchListClasses(ObjToQueryString(obj));
    }, [router.query]);

    const ObjToQueryString = function (obj: any) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p) && obj[p] != undefined && obj[p] != "") {
                str.push(
                    encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                );
            }
        return str.join("&");
    };

    const onChangeFilter = (e: any) => {
        const { name, value } = e.target;
        const queryInit = router.query;
        const obj = {
            __sort: queryInit.__sort,
            t__search: queryInit.t__search,
            [name]: value,
        };
        const queryStr = "?" + ObjToQueryString(obj);
        router.push(queryStr, undefined, { shallow: true });
    };

    const openDetail = (classInfo: any) => {
        setOpenDetailModal(true);
        setClassToOpen(classInfo);
    };

    return (
        <div className="container mx-auto">
            <ClassDetailModal
                isOpen={openDetailModal}
                setShowModal={setOpenDetailModal}
                classInfo={classToOpen}
            />

            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                        Classes
                    </h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                        <div className="relative">
                            <select
                                className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="__sort"
                                onChange={onChangeFilter}
                                value={queryInit.__sort}
                            >
                                <option value={"-createdAt"}>Increate</option>
                                <option value={"createdAt"}>Decreate</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="block relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 fill-current text-gray-500"
                            >
                                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                            </svg>
                        </span>
                        <input
                            placeholder="Search"
                            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                            name="t__search"
                            onChange={onChangeFilter}
                        />
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Number
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {classList.map((item, key) => {
                                    return (
                                        <tr
                                            key={item._id}
                                            onClick={() => openDetail(item)}
                                            className="cursor-pointer"
                                        >
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {key + 1}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {item.name}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {item.subject}
                                                </p>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {/* <p className="text-gray-900 whitespace-no-wrap">
                                                    {class.role != "admin" ? (
                                                        <UserMenu />
                                                    ) : (
                                                        ""
                                                    )}
                                                </p> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing 1 to 4 of 50 Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

// https://nextjs.org/docs/routing/shallow-routing
