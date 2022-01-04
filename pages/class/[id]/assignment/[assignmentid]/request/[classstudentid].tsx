import Button from "components/Button";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classAssignmentApi from "api/classAssignment";
import assignmentReviewApi from "api/assignmentReview";

function ReviewRequest() {
    const [assignmentInfo, setAssignmentInfo] = useState<any>({ title: "" });
    const [reviewRequestData, setReviewRequestData] = useState<any>({});

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
                    await assignmentReviewApi.getOneAssignmentReviewRequestForTeacher(
                        id,
                        assignmentid,
                        classstudentid
                    );
                setReviewRequestData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getReviewRequestDetail();
        getSingleAssignment();
    }, [id]);

    console.log(reviewRequestData);

    return (
        <div>
            <Header />
            <div className="ml-[calc(50%-450px)] mr-[calc(50%-450px)] mt-6 ">
                <p className="text-3xl text-blue-700 mb-2">
                    {assignmentInfo?.title}
                </p>

                <p className="mb-4">Grade scale: {assignmentInfo.grade}</p>

                <div className="w-full h-[1px] bg-blue-700"></div>

                <div className="flex justify-between items-center mt-4">
                    <p>Old grade: </p>
                </div>

                <div className="mt-2">
                    <p className="mb-2">Review request from student: {reviewRequestData.classStudentId.fullName}</p>
                    <p className="mb-4">Student ID: {reviewRequestData.classStudentId.studentId}</p>
                    <label className="text-sm font-bold text-blue-800">
                        Grade expectation
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="h-10 border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50"
                        disabled
                        value={reviewRequestData.scoreExpectation}
                    />

                    <label className="text-sm font-bold text-blue-800 mt-2">
                        Explanation
                    </label>
                    <textarea
                        name="grade"
                        id="grade"
                        className="border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50 h-auto"
                        value={reviewRequestData.explanation}
                        disabled
                        rows={4}
                    />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        type="button"
                        variants="primary"
                        className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                        Accept Score
                    </Button>
                    <Button
                        type="button"
                        variants="error"
                        className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                        Ignore Score
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ReviewRequest;
