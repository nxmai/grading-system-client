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

export default function DownLoadScoreAssignment({ isOpen, setShowModal, classId, assignmentId }: AppProps) {
    const [inputError, setInputError] = useState<String>("");
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setProcess(true);
        classScoreApi.downloadTemplateScoreByAssignmentId(classId, assignmentId).then((res) => {
            triggerDownloadScv('download', res);
        }).finally(()=>{setProcess(false); setShowModal(false)})
    }

    return (
        <Modal open={isOpen} onSubmit={onActionClick} onClose={() => setShowModal(false)} options={{
            title: "Download Assignment Score Template Upload",
            submitText: "Download"
        }}
            isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">
            <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            {inputError !== "" ? (
                                <p className="text-red-500 text-xs">
                                    {inputError}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}