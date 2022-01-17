import Modal from "components/Modal";
import React, { useState } from "react";
import { useRouter } from "next/router";
import assignmentReviewApi from "api/assignmentReview";
import classApi from "api/classes";
import userApi from "api/user";
import classAssignmentApi from "api/classAssignment";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setRenderAction: any;
};

const AcceptNewScoreModal = ({ isOpen, setShowModal, setRenderAction }: AppProps) => {
    const [isProcess, setProcess] = useState<boolean>(false);
    const [teacherReply, setTeacherReply] = useState({
        scoreFromTeacher: "",
        replyFromTeacher: "",
    });

    const router = useRouter();
    const { id, assignmentid, classstudentid } = router.query;

    const onActionClick = async () => {
        setProcess(true);
        
        try {
            const repsonse = await assignmentReviewApi.acceptNewScoreRequestFromTeacher(
                id,
                assignmentid,
                classstudentid,
                teacherReply
            );
            console.log(repsonse.data.data);
            await userApi.responseToStudentGradeReviewNotification({ classId: id, assignmentId: assignmentid, classStudentId: classstudentid });
            setProcess(false);
            setShowModal(false);
            setRenderAction();
        } catch (error) {
            console.log(error);
            setProcess(false);
        }
        // setReviewRequestData({
        //     scoreExpectation: "",
        //     explanation: "",
        // });
    };

    const onHandleReviewRequestChange = (e: any) => {
        const { name, value } = e.target;
        setTeacherReply({ ...teacherReply, [name]: value });
    };

    return (
        <Modal
            open={isOpen}
            onSubmit={onActionClick}
            onClose={() => setShowModal(false)}
            options={{
                title: "Add other score and reply request for student",
                submitText: "Add",
            }}
            isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">
                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label>Final grade</label>
                            <input
                                name="scoreFromTeacher"
                                value={teacherReply.scoreFromTeacher}
                                onChange={(e) => onHandleReviewRequestChange(e)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-5">
                            <label>Reply *</label>
                            <textarea
                                name="replyFromTeacher"
                                rows={3}
                                value={teacherReply.replyFromTeacher}
                                onChange={(e) => onHandleReviewRequestChange(e)}
                                className="border mt-1 rounded px-4 w-full bg-gray-50 h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AcceptNewScoreModal;
