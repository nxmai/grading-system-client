/* eslint-disable react/no-unescaped-entities */
import authApi from 'api/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function SuccessComfirmation() {
    const router = useRouter();
    const [inputError, setInputError] = useState<String>("");

    function onSubmit() {
        const { token } = router.query;
        authApi.confirmEmail(token)
            .then(({ data }) => {
                localStorage.setItem('token', `${data}`);
                router.push('/');
            })
            .catch(error => setInputError(error.message));
    }
    return (
        <>
            <div className='h-screen flex justify-center items-center text-sm font-semibold leading-none tracking-tight text-[#19283E]'>
                <div className="relative w-[370px] h-[300px] flex justify-center items-center bg-[#FEFAF3] rounded-[15px] shadow-md">
                    <div className="w-[200px] h-[200px] bg-[#A5A6F6] bg-opacity-75 rounded-full absolute left-[-100px] top-[-70px] z-[-1]"></div>
                    <div className="w-[200px] h-[300px] bg-[#29B5B8] bg-opacity-50 absolute right-[-70px] bottom-[-60px] z-[-1]"></div>
                    <div className="w-[320px] h-[250px] bg-white rounded-[5px]">
                        <div className='h-full w-full flex flex-col justify-around py-10'>
                            {inputError !== "" ?
                                <>
                                    <h1 className='pl-[35px] font-bold text-[34px] leading-[40px]'>Congrats 🎉</h1>
                                    <h1 className='pl-[35px] text-normal text-gray-400'>Thank you for choosing us.</h1>
                                    <div className="flex flex-col mt-3 items-center">
                                        <button
                                            type='submit'
                                            onClick={onSubmit}
                                            className='w-[250px] h-[45px] rounded-[5px] text-sm font-semibold leading-none tracking-tight text-white bg-[#19283E]'
                                        >Let's go!</button>
                                    </div>
                                </> : <>
                                    <h1 className='pl-[35px] font-bold text-[34px] leading-[40px]'>Sorry </h1>
                                    <h1 className='pl-[35px] text-normal text-red-500'>{inputError}</h1>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuccessComfirmation;
