import Header from "components/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classAssignmentApi from "api/classAssignment";
import RequestComp from "components/grade/review/RequestComp";
import assignmentReviewApi from "api/assignmentReview";

const Requests = () => {
    const [assignmentInfo, setAssignmentInfo] = useState<any>({ title: "" });
    const [allReviewRequestsWaiting, setAllReviewRequestsWaiting] = useState<any>([]);
    const [allDoneRequest, setAllDoneRequest] = useState<any>([]);

    const router = useRouter();
    const { id, assignmentid } = router.query;

    useEffect(() => {
        const getAllReviewRequests = async () => {
            try {
                const response =
                    await assignmentReviewApi.getAllReviewRequestsInOneAssignment(
                        id,
                        assignmentid
                    );
                const allRequestIsDone = response.data.data.filter((item: any) => item.isAccept != null);
                setAllDoneRequest(allRequestIsDone);

                const allRequestWaiting = response.data.data.filter((item: any) => item.isAccept == null);
                setAllReviewRequestsWaiting(allRequestWaiting);
            } catch (error) {
                console.log(error);
            }
        };
        getAllReviewRequests();
    }, [id]);

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

        getSingleAssignment();
    }, [id]);

    return (
        <div>
            <Header attemptHandle={function (): boolean {
                throw new Error("Function not implemented.");
            } } />
            <div className="ml-[calc(50%-450px)] mr-[calc(50%-450px)]">
                <div className=" mt-6 flex justify-center mb-4">
                    <div className="w-[700px] h-[84px] flex justify-center p-6 flex-col rounded-xl mb-2 shadow-md border-t-4 border-blue-500">
                        <div className="flex justify-between">
                            <p className="font-bold">Review Request</p>
                            <p>
                                Assignment:{" "}
                                <span className="font-bold text-blue-700">
                                    {assignmentInfo.title}
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p>All review requested of student</p>
                            <p>
                                Grade scale:{" "}
                                <span className="font-bold text-blue-700">
                                    {assignmentInfo.grade}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center flex-col">
                    <p className="mb-2 mt-6 font-bold text-blue-800">Requests need to be review: </p>
                    {allReviewRequestsWaiting.map((request: any) => (
                        <RequestComp
                            key={request._id}
                            studentId={request.classStudentId.studentId}
                            name={request.classStudentId.fullName}
                            time={request.createdAt}
                            classStudentId={request.classStudentId._id}
                        />
                    ))}
                </div>
                
                <div className="flex items-center flex-col">
                    <p className="mb-2 mt-6 font-bold text-blue-800">You are already review these requests: </p>
                    {allDoneRequest.map((request: any) => (
                        <RequestComp
                            key={request._id}
                            studentId={request.classStudentId.studentId}
                            name={request.classStudentId.fullName}
                            time={request.createdAt}
                            classStudentId={request.classStudentId._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Requests;
