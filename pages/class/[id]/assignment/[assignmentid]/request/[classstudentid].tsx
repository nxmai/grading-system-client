/* eslint-disable @next/next/no-img-element */
import Button from "components/Button";
import Header from "components/Header";
import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import classAssignmentApi from "api/classAssignment";
import assignmentReviewApi from "api/assignmentReview";
import classApi from "api/classes";
import userApi from "api/user";
import classScoreApi from "api/classScore";
import ReviewRequestModal from "components/grade/review/ReviewRequestModal";
import { useAppSelector } from "app/hooks";
import { selectUser } from "features/user/userSlice";
import GoToInputStudentCardModal from "components/class/GoToInputStudentCardModal";
import AcceptNewScoreModal from "components/grade/review/AcceptNewScoreModal";
import Home from "pages";
import AuthLayout from "components/layouts/AuthLayout";

type ClassUserRole = {
    role: "teacher" | "student";
};

function ReviewRequest() {
    const user = useAppSelector(selectUser);
    const [assignmentInfo, setAssignmentInfo] = useState<any>({ title: "" });
    const [reviewRequestData, setReviewRequestData] = useState<any>({});
    const [classUserRole, setClassUserRole] = useState<ClassUserRole>({
        role: "student",
    });
    const [assignmentScore, setAssignmentScore] = useState<any>({});

    const [openReviewRequest, setOpenReviewRequest] = useState<boolean>(false);
    const [openReplyRequest, setOpenReplyRequest] = useState<boolean>(false);
    const [listChat, setListChat] = useState([]);
    const [chatText, setChatText] = useState<string>("");

    const [rerenderWhensubmit, setRerenderWhensubmit] = useState(false);

    const router = useRouter();
    const { id, assignmentid, classstudentid } = router.query;
    useEffect(() => {
        const getSingleAssignment = async () => {
            try {
                const response = await classAssignmentApi.getAssignmentById(
                    id,
                    assignmentid
                );
                setAssignmentInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getReviewRequestDetail = async () => {
            try {
                const response =
                    await assignmentReviewApi.getOneAssignmentReviewRequest(
                        id,
                        assignmentid,
                        classstudentid
                    );
                const revDetail = response.data.data;
                if (revDetail) {
                    const reps =
                        await assignmentReviewApi.getReviewChatByReviewRequestId(
                            id,
                            assignmentid,
                            revDetail._id
                        );
                    setListChat(reps?.data?.data);
                }
                setReviewRequestData(revDetail);
            } catch (error) {
                console.log(error);
            }
        };

        async function getUserRoleByClassID() {
            try {
                const res = await classApi.getUserRoleByClassId(id);
                setClassUserRole({ ...res?.data });
            } catch (error: any) {
                console.log(error.message);
                // return router.push("/");
            }
        }

        //studnet
        const getAssignmentScore = async () => {
            try {
                const response =
                    await classScoreApi.getOneAssignmentScoreOfOneStudent(
                        id,
                        assignmentid,
                        classstudentid
                    );
                setAssignmentScore(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAssignmentScore();
        getUserRoleByClassID();
        getReviewRequestDetail();
        getSingleAssignment();
    }, [id, rerenderWhensubmit]);

    const setRerender = () => {
        setRerenderWhensubmit(!rerenderWhensubmit);
    };

    const handleAcceptScore = async () => {
        if (classstudentid) {
            try {
                const reps =
                    await assignmentReviewApi.acceptScoreRequestByStudent(
                        id,
                        assignmentid,
                        classstudentid
                    );
                    setRerender();
                await userApi.responseToStudentGradeReviewNotification({ classId: id, assignmentId: assignmentid, classStudentId: classstudentid });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleIgnoreScore = async () => {
        if (classstudentid) {
            try {
                const reps =
                    await assignmentReviewApi.ignoreScoreRequestByStudent(
                        id,
                        assignmentid,
                        classstudentid
                    );
                setRerender();
                await userApi.responseToStudentGradeReviewNotification({ classId: id, assignmentId: assignmentid, classStudentId: classstudentid });
            } catch (error) {
                console.log(error);
            }
        }
    };

    async function fetchReviewChat() {
        try {
            const reps =
                await assignmentReviewApi.getReviewChatByReviewRequestId(
                    id,
                    assignmentid,
                    reviewRequestData._id
                );
            setListChat(reps?.data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function sendChat() {
        await assignmentReviewApi.createReviewChat(
            id,
            assignmentid,
            reviewRequestData._id,
            chatText
        );
        setChatText("");
        fetchReviewChat();
    }

    return (
        <div>
            <Header attemptHandle={function (): boolean {
                throw new Error("Function not implemented.");
            } } />

            <ReviewRequestModal
                isOpen={openReviewRequest}
                setShowModal={setOpenReviewRequest}
                setReviewData={setReviewRequestData}
            />
            <AcceptNewScoreModal
                isOpen={openReplyRequest}
                setShowModal={setOpenReplyRequest}
                setRenderAction={setRerender}
            />

            <div className="ml-[calc(50%-450px)] mr-[calc(50%-450px)] mt-6 ">
                <p className="text-3xl text-blue-700 mb-2">
                    {assignmentInfo?.title}
                </p>

                <p className="mb-4">Grade scale: {assignmentInfo.grade}</p>

                <div className="w-full h-[1px] bg-blue-700"></div>

                {classUserRole.role == "student" ? (
                    <div className="flex justify-between items-center mt-4">
                        <p className="">You get: {assignmentScore?.score}/10</p>
                        {!assignmentScore ||
                        (assignmentScore?.score && !reviewRequestData) ? (
                            <Button
                                type="button"
                                variants="primary"
                                className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => setOpenReviewRequest(true)}
                            >
                                Complain
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}

                {classUserRole.role == "teacher" ? (
                    <>
                        <div className="mt-4">
                            <p className="mb-2">
                                Review request from student:{" "}
                                {reviewRequestData?.classStudentId?.fullName}
                            </p>
                            <p className="mb-2">
                                Student ID:{" "}
                                {reviewRequestData?.classStudentId?.studentId}
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-2 mb-4">
                            <p>Old grade: {assignmentScore.score}</p>
                        </div>
                    </>
                ) : (
                    ""
                )}

                {(classUserRole.role == "student" && reviewRequestData) ||
                    classUserRole.role == "teacher" ? (
                    <div>
                        <label className="text-sm font-bold text-blue-800">
                            Grade expectation
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="h-10 border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50"
                            disabled
                            value={reviewRequestData?.scoreExpectation}
                        />

                        <label className="text-sm font-bold text-blue-800 mt-2">
                            Explanation
                        </label>
                        <textarea
                            name="grade"
                            id="grade"
                            className="border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50 h-auto"
                            value={reviewRequestData?.explanation}
                            disabled
                            rows={4}
                        />
                    </div>
                ) : (
                    ""
                )}

                {classUserRole.role == "student" &&
                reviewRequestData?.isAccept != null ? (
                    reviewRequestData.isAccept ? (
                        reviewRequestData?.scoreFromTeacher ? (
                            <div>
                                <p className="mt-2 mb-4 font-bold text-red-600 text-lg text-right">
                                    Teacher mark final grade with other score
                                </p>
                                <p>Reply from teacher with your new grade: </p>
                                <input
                                    type="text"
                                    name="title"
                                    className="h-10 mb-8 border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50"
                                    disabled
                                    value={reviewRequestData?.replyFromTeacher}
                                />
                            </div>
                        ) : (
                            <p className="mt-2 mb-4 font-bold text-red-600 text-lg text-right">
                                Teacher accept your request grade
                            </p>
                        )
                    ) : (
                        <p className="mt-2 mb-4 font-bold text-red-600 text-lg text-right">
                            Teacher ignore your request grade
                        </p>
                    )
                ) : (
                    ""
                )}

                {classUserRole.role == "teacher" ? (
                    reviewRequestData.isAccept == null ? (
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                type="button"
                                variants="secondary"
                                className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => setOpenReplyRequest(true)}
                            >
                                Accept other Score
                            </Button>
                            <Button
                                type="button"
                                variants="primary"
                                className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={handleAcceptScore}
                            >
                                Accept Score
                            </Button>
                            <Button
                                type="button"
                                variants="error"
                                className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={handleIgnoreScore}
                            >
                                Ignore Score
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <p className="mt-2 mb-4 font-bold text-red-600 text-lg text-right">
                                {reviewRequestData?.scoreFromTeacher
                                    ? "You already submit review with other score and some reply"
                                    : "You already submit review"}
                            </p>
                            {reviewRequestData?.scoreFromTeacher ? (
                                <input
                                    type="text"
                                    name="title"
                                    className="h-10 mb-8 border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50"
                                    disabled
                                    value={reviewRequestData?.replyFromTeacher}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    )
                ) : (
                    ""
                )}

                <div className="text-sm font-bold text-blue-800 mt-2">
                    Comment about review request
                </div>
                <div className="mt-2 mb-4 w-full h-[1px] bg-blue-700"></div>

                {listChat.map((chatInfo: any, i) => {
                    if (chatInfo?.user?._id !== user?._id) {
                        return (
                            <div className="flex py-2">
                                <img
                                    className="w-6 h-6 rounded-3xl"
                                    alt="avt"
                                    src={chatInfo?.user?.photoUrl}
                                />
                                <p className=" px-2">{chatInfo?.content}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div className="flex flex-row-reverse py-2">
                                <img
                                    className="w-6 h-6 rounded-3xl"
                                    alt="avt"
                                    src={chatInfo?.user?.photoUrl}
                                />
                                <p className=" px-2">{chatInfo?.content}</p>
                            </div>
                        );
                    }
                })}

                <div className=" mt-4 flex justify-end space-x-4">
                    <input
                        className="shadow appearance-none border w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="chatText"
                        name="chatText"
                        type="text"
                        placeholder="type chat ..."
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                    />
                    <Button onClick={sendChat}>Send</Button>
                </div>
                <div className="mt-4 mb-24"></div>
            </div>
        </div>
    );
}

export default ReviewRequest;

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout >
            {page}
        </AuthLayout>
    );
};