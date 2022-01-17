import { useAppDispatch } from "app/hooks";
import React, { FC, useEffect, useRef } from "react";

interface ErrorMessageProps {
    title: string;
    subTitle: string;
    closeModal: () => void;
}

function useOutsideCollapse(ref: any, closeModal: any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeModal();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const ErrorMessage: FC<ErrorMessageProps> = ({ closeModal, title, subTitle }) => {
    const wrapperRef = useRef(null);
    useOutsideCollapse(wrapperRef, closeModal);

    const onCloseModal = () => {
        closeModal();
    };

    const dispatch = useAppDispatch();

    return (
        <>
            <div ref={wrapperRef} className='mt-20 flex justify-center items-center text-sm font-semibold leading-none tracking-tight text-[#19283E]'>
                <div className="relative w-[370px] h-[300px] flex justify-center items-center bg-[#FEFAF3] rounded-[15px] shadow-md">
                    <div className="w-[200px] h-[200px] bg-[#A5A6F6] bg-opacity-75 rounded-full absolute left-[-100px] top-[-70px] z-[-1]"></div>
                    <div className="w-[200px] h-[300px] bg-[#29B5B8] bg-opacity-50 absolute right-[-70px] bottom-[-60px] z-[-1]"></div>
                    <div className="w-[320px] h-[250px] flex flex-col justify-center bg-white rounded-[5px]">
                        <div className='flex flex-col gap-5'>
                            <h1 className='pl-[35px] font-bold text-[34px] leading-[40px]'>{title}</h1>
                            <h1 className='pl-[35px] text-normal text-gray-400'>{subTitle}</h1>
                            <div className="flex flex-col gap-4 items-center">
                                <button
                                    type='submit'
                                    onClick={onCloseModal}
                                    className='w-[250px] h-[45px] rounded-[5px] text-sm font-semibold leading-none tracking-tight text-white bg-[#19283E]'
                                >Dismiss</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorMessage;
