import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import ClassCard from "../components/class/ClassCard";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchClassesFromAPI, selectClass } from "features/class/classSlice";

const Home: NextPage = () => {
    // const [classesData, setClassesData] = useState([]);
    const [isCreateClass, setIsCreateClass] = useState(false);

    const createClass = () => {
        setIsCreateClass(!isCreateClass);
    };

    const classes = useAppSelector(selectClass);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchClassesFromAPI());
    },[dispatch]);

    // useEffect(() => {
    //     async function getAllClass() {
    //         try {
    //             const res = await classApi.getAllClassesByUser();
    //             setClassesData(res?.data);
    //         } catch (error: any) {
    //             console.log(error?.message);
    //         }
    //     }

    //     getAllClass();
    // }, [isCreateClass]);

    return (
        <div className="mb-20">
            <Header createClass={createClass} />
            {/* <Header /> */}

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

export default Home;
