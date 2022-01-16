/* eslint-disable react/no-unescaped-entities */
import authApi from 'api/auth';
import MailWaiting from 'components/user/MailWaiting';
import Link from 'next/link';
import React, { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSended, setIsSended] = useState(false);

    function reSend() {

    }

    function onSubmit() {
        authApi.sendInstruction({ email });
        setIsSended(true);
    }

    return (
        <>
            {!isSended ? <div className='h-screen flex justify-center items-center text-sm font-semibold leading-none tracking-tight text-[#19283E]'>
                <div className="relative w-[370px] h-[450px] flex justify-center items-center bg-[#FEFAF3] rounded-[15px] shadow-md">
                    <div className="w-[200px] h-[200px] bg-[#A5A6F6] bg-opacity-75 rounded-full absolute left-[-100px] top-[-70px] z-[-1]"></div>
                    <div className="w-[200px] h-[300px] bg-[#29B5B8] bg-opacity-50 absolute right-[-70px] bottom-[-60px] z-[-1]"></div>
                    <div className="w-[320px] h-[400px] flex flex-col justify-center bg-white rounded-[5px]">
                        <div className='flex flex-col gap-5'>
                            <h1 className='pl-[35px] font-bold text-[34px] leading-[40px]'>Forgot Your Password? </h1>
                            <h1 className='pl-[35px] text-normal text-gray-400'>Don't worry, we got your back👌</h1>
                            <div className='flex flex-col items-center gap-[10px] '>
                                <div className="flex flex-col gap-[5px]">
                                    <label className='' htmlFor="">Email</label>
                                    <div className='flex justify-center w-[250px] h-[45px] border-[1px] rounded-[5px] border-[#19283E]'>
                                        <input
                                            onChange={e => { setEmail(e.target.value); }}
                                            className='w-[90%] text-[#29B5B8] font-semibold focus:outline-none' type="email" required />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <button
                                    type='submit'
                                    onClick={onSubmit}
                                    className='w-[250px] h-[45px] rounded-[5px] text-sm font-semibold leading-none tracking-tight text-white bg-[#19283E]'
                                >Send Instructions</button>
                                <Link href="/auth/login">
                                    <a className='underline'>Back to Log in</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <MailWaiting title={`We've just sent you an email to renew your password.`} onSubmit={reSend} />}
        </>
    );
}

export default ForgotPassword;
