import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import authApi from '../../api/auth';

const clientId = '416191100698-anqr49onakr79lg2tldn7cnv4t62rqnk.apps.googleusercontent.com';

function Register() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const responseGoogle = (response: any) => {
        authApi.googleAuth(response)
            .then(({ data }) => {
                localStorage.setItem('token', `${data}`);
                router.push('/');
                alert('Log in success! 🎉');
            })
            .catch(error => { console.log(error); });
    };

    const onSubmit = () => {
        if (firstName.length && lastName.length && email.length && password.length) {
            authApi.register({ firstName, lastName, email, password })
                .then(({ data }) => {
                    localStorage.setItem('token', `${data}`);
                    router.push('/');
                })
                .catch(error => { console.log(error); });
        } else {
            alert("Not enough info");
        }
    };

    return (
        <>
            <div className='h-screen flex justify-center items-center text-sm font-semibold leading-none tracking-tight text-[#19283E]'>
                <div className="relative w-[370px] h-[600px] flex justify-center items-center bg-[#FEFAF3] rounded-[15px] shadow-md">
                    <div className="w-[200px] h-[200px] bg-[#A5A6F6] bg-opacity-75 rounded-full absolute left-[-100px] top-[-70px] z-[-1]"></div>
                    <div className="w-[200px] h-[300px] bg-[#29B5B8] bg-opacity-50 absolute right-[-70px] bottom-[-60px] z-[-1]"></div>
                    <div className="w-[320px] h-[550px] flex flex-col justify-center bg-white rounded-[5px]">
                        <div className='flex flex-col gap-5'>
                            <h1 className='pl-[35px] font-bold text-[34px] leading-[40px] '>Sign up</h1>
                            <div className='flex flex-col items-center gap-[10px] '>
                                <div className="flex flex-col gap-[5px]">
                                    <label className='' htmlFor="">First name</label>
                                    <div className='flex justify-center w-[250px] h-[45px] border-[1px] rounded-[5px] border-[#19283E]'>
                                        <input
                                            onChange={e => { setFirstName(e.target.value); }}
                                            className='w-[90%] text-[#29B5B8] font-semibold focus:outline-none' type="text" required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <label className='' htmlFor="">Last name</label>
                                    <div className='flex justify-center w-[250px] h-[45px] border-[1px] rounded-[5px] border-[#19283E]'>
                                        <input
                                            onChange={e => { setLastName(e.target.value); }}
                                            className='w-[90%] text-[#29B5B8] font-semibold focus:outline-none' type="text" required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <label className='' htmlFor="">Email</label>
                                    <div className='flex justify-center w-[250px] h-[45px] border-[1px] rounded-[5px] border-[#19283E]'>
                                        <input
                                            onChange={e => { setEmail(e.target.value); }}
                                            className='w-[90%] text-[#29B5B8] font-semibold focus:outline-none' type="email" required />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <label className='' htmlFor="">Password</label>
                                    <div className='flex justify-center w-[250px] h-[45px] border-[1px] rounded-[5px] border-[#19283E]'>
                                        <input
                                            onChange={e => { setPassword(e.target.value); }}
                                            className='w-[90%] text-[#29B5B8] font-semibold focus:outline-none' type="password" required />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <button
                                    type='submit'
                                    onClick={onSubmit}
                                    className='w-[250px] h-[45px] rounded-[5px] text-sm font-semibold leading-none tracking-tight text-white bg-[#19283E]'>Sign up</button>
                                <GoogleLogin
                                    className='w-[248px] h-[43px] rounded-[5px] text-sm font-semibold leading-none tracking-tight'
                                    clientId={clientId}
                                    buttonText='Login'
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                >Sign up with Google</GoogleLogin>
                                <a className='underline' href="/auth/login">Back to log in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
