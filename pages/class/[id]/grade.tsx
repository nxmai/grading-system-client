/* eslint-disable @next/next/no-img-element */
import classAssignmentApi from "api/classAssignment";
import classScoreApi from "api/classScore";
import AssignmentMenu from "components/grade/AssignmentMenu";
import ReturnMenu from "components/grade/ReturnMenu";
import UploadScoreAssignment from "components/grade/UploadScoreAssignment";
import Header from "components/Header";
import { useRouter } from "next/router";
import Button from "components/Button";
import React, { useEffect, useState } from "react";
import UploadScoreModal from "components/class/UploadScoreModal";

function ClassGrades() {
    const router = useRouter();
    const { id } = router.query;

    const [studentList, setStudentList] = useState([]);
    const [assignmentsScore, setAssignmentsScore] = useState([]);
    const [assignments, setAssignments] = useState<
        Array<{ title: string; grade: Number; _id: string }>
    >([]);
    const [totalScore, setTotalScore] = useState<
        Array<{ studentId: string; score: Number }>
    >([]);

    useEffect(() => {
        async function getScoreBoard(id: any) {
            try {
                const assignmentsScoreRes =
                    await classScoreApi.getAssignmentScoreByClassId(id);
                const studentListRes = await classScoreApi.getStudentsInClass(
                    id
                );
                const assignmentsRes =
                    await classAssignmentApi.getClassAssignmentsByClassId(id);

                const assignmentsScore = assignmentsScoreRes.data;
                const studentList = studentListRes.data.data;
                const assignments = assignmentsRes.data;

                setAssignments(assignments);
                setStudentList(studentList);
                setAssignmentsScore(assignmentsScore);

                let data = [];
                data = studentList.map((student: any) => ({
                    studentId: student._id,
                    score: assignmentsScore
                        .filter(
                            (assignmentScore: any) =>
                                assignmentScore.classStudentId == student._id
                        )
                        .reduce(
                            (prev: number, a: any) =>
                                prev +
                                (a.score *
                                    assignments.find(
                                        (item: any) =>
                                            item._id == a.classAssignment
                                    ).grade) /
                                    10,
                            0
                        ),
                }));
                setTotalScore(data);
            } catch (error: any) {
                console.log(error.message);
            }
        }

        getScoreBoard(id);
    }, [id]);

    function handleInputChange(e: any, assignmentId: any, studentId: any) {
        const { value } = e.target;
        let temp: any = [...assignmentsScore];
        const index = assignmentsScore.findIndex(
            (assignmentScore: any) =>
                assignmentScore.classAssignment == assignmentId &&
                assignmentScore.classStudentId == studentId
        );

        if (index != -1) {
            let newItem: any = temp[index];
            newItem.score = value;
            temp[index] = newItem;
        } else {
            let newItem: any = {
                classAssignment: assignmentId,
                classStudentId: studentId,
                score: value,
            };
            temp.push(newItem);
        }
        setAssignmentsScore(temp);
    }

    function addScoreForOneStudentAssignment(assignmentId: any, studentId: any){
        const index = assignmentsScore.findIndex(
            (assignmentScore: any) =>
                assignmentScore.classAssignment == assignmentId &&
                assignmentScore.classStudentId == studentId
        );
        console.log(assignmentsScore[index]);
        //call api
    }
    const [isOpenUploadStudentListModal, setOpenUploadStudentListModal] = useState<boolean>(false);

    // for test
    function onClickDowndloadTemplate() {
        classScoreApi.downloadTemplateListStudentId(id).then((res) => {
            console.log(res);
            alert(res.data.data);
        });
    }

    // for test
    function onClickDowndloadTemplateScore() {
        classScoreApi.downloadTemplateScoreByAssignmentId(id, id).then((res) => {
            console.log(res);
            alert(res.data.data);
        });
    }

    return (
        <>
            <Header />
            
            <UploadScoreModal isOpen={isOpenUploadStudentListModal} setShowModal={setOpenUploadStudentListModal} classId={id} assignmentId={id} />
            <div className="w-[760px] mr-[calc(50%-380px)]">
                <div className="flex">
                    <div className="justify-start">
                        <Button onClick={onClickDowndloadTemplate}>
                            Download Template
                        </Button>
                        {/* <Button onClick={onClickDowndloadTemplateScore}>
                            Download Template Score
                        </Button> */}
                        <Button onClick={()=> setOpenUploadStudentListModal(!isOpenUploadStudentListModal)}>
                            Upload StudentList
                        </Button>
                    </div>
                </div>
            </div>

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
                            {assignments.map((assignment: any) => (
                                <th
                                    key={assignment._id}
                                    scope="col"
                                    className=""
                                >
                                    <div className="flex items-center">
                                        <p className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {assignment.title}
                                        </p>
                                        <AssignmentMenu />
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
                        {studentList?.map((student: any, index) => (
                            <tr key={student._id}>
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
                                {assignments?.map((assignment: any) => (
                                    <td
                                        key={assignment._id}
                                        className="px-0 py-4 whitespace-nowrap group relative"
                                    >
                                        <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full  text-green-800">
                                            {assignmentsScore.filter(
                                                (assignmentScore: any) =>
                                                    assignmentScore.classAssignment ===
                                                        assignment._id &&
                                                    assignmentScore.classStudentId ==
                                                        student._id
                                            ).length !== 0 ? (
                                                assignmentsScore
                                                    .filter(
                                                        (
                                                            assignmentScore: any
                                                        ) =>
                                                            assignmentScore.classAssignment ===
                                                                assignment._id &&
                                                            assignmentScore.classStudentId ==
                                                                student._id
                                                    )
                                                    .map((item: any) => (
                                                        <input
                                                            className="w-10 h-6"
                                                            key={item._id}
                                                            value={item.score}
                                                            type="number"
                                                            min="1"
                                                            max="10"
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    assignment._id,
                                                                    student._id
                                                                )
                                                            }
                                                        />
                                                    ))
                                            ) : (
                                                <input
                                                    className="w-10 h-6"
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            e,
                                                            assignment._id,
                                                            student._id
                                                        )
                                                    }
                                                />
                                            )}
                                            <span className="hidden group-hover:block absolute ml-12">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 cursor-pointer"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    onClick={() => addScoreForOneStudentAssignment(assignment._id, student._id)}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                                    />
                                                </svg>
                                            </span>
                                        </span>
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {totalScore[index]?.score}
                                    </span>
                                </td>
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
