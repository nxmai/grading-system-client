import React, { useEffect, useState } from "react";
import Modal from "components/Modal";
import classScoreApi from "api/classScore";
import { triggerDownloadScv } from "libs/downloadCsv";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    classId: any; 
    assignmentId: any;
};

export default function DownloadScoreAssignmentModal({ isOpen, setShowModal, classId, assignmentId }: AppProps) {
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setProcess(true);
        classScoreApi.downloadScoreTemplateByAssignmentId(classId, assignmentId).then((res) => {
            triggerDownloadScv('download', res);
        }).finally(()=>{setProcess(false); setShowModal(false);});
    }

    return (
        <Modal open={isOpen} onSubmit={onActionClick} onClose={() => setShowModal(false)} options={{
            title: "Download Assignment Score Template Upload",
            submitText: "Download"
        }}
            isProcess={isProcess}
        >
        </Modal>
    );
}