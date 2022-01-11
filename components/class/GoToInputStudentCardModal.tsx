import React, { Fragment, useEffect, useState } from "react";
import Modal from "components/Modal";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GoToInputStudentCardModal({ isOpen, setShowModal }: AppProps) {
    const [file, setFile] = useState<File>();
    const [inputError, setInputError] = useState<String>("");
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setProcess(true);
        
    }

    function handleSetFile( data: any) {
        if (data && typeof data === 'object') {
            setFile(data.files[0]);
        }
    }

    return (
        <Modal open={isOpen} onSubmit={onActionClick} onClose={() => setShowModal(false)} options={{
            title: "Upload grade Student",
            submitText: "Submit"
        }}
        isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">

                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        
                    </div>
                </div>
            </div>
        </Modal>
    );
}
