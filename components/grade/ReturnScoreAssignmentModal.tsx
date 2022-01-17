import React, { useState } from "react";
import Modal from "components/Modal";
import classScoreApi from "api/classScore";
import userApi from "api/user";
import { useAppDispatch } from "app/hooks";
import { updateGrade } from "features/class/classSlice";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    classId: any;
    assignmentId: any;
};

export default function ReturnScoreAssignmentModal({ isOpen, setShowModal, classId, assignmentId }: AppProps) {
    const [isProcess, setProcess] = useState<boolean>(false);
    const dispatch = useAppDispatch();

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
                dispatch(updateGrade());
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