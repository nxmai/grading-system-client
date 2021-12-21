/* eslint-disable @next/next/no-img-element */
import classAssignmentApi from 'api/classAssignment';
import classApi from 'api/classes';
import Header from 'components/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function ClassGrades() {
    const router = useRouter();
    const { id } = router.query;

    const [studentList, setStudentList] = useState([]);
    const [assignments, setAssignments] = useState([]);

    async function getStudents(id: any) {
        try {
            const res = await classApi.getStudentsInClass(id);
            setStudentList(res?.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async function getAssignments(id: any) {
        try {
            if (id == undefined) return;
            const res = await classAssignmentApi.getClassAssignmentsByClassId(id);
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
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        {assignments.map((assignment: any, index) => <>
                                            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {assignment.title}
                                            </th></>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {studentList.map((student: any, index) => <>
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={student.photoUrl} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {student.firstName} {student.lastName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    100
                                                </span>
                                            </td>
                                        </tr>
                                    </>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClassGrades;
