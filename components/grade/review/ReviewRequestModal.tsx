import Modal from "components/Modal";
import React, { useState } from "react";
import { useRouter } from "next/router";
import assignmentReviewApi from "api/assignmentReview";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setReviewData: any;
};

const ReviewRequestModal = ({ isOpen, setShowModal, setReviewData }: AppProps) => {
    const [isProcess, setProcess] = useState<boolean>(false);
    const [reviewRequestData, setReviewRequestData] = useState({
        scoreExpectation: "",
        explanation: "",
    });
    const [isAddError, setIsAddError] = useState<Boolean>(false);

    const router = useRouter();
    const { id, assignmentid } = router.query;

    const onActionClick = async () => {
        setProcess(true);
        const data = {
            classAssignment: assignmentid,
            scoreExpectation: parseInt(reviewRequestData.scoreExpectation),
            explanation: reviewRequestData.explanation,
        };

        try {
            const repsonse = await assignmentReviewApi.createAssignmentReview(
                id,
                data
            );
            console.log(repsonse.data.data);
            setReviewData(repsonse.data.data);
            setProcess(false);
            setShowModal(false);
        } catch (error) {
            console.log(error);
            setProcess(false);
            setIsAddError(true);
        }
        setReviewRequestData({
            scoreExpectation: "",
            explanation: "",
        });
    };

    const onHandleReviewRequestChange = (e: any) => {
        const { name, value } = e.target;
        setReviewRequestData({ ...reviewRequestData, [name]: value });
    };

    return (
        <Modal
            open={isOpen}
            onSubmit={onActionClick}
            onClose={() => setShowModal(false)}
            options={{
                title: "Add complain for your grade",
                submitText: "Add",
            }}
            isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">
                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label>Grade expectation *</label>
                            <input
                                name="scoreExpectation"
                                value={reviewRequestData.scoreExpectation}
                                onChange={(e) => onHandleReviewRequestChange(e)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-5">
                            <label>Explanation *</label>
                            <textarea
                                name="explanation"
                                rows={3}
                                value={reviewRequestData.explanation}
                                onChange={(e) => onHandleReviewRequestChange(e)}
                                className="border mt-1 rounded px-4 w-full bg-gray-50 h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isAddError ? <p className="italic text-base text-red-600 mt-1">*You already submit complaint</p> : ""}
        </Modal>
    );
};

export default ReviewRequestModal;
