import React, { Fragment, useEffect, useState } from "react";
import Modal from "components/Modal";
import userApi from "api/user";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditPasswordComp({ isOpen, setShowModal }: AppProps) {

    const [oldPw, setOldPw] = useState<String>("");
    const [newPw, setNewPw] = useState<String>("");
    const [newPw2, setNewPw2] = useState<String>("");
    const [inputError, setInputError] = useState<String>("");

    function setNewPw2Change(e: String) {
        setNewPw2(e);
        if (e !== newPw) {
            setInputError("new password not same");
        } else {
            setInputError("");
        }
    }

    function setOldPwChange(e: String) {
        setOldPw(e);
        setInputError("");
    }
    function setNewPwChange(e: String) {
        setNewPw(e);
        setInputError("");
    }

    async function onAction() {
        if (inputError !== "") {
            return;
        }
        try {
            await userApi.updatePW({
                oldPw,
                newPw,
            });
            setShowModal(false);
        } catch (error: any) {
            console.log(error);
            setInputError(error);
        }
    }
    return (
        <Modal open={isOpen} onSubmit={onAction} onClose={() => setShowModal(false)} options={{
            title: "Update password",
            submitText: "Update"
        }}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">
                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label htmlFor="old_pass">Old password</label>
                            <input type="password" name="old_pass" id="old_pass"
                                value={oldPw.toString()}
                                onChange={(e) => setOldPwChange(e.target.value)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="new_pass">New password *</label>
                            <input type="password" name="new_pass" id="new_pass"
                                value={newPw.toString()}
                                onChange={(e) => setNewPwChange(e.target.value)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor="new_pass_2">New password Again *</label>
                            <input type="password" name="new_pass_2" id="new_pass_2"
                                value={newPw2.toString()}
                                onChange={e => setNewPw2Change(e.target.value)}
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