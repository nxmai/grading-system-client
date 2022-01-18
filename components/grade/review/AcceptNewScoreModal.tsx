import Modal from "components/Modal";
import React, { useState } from "react";
import { useRouter } from "next/router";
import assignmentReviewApi from "api/assignmentReview";
import userApi from "api/user";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setRenderAction: any;
};

const AcceptNewScoreModal = ({
    isOpen,
    setShowModal,
    setRenderAction,
}: AppProps) => {
    const [isProcess, setProcess] = useState<boolean>(false);
    const [teacherReply, setTeacherReply] = useState({
        scoreFromTeacher: "",
        replyFromTeacher: "",
    });

    const [teacherReplyError, setTeacherReplyError] = useState({
        scoreFromTeacher: "",
        replyFromTeacher: "",
    });

    const router = useRouter();
    const { id, assignmentid, classstudentid } = router.query;

    const validateForm = () => {
        let valid = true;
        const data = { scoreFromTeacher: "", replyFromTeacher: "" };
        if (teacherReply.scoreFromTeacher.length == 0) {
            data.scoreFromTeacher = "* Input grade to submit";
            valid = false;
        }
        if (teacherReply.replyFromTeacher.length == 0) {
            data.replyFromTeacher = "* Input your reply to submit";
            valid = false;
        }
        setTeacherReplyError(data);
        return valid;
    };

    console.log(teacherReplyError);

    const onActionClick = async () => {
        if (!validateForm()) {
            return;
        }
        setProcess(true);

        try {
            const repsonse =
                await assignmentReviewApi.acceptNewScoreRequestFromTeacher(
                    id,
                    assignmentid,
                    classstudentid,
                    teacherReply
                );
            console.log(repsonse.data.data);
            await userApi.responseToStudentGradeReviewNotification({
                classId: id,
                assignmentId: assignmentid,
                classStudentId: classstudentid,
            });
            setProcess(false);
            setShowModal(false);
            setRenderAction();
        } catch (error) {
            console.log(error);
            setProcess(false);
        }
    };

    const onHandleReviewRequestChange = (e: any) => {
        const { name, value } = e.target;
        setTeacherReply({ ...teacherReply, [name]: value });
    };

    const handleOnClose = () => {
        setShowModal(false);
        setTeacherReplyError({ scoreFromTeacher: "", replyFromTeacher: "" });
    };

    return (
        <Modal
            open={isOpen}
            onSubmit={onActionClick}
            onClose={handleOnClose}
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
                            <label>Final grade *</label>
                            <input
                                name="scoreFromTeacher"
                                value={teacherReply.scoreFromTeacher}
                                onChange={(e) => onHandleReviewRequestChange(e)}
                                className={
                                    teacherReplyError.scoreFromTeacher
                                        ? "h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-600"
                                        : "h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                }
                            />
                            <p className="text-xs m-1 text-red-600 italic">
                                {teacherReplyError.scoreFromTeacher}
                            </p>
                        </div>

                        <div className="md:col-span-5">
                            <label>Reply *</label>
                            <textarea
                                name="replyFromTeacher"
                                rows={3}
                                value={teacherReply.replyFromTeacher}
                                onChange={(e) => onHandleReviewRequestChange(e)}
                                className={
                                    teacherReplyError.replyFromTeacher
                                        ? "border mt-1 rounded px-4 w-full bg-gray-50 h-auto border-red-600"
                                        : "border mt-1 rounded px-4 w-full bg-gray-50 h-auto"
                                }
                            />
                            <p className="text-xs m-1 text-red-600 italic">
                                {teacherReplyError.replyFromTeacher}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AcceptNewScoreModal;
