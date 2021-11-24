import type { NextPage } from "next";
import React, { useState, FC, useEffect } from "react";
import ClassCard from "../components/class/ClassCard";
import Header from "../components/Header";
import classApi from "../api/classes";

const Home: NextPage = () => {
    const [classesData, setClassesData] = useState([]);
    const [isCreateClass, setIsCreateClass] = useState(false);

    const createClass = () => {
        setIsCreateClass(!isCreateClass);
    };

    useEffect(() => {
        console.log("use effect");
        async function getAllClass() {
            try {
                const res = await classApi.getAllClassesByUser();
                setClassesData(res?.data);
            } catch (error: any) {
                console.log(error?.message);
            }
        }

        getAllClass();
    }, [isCreateClass]);

    return (
        <div className="mb-20">
            <Header createClass={createClass} />
            {/* <Header /> */}

            <div className="flex flex-wrap gap-8 mr-16 ml-16 mt-8">
                {classesData.map((item, index) => (
                    <div key={index}>
                        <ClassCard classInfo={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
