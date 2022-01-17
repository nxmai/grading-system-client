import React, { ReactElement, useEffect, useState } from "react";
import ClassCard from "../components/class/ClassCard";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchClassesFromAPI, selectClass } from "features/class/classSlice";
import AuthLayout from "components/layouts/AuthLayout";
import { selectUser } from "features/user/userSlice";
import ErrorMessage from "components/user/ErrorMessage";

export default function Home() {
    const classes = useAppSelector(selectClass);
    const [attempt, setAttempt] = useState<boolean>(false);
    const userInfo = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchClassesFromAPI());
    },[dispatch]);

    const attemptHandle = () => {
        if (userInfo.black_type == "block") {
            setAttempt(true);
        }
        return userInfo.black_type == "block";
    };

    return (
        <div className="mb-20">
            <Header attemptHandle={attemptHandle}/>
            <div className="flex flex-wrap gap-8 mr-16 ml-16 mt-8">
                {classes.map((item: any, index: React.Key | null | undefined) => (
                    <div key={index}>
                        <ClassCard attemptHandle={attemptHandle} classInfo={item} />
                    </div>
                ))}
            </div>
            {attempt ? <ErrorMessage title="Sorry" subTitle={`Your account was blocked 🔒`} closeModal={() => setAttempt(false)} /> : <></>}
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout >
            {page}
        </AuthLayout>
    );
};
