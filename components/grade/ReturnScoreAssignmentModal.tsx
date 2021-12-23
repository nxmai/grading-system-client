import React, { useEffect, useState } from "react";
import Modal from "components/Modal";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReturnScoreAssignmentModal({ isOpen, setShowModal }: AppProps) {
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setProcess(true);
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