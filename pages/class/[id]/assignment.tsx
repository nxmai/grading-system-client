import classAssignmentApi from "api/classAssignment";
import classApi from "api/classes";
import Header from "components/Header";
import AddingForm from "components/structure/AddingForm";
import FormCreator from "components/structure/FormCreator";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
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

        getUserRoleByClassID();
        getClassAssignmentByClassId();
    }, [id]);
    console.log(classUserRole);

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="w-[700px] h-[84px] flex justify-center p-6 flex-col rounded-xl mt-4 mb-2 shadow-md border-t-4 border-blue-500">
                    <p className="font-bold">Grade Composition</p>
                    {classUserRole.role == "teacher" ? (
                        <p>Edit your class grade structure</p>
                    ) : (
                        <p>View your class grade structure</p>
                    )}
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="assignment">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {gradeStructure?.map((item, index) => {
                                return classUserRole.role == "teacher" ? (
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
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ) : (
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
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {classUserRole.role == "teacher" ? (
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
