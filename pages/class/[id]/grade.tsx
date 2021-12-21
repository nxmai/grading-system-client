/* eslint-disable @next/next/no-img-element */
import classAssignmentApi from "api/classAssignment";
import classScoreApi from "api/classScore";
import AssignmentMenu from "components/grade/AssignmentMenu";
import Header from "components/Header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ClassGrades() {
    const router = useRouter();
    const { id } = router.query;

    const [studentList, setStudentList] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [gradeAssignment, setGradeAssignment] = useState(gradeAssi);

    async function getStudents(id: any) {
        try {
            const res = await classScoreApi.getStudentsInClass(id);
            setStudentList(res?.data?.data);
            console.log(res?.data?.data);
        } catch (error: any) {
            console.log(error.message);
        }
        // setAssignments(assignmentsData);
        // setGradeAssignment(gradeAssi);
    }
    console.log(studentList);
    console.log(assignments);
    console.log(gradeAssignment);

    async function getAssignments(id: any) {
        try {
            if (id == undefined) return;
            const res = await classAssignmentApi.getClassAssignmentsByClassId(
                id
            );
            setAssignments(res?.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    // TODO: upload student list
    // TODO: load grade board
    // scores: {classStudentId, classAssignment, score}
    // assignment: id, title
    // student: id, firstName, lastName, photoUrl

    useEffect(() => {
        getStudents(id);
        getAssignments(id);
    }, [id]);

    return (
        <>
            <Header />
            <div className="flex flex-col">
                {/* <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
                {/* <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"> */}
                {/* <div className="overflow-hidden border-b border-gray-200"> */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="">
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            {assignments.map((assignment: any, index) => (
                                <th key={index} scope="col" className="">
                                    <div className="flex items-center">
                                        <p className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {assignment.title}
                                        </p>
                                        {/* <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                            />
                                        </svg> */}
                                        <AssignmentMenu classId={id} assignmentId={assignment?._id}/>
                                    </div>
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
                        {studentList.map((student: any) => (
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={student.photoUrl}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {student.fullName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                {gradeAssignment
                                    .filter(
                                        (item) =>
                                            item.classStudentId === student.id
                                    )
                                    .map((item, index) => (
                                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {item.score}
                                            </span>
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
            </div>
        </>
    );
}

export default ClassGrades;

const gradeAssi = [
    {
        classStudentId: "61c19a71f8b1e46d2b946200",
        classAssignment: "61c193f4003e70393277dde0",
        score: 10,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946204",
        classAssignment: "61c193f4003e70393277dde0",
        score: 9,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946201",
        classAssignment: "61c193f4003e70393277dde0",
        score: 8,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946202",
        classAssignment: "61c193f4003e70393277dde0",
        score: 7
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946203",
        classAssignment: "61c193f4003e70393277dde0",
        score: 6,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946200",
        classAssignment: "61c19487003e70393277de17",
        score: 10,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946204",
        classAssignment: "61c19487003e70393277de17",
        score: 9,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946201",
        classAssignment: "61c19487003e70393277de17",
        score: 8,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946202",
        classAssignment: "61c19487003e70393277de17",
        score: 7,
    },
    {
        classStudentId: "61c19a71f8b1e46d2b946203",
        classAssignment: "61c19487003e70393277de17",
        score: 6,
    },
];
