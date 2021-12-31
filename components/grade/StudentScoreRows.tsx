/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import classScoreApi from "api/classScore";
import ScoreButton from "./OneScoreInRow";

type AppProps = {
    classId: any;
    student: any;
}

export default function StudentScoreRow({classId, student}: AppProps) {
    const [listScore, setListScore] = useState([]);
    const [avarage, setAvarage] = useState(0);

    async function getListScoreByClassIdByStudentId(){
        const data = await classScoreApi.getScoreByClassIdByStudentId(classId, student.id);
        const dataResp = data.data;
        setListScore(dataResp?.assignmentsScore);
        setAvarage(dataResp?.avarage);
    }

    useEffect(()=> {
        getListScoreByClassIdByStudentId();
    }, []);
    console.log(listScore);

    return (
        <tr key={student._id}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        {
                            student.user[0]?.photoUrl ?
                            <img
                                className="h-10 w-10 rounded-full"
                                src={ student.user[0]?.photoUrl}
                                alt=""
                            /> :
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-[#5F6368]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {student.fullName}
                        </div>
                    </div>
                </div>
            </td>
            {
                listScore !== undefined &&
                listScore.map((ele: any, i) => 
                    <ScoreButton 
                        key={i}
                        classId={classId} 
                        assignmentId={ele?.classAssignment?._id}
                        studentId={student?._id}
                        scoreTempt={ele.score} 
                        coreId={ele._id}
                        resetRow={getListScoreByClassIdByStudentId}
                        scoreDraft={ele?.scoreDraft}
                    />
                )
            }
            
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {Math.round(avarage * 100) / 100}
                </span>
            </td>
        </tr>
    );
}
