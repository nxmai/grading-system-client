import assignmentReviewApi from "api/assignmentReview";
import classAssignmentApi from "api/classAssignment";
import classScoreApi from "api/classScore";
import Button from "components/Button";
import ReviewRequest from "components/grade/review/ReviewRequestModal";
import Header from "components/Header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleAssignment = () => {
    const [openReviewRequest, setOpenReviewRequest] = useState<boolean>(false);
    const [assignmentInfo, setAssignmentInfo] = useState<any>({ title: "" });
    const [assignmentScore, setAssignmentScore] = useState<any>({});
    const [reviewRequestData, setReviewRequestData] = useState<any>({});

    const router = useRouter();
    const { id, assignmentid } = router.query;

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
        const getAssignmentScore = async () => {
            try {
                const response =
                    await classScoreApi.getOneAssignmentScoreOfOneStudent(
                        id,
                        assignmentid
                    );
                setAssignmentScore(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAssignmentScore();
        getSingleAssignment();
    }, [id]);

    useEffect(() => {
        const getReviewRequest = async () => {
            try {
                const response =
                    await assignmentReviewApi.getOneAssignmentReview(
                        id,
                        assignmentid
                    );
                setReviewRequestData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getReviewRequest();
    }, [id]);

    return (
        <div>
            <Header />
            <ReviewRequest
                isOpen={openReviewRequest}
                setShowModal={setOpenReviewRequest}
                setReviewData={setReviewRequestData}
            />
            <div className="ml-[calc(50%-450px)] mr-[calc(50%-450px)] mt-6 ">
                <p className="text-3xl text-blue-700 mb-2">
                    {assignmentInfo?.title}
                </p>

                <p className="mb-4">Grade scale: {assignmentInfo.grade}</p>

                <div className="w-full h-[1px] bg-blue-700"></div>

                <div className="flex justify-between items-center mt-4">
                    <p className="">You get: {assignmentScore.score}/10</p>
                    <Button
                        type="button"
                        variants="primary"
                        className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setOpenReviewRequest(true)}
                    >
                        Complain
                    </Button>
                </div>

                {reviewRequestData ? (
                    <div className="mt-6">
                        <p className="mb-2">Review request for your teacher:</p>
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
                ) : (
                    ""
                )}

                <div className="flex justify-end gap-2 mt-4">
                    <Button 
                        type="button"
                        variants="primary"
                        className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm">
                            Accept Score
                    </Button>
                    <Button 
                        type="button"
                        variants="error"
                        className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm">
                            Ignore Score
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SingleAssignment;
