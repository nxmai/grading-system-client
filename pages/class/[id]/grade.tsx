/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "components/Header";
import AssignmentMenu from "components/grade/AssignmentMenu";
import ListStudentScoreMenu from "components/grade/ListStudentScoreMenu";
import ReturnMenu from "components/grade/ReturnMenu";

import classAssignmentApi from "api/classAssignment";
import classScoreApi from "api/classScore";
import StudentScoreRow from "components/grade/StudentScoreRows";

export default function ClassGrades() {
    const router = useRouter();
    const { id } = router.query;

    const [render, setRender] = useState<boolean>(false); 
    function reRender() { setRender(!render);};

    const [studentList, setStudentList] = useState([]);
    const [assignments, setAssignments] = useState<
        Array<{ title: string; grade: Number; _id: string }>
    >([]);

    async function getScoreBoard() {
        try {
            const studentListRes = await classScoreApi.getStudentsInClass( id );
            const assignmentsRes = await classAssignmentApi.getClassAssignmentsByClassId(id);
            const studentList = studentListRes.data.data;
            const assignments = assignmentsRes.data;

            setAssignments(assignments);
            setStudentList(studentList);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (!id) return;
        getScoreBoard();
    }, [id]);
    console.log(studentList);

    return (
        <>
            <Header />

            <div className="flex flex-col">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="">
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                                <ListStudentScoreMenu classId={id} reRender={reRender}/>
                            </th>
                            {assignments.map((assignment: any) => (
                                <th
                                    key={assignment._id}
                                    scope="col"
                                >
                                    <div className="flex items-center">
                                        <p className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {assignment.title}
                                        </p>
                                        <AssignmentMenu
                                            classId={id}
                                            assignmentId={assignment?._id}
                                            reRender={reRender}
                                        />
                                    </div>
                                    <p className="px-1 text-left text-xs font-normal text-gray-500 tracking-wider">
                                        10 is max
                                    </p>
                                </th>
                            ))}
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            studentList?.map((student: any, index: number) => <StudentScoreRow key={index} classId={id} student={student} />
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
