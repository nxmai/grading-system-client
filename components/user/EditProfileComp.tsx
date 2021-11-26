import React, { Fragment, useEffect, useState } from "react";
import userApi from "api/user";
import Modal from "components/Modal";

type AppProps = {
    isOpen: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    reRender: VoidFunction;
};

export default function EditProfileComp({ isOpen, setShowModal, reRender }: AppProps) {
    const [firstName, setFirstName] = useState<String>("");
    const [lastName, setLastName] = useState<String>("");
    const [photoUrl, setPhotoUrl] = useState<String>("");
    const [isProcess, setProcess] = useState<boolean>(false);

    async function onAction() {
        setProcess(true);
        try {
            await userApi.updateInfo({
                firstName,
                lastName,
                photoUrl,
            });
            setShowModal(false);
            reRender();
        } catch (error: any) {
            console.log(error?.message);
        }
        setProcess(false);
    }

    useEffect(() => {
        async function getUser() {
            setProcess(true);
            try {
                const res = await userApi.getMe();
                setFirstName(res?.data?.firstName);
                setLastName(res?.data?.lastName);
                setPhotoUrl(res?.data?.photoUrl);
            } catch (error: any) {
                console.log(error?.message);
            }
            setProcess(false);
        };
        getUser();
    }, []);

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