import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectUser, updateStudentCardID } from "features/user/userSlice";
import React, { useState } from "react";
import Modal from "components/Modal";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddStudentCardNumberComp({
    isOpen,
    setShowModal,
}: AppProps) {
    const [studentCardId, setStudentCardId] = useState<String>("");
    const [inputError, setInputError] = useState("");
    const userInfo = useAppSelector(selectUser);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setStudentCardId(value);
        value === ""
            ? setInputError("*Please type your student card")
            : setInputError("");
    };

    const dispatch = useAppDispatch();
    const handleUpdateCardNumber = () => {
        if(!userInfo.studentCardID && !userInfo.studentCardIDScraft) {
            if (studentCardId === "") {
                setInputError("*Please type your student card");
                return;
            }
            try {
                dispatch(updateStudentCardID(studentCardId));
                setInputError("");
                setShowModal(false);
                setStudentCardId("");
            } catch (error) {
                console.log(error);
                setInputError("*Your student card id existed");
            }
        } else {
            setInputError("*Your card ID was unmap");
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setInputError("");
    };

    return (
        <Modal open={isOpen} onSubmit={handleUpdateCardNumber} onClose={handleCancel} options={{
            title: "Add Student Card Number",
            submitText: "Update"
        }}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">

                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5 pb-4 ">
                            <label htmlFor="card_number">
                                Student Card Number
                            </label>
                            <input
                                type="text"
                                name="card_number"
                                id="card_number"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                onChange={handleInputChange}
                            />
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
