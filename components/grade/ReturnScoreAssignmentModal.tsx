import React, { useState } from "react";
import Modal from "components/Modal";
import classScoreApi from "api/classScore";
import userApi from "api/user";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    classId: any;
    assignmentId: any;
};

export default function ReturnScoreAssignmentModal({ isOpen, setShowModal, classId, assignmentId }: AppProps) {
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setProcess(true);

        classScoreApi.markReturnedByAssignmentId(classId, assignmentId)
            .then(_ => {
                userApi.returnScoreNotification({ classId, assignmentId });
                setShowModal(false);
            }).catch((error: any) => {
                console.log(error);
            }).finally(() => {
                setProcess(false);
            });
    }

    return (
        <Modal open={isOpen} onSubmit={onActionClick} onClose={() => setShowModal(false)} options={{
            title: "Return all Score",
            submitText: "Update"
        }}
            isProcess={isProcess}
        >
        </Modal>
    );
}