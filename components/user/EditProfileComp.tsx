import React, { useEffect, useState } from "react";
import Modal from "components/Modal";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectUser, updateUserInfo } from "features/user/userSlice";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProfileComp({ isOpen, setShowModal }: AppProps) {
    const [firstName, setFirstName] = useState<String>("");
    const [lastName, setLastName] = useState<String>("");
    const [photoUrl, setPhotoUrl] = useState<String>("");
    const [isProcess, setProcess] = useState<boolean>(false);

    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();
    function onAction() {
        dispatch(updateUserInfo({ firstName, lastName, photoUrl }));
        setShowModal(false);
    }

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhotoUrl(user.photoUrl);
    },[user]);

    return (
        <Modal open={isOpen} onSubmit={onAction} onClose={() => setShowModal(false)} options={{
            title: "Edit profle",
            submitText: "Update"
        }}
            isProcess={isProcess}
        >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1 text-left">
                <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-2">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" name="first_name" id="first_name"
                                value={firstName?.toString()}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" name="last_name" id="last_name"
                                value={lastName?.toString()}
                                onChange={(e) => setLastName(e.target.value)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>
                        <div className="md:col-span-5">
                            <label htmlFor="photo">Photo url</label>
                            <input type="text" name="photo" id="photo"
                                value={photoUrl?.toString()}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}