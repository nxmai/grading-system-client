import React, { Fragment, useEffect, useState } from "react";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProfileComp({ isOpen, setShowModal }: AppProps) {
    return (
        <Fragment>
            {isOpen && (
                <div className="p-6 fixed z-50 inset-1
                    outline-none focus:outline-none 
                    justify-center items-center flex overflow-x-auto bg-gray-200 bg-opacity-50">
        
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 text-left">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Information</p>
                                <p>Please fill out all the fields.</p>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-2">
                                        <label htmlFor="first_name">First Name</label>
                                        <input type="text" name="first_name" id="first_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input type="text" name="last_name" id="last_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="text" name="email" id="email" disabled className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                                    </div>
                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end pr-4">
                                            <button 
                                                onClick={()=>setShowModal(false)}
                                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                        </div>
                                        <div className="inline-flex items-end">
                                            <button 
                                            onClick={()=>setShowModal(false)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </Fragment>
    );
}