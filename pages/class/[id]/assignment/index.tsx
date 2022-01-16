import classAssignmentApi from "api/classAssignment";
import classApi from "api/classes";
import Button from "components/Button";
import Header from "components/Header";
import AuthLayout from "components/layouts/AuthLayout";
import AddingForm from "components/structure/AddingForm";
import FormCreator from "components/structure/FormCreator";
import { useRouter } from "next/router";
import React, { useState, useEffect, ReactElement } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type ClassUserRole = {
    role: "teacher" | "student";
};

const GradeStructure = () => {
    const router = useRouter();
    const { id } = router.query;

    const [gradeStructure, setGradeStructure] = useState<
        Array<{ title: string; grade: Number; _id: string }>
    >([]);

    const [classUserRole, setClassUserRole] = useState<ClassUserRole>({
        role: "student",
    });
    const [isTeacherEdit, setIsTeacherEdit] = useState(false);
    const [studentClassId, setStudentClassId] = useState("");

    async function getClassAssignmentByClassId() {
        try {
            if (id == undefined) return;
            const res = await classAssignmentApi.getClassAssignmentsByClassId(
                id
            );
            setGradeStructure(res?.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const fetchClassAssignment = () => {
        getClassAssignmentByClassId();
    };

    const onDragEnd = async (result: any) => {
        try {
            if (id == undefined) return;
            const res = await classAssignmentApi.orderClassAssignment(
                id,
                result.source.index,
                result.destination.index
            );
        } catch (error: any) {
            console.log(error.message);
        }

        await getClassAssignmentByClassId();
    };

    const turnEditFeatureForTeacherRole = () => {
        setIsTeacherEdit(!isTeacherEdit);
    };

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
        const getStudentClassId = async () => {
            try {
                const response = await classApi.getStudentClassId(id);
                setStudentClassId(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        getStudentClassId();

        getUserRoleByClassID();
        getClassAssignmentByClassId();
    }, [id]);

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="w-[700px] h-[84px] flex justify-center p-6 flex-col rounded-xl mt-4 mb-2 shadow-md border-t-4 border-blue-500">
                    <p className="font-bold">Grade Composition</p>
                    {classUserRole.role == "teacher" ? (
                        isTeacherEdit ? (
                            <p>Edit your class grade structure</p>
                        ) : (
                            <p>View review request from your student</p>
                        )
                    ) : (
                        <p>View your grade by click to an assignment</p>
                    )}
                </div>
            </div>
            {classUserRole.role == "teacher" ? (
                <div className="flex justify-center mt-4">
                    <div className="w-[700px] flex justify-end">
                        <Button
                            type="button"
                            variants="primary"
                            className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm "
                            onClick={turnEditFeatureForTeacherRole}
                        >
                            {isTeacherEdit ? "Close Edit" : "Edit Structure"}
                        </Button>
                    </div>
                </div>
            ) : (
                ""
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="assignment">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex flex-col items-center"
                        >
                            {gradeStructure?.map((item, index) => {
                                return classUserRole.role == "teacher" &&
                                    isTeacherEdit ? (
                                    <Draggable
                                        draggableId={item._id}
                                        index={index}
                                        key={item._id}
                                    >
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <FormCreator
                                                    assignmentT={item}
                                                    fetchClassAssignment={
                                                        fetchClassAssignment
                                                    }
                                                    classId={id}
                                                    userRole={
                                                        classUserRole.role
                                                    }
                                                    isTeacherEdit={
                                                        isTeacherEdit
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ) : (
                                    <div
                                        className="cursor-pointer w-[700px]"
                                        onClick={
                                            classUserRole.role == "teacher"
                                                ? () =>
                                                      router.push(
                                                          `/class/${id}/assignment/${item._id}/request`
                                                      )
                                                : studentClassId != ""
                                                ? () =>
                                                      router.push(
                                                          `/class/${id}/assignment/${item._id}/request/${studentClassId}`
                                                      )
                                                : () => router.push(`/user/me`)
                                        }
                                    >
                                        <Draggable
                                            draggableId={item._id}
                                            index={index}
                                            key={item._id}
                                            isDragDisabled
                                        >
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <FormCreator
                                                        assignmentT={item}
                                                        fetchClassAssignment={
                                                            fetchClassAssignment
                                                        }
                                                        classId={id}
                                                        userRole={
                                                            classUserRole.role
                                                        }
                                                        isTeacherEdit={
                                                            isTeacherEdit
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {classUserRole.role == "teacher" && isTeacherEdit ? (
                <AddingForm
                    fetchClassAssignment={fetchClassAssignment}
                    classId={id}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default GradeStructure;

GradeStructure.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};
