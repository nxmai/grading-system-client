import React, { Fragment, useEffect, useState } from "react";
import Modal from "components/Modal";
import classApi from "../../api/classes";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    classId: any;
};

export default function InviteUserModal({ isOpen, setShowModal, classId }: AppProps) {
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("student");
    const [inputError, setInputError] = useState<String>("");
    const [isProcess, setProcess] = useState<boolean>(false);

    function onActionClick() {
        setProcess(true);
        classApi.inviteUserWithInviteLink(classId, {
            email,
            role,
        }).then(_ => {
            setShowModal(false);
        }).catch((error: any)=>{
            console.log(error);
            setInputError(error);
        }).finally(()=>{
            setProcess(false);
        });
    }
    return (
        <Modal open={isOpen} onSubmit={onActionClick} onClose={() => setShowModal(false)} options={{
            title: "Invite User",
            submitText: "Send"
        }}
        isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">

                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="role">Role</label>
                            <select name="role" id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
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
