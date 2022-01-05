import { useRouter } from "next/router";
import React, { useState } from "react";
import classInviteUserApi from "api/classInviteUser";

export default function ConfirmInviteClass() {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState<string>("");

    async function onActionClick() {
        try {
            const res = await classInviteUserApi.confirmInviteUserLink(id);
            console.log(res);
        router.push(`/class/${id}`);
        } catch (err: any) {
            setError(err);
        }
    }
    return (
        <div className="p-6 fixed z-50 inset-1
                    outline-none focus:outline-none 
                    justify-center items-center flex overflow-x-auto bg-gray-200 bg-opacity-50">

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 text-left">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Confirm Invite</p>
                        <p>Confirm invite user to class</p>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            <div className="md:col-span-5">
                                <label htmlFor="class_id">Class ID</label>
                                <input type="text" name="class_id" id="class_id"
                                    disabled
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={id} />
                            </div>
                            {error && (
                                <div className="md:col-span-5">
                                    <label className="text-red-500">Error: {error}</label>
                                </div>
                            )}
                            <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end pr-4">
                                            <button 
                                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                        </div>
                                <div className="inline-flex items-end">
                                    <button
                                    onClick={onActionClick}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}