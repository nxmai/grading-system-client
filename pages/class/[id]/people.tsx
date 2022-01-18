import React, { useEffect, useState, FC, Fragment, ReactElement } from "react";
import classApi from "../../../api/classes";
import classInviteUserApi from "api/classInviteUser";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import { LockOpenIcon, UserAddIcon, DocumentDuplicateIcon, XIcon } from "@heroicons/react/solid";
import InviteUserModal from "components/class/InviteUserModal";
import AuthLayout from "components/layouts/AuthLayout";
import { CopyToClipboard } from 'react-copy-to-clipboard';


interface InformationProps {
    firstName: String;
    lastName: String;
}

type ClassUserRole = {
    role: "teacher" | "student",
}

const PeopleRow: FC<InformationProps> = ({ firstName, lastName }) => {
    return (
        <div className="flex items-center gap-4 p-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#5F6368]"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                />
            </svg>
            <p>{firstName} {lastName}</p>
        </div>
    );
};

const ClassPeople = () => {
    const router = useRouter();
    const { id } = router.query;

    const [classUserRole, setClassUserRole] = useState<ClassUserRole>({
        role: "student",
    });

    const [teacherList, setTeacherList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [inviteUserList, setInviteUserList] = useState([]);
    const [isLinkCreated, setLinkInvite] = useState<string>("");
    const [isOpenInviteUserModal, setOpenInviteUserModal] = useState<boolean>(false);

    useEffect(() => {
        async function getUserRoleByClassID() {
            try {
                const res = await classApi.getUserRoleByClassId(id);
                setClassUserRole({ ...res?.data });
            } catch (error: any) {
                console.log(error.message);
                return router.push("/");
            }
        }

        async function getTeachers() {
            try {
                const res = await classApi.getTeachersInClass(id);
                setTeacherList(res?.data);
            } catch (error: any) {
                console.log(error.message);
            }
        }

        async function getStudents() {
            try {
                const res = await classApi.getStudentsInClass(id);
                setStudentList(res?.data);
            } catch (error: any) {
                console.log(error.message);
            }
        }

        async function getInviteUserLink() {
            try {
                const res = await classInviteUserApi.getInviteUserLinkByClassId(id);
                const linkText = res?.data?.linkText;
                if (linkText) {
                    setLinkInvite(linkText);
                    fetchInviteUser();
                }

            } catch (error: any) {
                console.log(error.message);
            }
        }

        getUserRoleByClassID();
        getTeachers();
        getStudents();
        getInviteUserLink();
    }, [id]);

    async function fetchInviteUser() {
        const res = await classInviteUserApi.getInviteUserByInvieLinkText(id, id);
        setInviteUserList(res?.data?.data);
    }

    async function createLinkInviteUser() {
        try {
            const res = await classInviteUserApi.createInviteUserLink(id);
            setLinkInvite(res?.data?.linkText);
        } catch (err: any) {
            console.log(err);
        }
    }

    function copyLinkInviteUser() {
        alert("Saved to clipboard 👌");
    }

    function inviteUser() {
        setOpenInviteUserModal(true);
    }

    async function deleteInviteUser(inviteUserId: any) {
        try {
            const res = await classInviteUserApi.deleteInviteUser(id, inviteUserId);
            fetchInviteUser();
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <Header attemptHandle={function (): boolean {
                throw new Error("Function not implemented.");
            }} />
            <div className="w-[760px] ml-[calc(50%-380px)] mr-[calc(50%-380px)]">

                <section className="mt-4">
                    <p className="text-3xl text-blue-700 pb-4 pt-4">Teachers</p>
                    <hr className="border-blue-600" />
                    {teacherList?.map((teacher: any, index) => (
                        <div key={index}>
                            <PeopleRow
                                firstName={teacher?.firstName}
                                lastName={teacher?.lastName}
                            />
                            <hr />
                        </div>
                    ))}
                </section>
                <section className="mt-4">
                    <p className="text-3xl text-blue-700 pb-4 pt-4">Students</p>
                    <hr className="border-blue-600" />
                    {studentList?.map((student: any, index) => (
                        <div key={index}>
                            <PeopleRow
                                firstName={student?.firstName}
                                lastName={student?.lastName}
                            />
                            <hr />
                        </div>
                    ))}
                </section>
                {
                    classUserRole.role == "teacher" && (
                        <section className="mt-4">
                            <div className="flex flex-wrap items-center">
                                <p className="text-3xl text-blue-700 pb-2 pt-4">Invite User</p>
                                {!isLinkCreated ? (
                                    <LockOpenIcon onClick={createLinkInviteUser}
                                        className="ml-4 h-6 w-6 text-blue-500 focus:text-blue-800 hover:text-blue-600 cursor-pointer" />
                                ) : (
                                    <>
                                        <InviteUserModal isOpen={isOpenInviteUserModal} setShowModal={setOpenInviteUserModal} classId={id} fetchInviteUser={fetchInviteUser} />
                                        <UserAddIcon
                                            onClick={inviteUser}
                                            className="ml-4 h-6 w-6 text-blue-500 focus:text-blue-800 hover:text-blue-600 cursor-pointer" />
                                    </>
                                )}
                            </div>
                            {
                                isLinkCreated && (
                                    <>
                                        <div className="flex">
                                            <p className="ml-4 items-end">CODE: {isLinkCreated}</p>
                                            <CopyToClipboard text={isLinkCreated}>
                                                <DocumentDuplicateIcon
                                                    onClick={copyLinkInviteUser}
                                                    className="ml-2 h-6 w-6 text-blue-500 focus:text-blue-800 hover:text-blue-600 cursor-pointer" />
                                            </CopyToClipboard>
                                        </div>
                                        <div className="flex">
                                            <p className="ml-4 items-end">
                                                LINK: {classInviteUserApi.inviteLinkPrefix}/{isLinkCreated}
                                            </p>

                                            <CopyToClipboard text={`${classInviteUserApi.inviteLinkPrefix}/${isLinkCreated}`}>
                                                <DocumentDuplicateIcon
                                                    onClick={copyLinkInviteUser}
                                                    className="ml-2 h-6 w-6 text-blue-500 focus:text-blue-800 hover:text-blue-600 cursor-pointer" />
                                            </CopyToClipboard>
                                        </div>
                                    </>
                                )
                            }

                            <hr className="mt-2 border-blue-600" />
                            {inviteUserList?.map((student: any, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-4 p-4 justify-between">
                                        <p>{student.email}
                                            <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {student.role}
                                            </span></p>
                                        <XIcon onClick={() => deleteInviteUser(student._id)}
                                            className="ml-4 h-6 w-6 text-blue-500 focus:text-blue-800 hover:text-red-600 cursor-pointer" />
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </section>
                    )
                }
            </div>
        </Fragment>
    );
};

export default ClassPeople;

ClassPeople.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout >
            {page}
        </AuthLayout>
    );
};
