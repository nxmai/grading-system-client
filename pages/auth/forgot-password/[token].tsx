/* eslint-disable react/no-unescaped-entities */
import authApi from 'api/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function SuccessComfirmation() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState<String>("");
    const [confirmPassword, setConfirmPassword] = useState<String>("");
    const [inputError, setInputError] = useState<String>("");

    function NewPasswordOnChange(e: String) {
        setNewPassword(e);
        if (e !== confirmPassword) {
            setInputError("Passwords do NOT match");
        } else {
            setInputError("");
        }
    }

    function confirmPasswordOnChange(e: String) {
        setConfirmPassword(e);
        if (e !== newPassword) {
            setInputError("Passwords do NOT match");
        } else {
            setInputError("");
        }
    }

    function onSubmit() {
        const { token } = router.query;
        if (newPassword !== confirmPassword) {
            setInputError("Passwords do NOT match");
        } else {
            setInputError("");
            authApi.renewPassword(token, { password: newPassword })
                .then(({ data }) => {
                    localStorage.setItem('token', `${data}`);
                    router.push('/');
                })
                .catch(error => { console.log(error); });
        }

    }
    return (
        <>
            <div className='h-screen flex justify-center items-center text-sm font-semibold leading-none tracking-tight text-[#19283E]'>
                <div className="relative w-[370px] h-[350px] flex justify-center items-center bg-[#FEFAF3] rounded-[15px] shadow-md">
                    <div className="w-[200px] h-[200px] bg-[#A5A6F6] bg-opacity-75 rounded-full absolute left-[-100px] top-[-70px] z-[-1]"></div>
                    <div className="w-[200px] h-[300px] bg-[#29B5B8] bg-opacity-50 absolute right-[-70px] bottom-[-60px] z-[-1]"></div>
                    <div className="w-[320px] h-[300px] bg-white rounded-[5px]">
                        <div className='h-full w-full flex flex-col justify-around py-10'>
                            {/* <h1 className='pl-[35px] font-bold text-[34px] leading-[40px]'>Congrats 🎉</h1>
                            <h1 className='pl-[35px] text-normal text-gray-400'>Thank you for choosing us.</h1> */}
                            <div className='flex flex-col items-center gap-[10px] '>
                                <div className="flex flex-col gap-[5px]">
                                    <label className='' htmlFor="">New Password</label>
                                    <div className='flex justify-center w-[250px] h-[45px] border-[1px] rounded-[5px] border-[#19283E]'>
                                        <input
                                            onChange={e => { NewPasswordOnChange(e.target.value); }}
                                            className='w-[90%] text-[#29B5B8] font-semibold focus:outline-none' type="password" required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <label className='' htmlFor="">Confirm New Password</label>
                                    <div className='flex justify-center w-[250px] h-[45px] border-[1px] rounded-[5px] border-[#19283E]'>
                                        <input
                                            onChange={e => { confirmPasswordOnChange(e.target.value); }}
                                            className='w-[90%] text-[#29B5B8] font-semibold focus:outline-none' type="password" required />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-5 pl-[35px]">
                                {inputError !== "" ? (
                                    <p className="text-red-500 text-xs">
                                        * {inputError}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex flex-col mt-3 items-center">
                                <button
                                    type='submit'
                                    onClick={onSubmit}
                                    className='w-[250px] h-[45px] rounded-[5px] text-sm font-semibold leading-none tracking-tight text-white bg-[#19283E]'
                                >Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuccessComfirmation;
