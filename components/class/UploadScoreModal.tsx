import React, { Fragment, useEffect, useState } from "react";
import Modal from "components/Modal";
import classScoreApi from "api/classScore";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    classId: any;
    gradeId: any
};

export default function UploadScoreModal({ isOpen, setShowModal, classId, gradeId }: AppProps) {
    const [file, setFile] = useState<File>();
    const [inputError, setInputError] = useState<String>("");
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setProcess(true);
        
        const dataForm = new FormData();
        if (file && typeof file === 'object' && file instanceof File) {
            dataForm.append('file', file);
        } else {
            setInputError("No file found");
            setProcess(false);
            return;
        }
        
        classScoreApi.uploadScoreByGradeId(classId, gradeId, dataForm)
        .then(_ => {
            setShowModal(false);
        }).catch((error: any)=>{
            console.log(error);
            setInputError(error);
        }).finally(()=>{
            setProcess(false);
        });
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
                        <div className="md:col-span-5">
                            <label htmlFor="file">File</label>
                            <input type="file" name="file" id="file"
                                onChange={(e) => handleSetFile(e.target)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>
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
