import React, { useState } from "react";
import classScoreApi from "api/classScore";


type ScoreBtnProps = { classId: any; assignmentId: any; studentId: any; scoreTempt: any; coreId? : any; resetRow: VoidFunction};

export default function ScoreButton({ classId, assignmentId, studentId, scoreTempt, coreId, resetRow }: ScoreBtnProps) {
    const initScore = coreId ? scoreTempt : undefined;
    const [score, setScore] = useState<number>(initScore);

    function onActionClick() {
        // update or create
        if (coreId) {
            const data = { score: score };

            classScoreApi.updateOneClassScore(classId, coreId, data)
            .catch((error: any)=>{
                console.log(error);
            }).finally(()=>{
                resetRow();
            });
        } else {
            const data = { 
                classAssignment: assignmentId, 
                classStudentId: studentId,
                score: score };

            classScoreApi.createOneClassScore(classId, data)
            .catch((error: any)=>{
                console.log(error);
            }).finally(()=>{
                resetRow();
            });
        }
    }
    return (
        <td
            className="px-0 py-4 whitespace-nowrap group group"
        >
            <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full text-green-800">

                <input
                    className="w-10 h-6"
                    type="number"
                    min="1"
                    max="10"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value, 10))}
                />
                <span className="hidden group-hover:block absolute ml-12">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={onActionClick}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </svg>
                </span>

            </span>
        </td>
    );
}
