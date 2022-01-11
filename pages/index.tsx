import React, { ReactElement, useEffect } from "react";
import ClassCard from "../components/class/ClassCard";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchClassesFromAPI, selectClass } from "features/class/classSlice";
import AuthLayout from "components/layouts/AuthLayout";

export default function Home() {
    const classes = useAppSelector(selectClass);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchClassesFromAPI());
    },[dispatch]);

    return (
        <div className="mb-20">
            <Header />
            <div className="flex flex-wrap gap-8 mr-16 ml-16 mt-8">
                {classes.map((item: any, index: React.Key | null | undefined) => (
                    <div key={index}>
                        <ClassCard classInfo={item} />
                    </div>
                ))}
            </div>
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
