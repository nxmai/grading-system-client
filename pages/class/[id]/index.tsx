import React, { ReactElement, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import classApi from "../../../api/classes";
import Image from "next/image";
import Link from "next/link";
import GradeStructureMenu from "components/class/GradeStructureMenu";
import classAssignmentApi from "api/classAssignment";
import AuthLayout from "components/layouts/AuthLayout";

const ClassDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [gradeStructure, setGradeStructure] = useState<
        Array<{ title: string; grade: Number; _id: string }>
    >([]);

    const [classData, setClassData] = useState({
        name: "",
        subject: "",
        coverUrl: "",
        description: "",
    });

    async function getClass() {
        try {
            const res = await classApi.getClassById(id);
            setClassData({ ...res?.data });
        } catch (error: any) {
            console.log(error.message);
            return router.push("/");
        }
    }

    async function getClassAssignmentByClassId() {
        try {
            if (id == undefined) return;
            const res = await classAssignmentApi.getClassAssignmentsByClassId(id);
            setGradeStructure(res?.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        async function doAsyncTask() {
            await getClass();
            await getClassAssignmentByClassId();
        }
        doAsyncTask();
    }, [id]);
    
    return (
        <>
            <Header />
            <div className="ml-[calc(50%-500px)] mr-[calc(50%-500px)] mt-6 ">
                <section className="flex relative h-[240px] w-[1000px] ">
                    {/* <img
            src="/images/banner.jpg"
            alt="image class"
            className="h-[240px] w-[1000px] bg-blue-500 absolute z-[-1]"
          /> */}
                    <Image
                        src={
                            classData.coverUrl
                                ? classData.coverUrl
                                : "/images/banner.jpg"
                        }
                        alt="image class"
                        className="h-[240px] w-[1000px] absolute z-[-1] rounded-lg"
                        layout="fill"
                    />

                    <div className="mb-0 mt-auto pl-6 pb-6">
                        <p className="text-4xl font-bold text-white">
                            {classData.name}
                        </p>
                        <p className="text-2xl font-semibold text-white">
                            {classData.subject}
                        </p>
                    </div>
                </section>
                <section className="mt-4">
                    <div className="flex">
                        <div className="flex flex-col space-y-4">
                            <div className="min-w-[200px] max-w-[240px] shadow-md p-4 rounded-sm">
                                <div className="flex justify-between">
                                    <div className="">Grade Structure</div>
                                    {/* <DotsVerticalIcon className="w-4 cursor-pointer hover:text-black-500"/> */}
                                    <GradeStructureMenu classId={id} />
                                </div>
                                <div className="h-4"></div>
                                {gradeStructure?.map((item, index) => {
                                    // let url = `/class/${id}/grade/${item._id}`;
                                    let url = "#";
                                    return (
                                        <Link href={url} key={index}>
                                            <a className="text-blue-600 truncate block">{item.title} : {item.grade}</a>
                                        </Link>
                                    );
                                })}
                            </div>
                            {/* <div className="min-w-[200px] max-w-[240px] shadow-md p-2 rounded-sm">
                            <div className="flex justify-between">
                                <div className="text-semibold">Invite Link</div>
                                <DotsVerticalIcon className="w-4 cursor-pointer hover:text-black-500"/>
                            </div>
                            <div className="h-4"></div>
                            <Link href="#">
                                <a className="text-blue-600 truncate block">###</a>
                            </Link>
                        </div> */}
                        </div>
                        <div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ClassDetail;

ClassDetail.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout >
            {page}
        </AuthLayout>
    );
};
