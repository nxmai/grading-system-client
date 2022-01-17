/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { UserModel } from "features/user/userSlice";
import userApi from "api/user";
import UserMenu from "components/admin/UserMenu";
import { useRouter } from "next/router";

export default function UserTable() {
    const router = useRouter();
    const [userList, setUserList] = useState<Array<UserModel>>([]);
    const queryInit = router.query;
    const fetchListUser = async function (filter: any) {
        try {
            const usrs = await userApi.getAll(filter);
            setUserList(usrs.data);
        } catch (err) {
            console.log("]> err: ", err);
            setUserList([]);
        }
    };

    useEffect(() => {
        // console.log("]> query", router.query);
        const queryInit = router.query;
        const obj = {
            role: queryInit.role,
            active: queryInit.active,
            black_type: queryInit.black_type,
            __sort: queryInit.__sort,
            t__search: queryInit.t__search,
        };
        fetchListUser(ObjToQueryString(obj));
    }, [router.query]);

    const ObjToQueryString = function (obj: any) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p) && obj[p] != undefined && obj[p] != "") {
                if (p == "active") obj[p] = parseInt(obj[p], 10);
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
            role: queryInit.role,
            active: queryInit.active,
            black_type: queryInit.black_type,
            __sort: queryInit.__sort,
            t__search: queryInit.t__search,
            [name]: value,
        };
        console.log(obj);
        const queryStr = "?" + ObjToQueryString(obj);
        router.push(queryStr, undefined, { shallow: true });
    };
    // console.log(userList);
    return (
        <div className="container mx-auto">
            <div className="py-8">
                <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                        Users
                    </h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                        <div className="relative">
                            <select
                                className=" h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="role"
                                onChange={onChangeFilter}
                                value={queryInit.role}
                            >
                                <option value={""}>All</option>
                                <option value={"user"}>User</option>
                                <option value={"admin"}>Admin</option>
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
                        <div className="relative">
                            <select
                                className="h-full rounded-r border-t sm:rounded-r-none border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                name="active"
                                onChange={onChangeFilter}
                                value={queryInit.active}
                            >
                                <option value={""}>All</option>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
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
                        <div className="relative">
                            <select
                                className="h-full rounded-r border-t sm:rounded-r-none border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                name="black_type"
                                onChange={onChangeFilter}
                                value={queryInit.black_type}
                            >
                                <option value={"none"}>None</option>
                                <option value={"block"}>Block</option>
                                <option value={"ban"}>Ban</option>
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
                        <div className="relative">
                            <select
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
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
                                        User
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Student Card
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        {user.photoUrl ? (
                                                            <img
                                                                className="w-full h-full rounded-full"
                                                                src={
                                                                    user.photoUrl
                                                                }
                                                                alt="user photo"
                                                            />
                                                        ) : (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-full w-full cursor-pointer text-[#5F6368]"
                                                                viewBox="1 2 17 17"
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
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {user.firstName}{" "}
                                                            {user.lastName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.role}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.studentCardID}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.email}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {user.active ? (
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                        />
                                                        <span className="relative">
                                                            Activated
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                                        />
                                                        <span className="relative">
                                                            Disactivated
                                                        </span>
                                                    </span>
                                                )}
                                                {user.black_type != "none" && (
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
                                                        />
                                                        <span className="relative">
                                                            {user.black_type}
                                                        </span>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.role != "admin" ? (
<<<<<<< HEAD
                                                        <UserMenu user={user}/>
                                                    ) : <></>}
=======
                                                        <UserMenu user={user} />
                                                    ) : (
                                                        ""
                                                    )}
>>>>>>> 55480b08a458ded87b84de2f43ca70a33dad4cd4
                                                </p>
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
