import React, { useState } from "react";
import Modal from "components/Modal";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    classInfo: any;
};

export default function ClassDetailModal({
    isOpen,
    setShowModal,
    classInfo,
}: AppProps) {
    const [file, setFile] = useState<File>();
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setShowModal(false);
    }

    function handleSetFile(data: any) {
        if (data && typeof data === "object") {
            setFile(data.files[0]);
        }
    }

    return (
        <Modal
            open={isOpen}
            onSubmit={onActionClick}
            onClose={() => setShowModal(false)}
            options={{
                title: "Detail Class information",
                submitText: "Done",
            }}
            isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left mt-4">
                <div className=""> <span className="font-bold">Name: </span> {classInfo.name}</div>
                <div className=""> <span className="font-bold">Subject: </span> {classInfo.subject}</div>
                <div className=""> <span className="font-bold">Description: </span> {classInfo.description}</div>
            </div>
        </Modal>
    );
}
