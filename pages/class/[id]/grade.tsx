import classGradeApi from "api/classGrade";
import Header from "components/Header";
import AddingForm from "components/structure/AddingForm";
import FormCreator from "components/structure/FormCreator";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GradeStructure = () => {
    const router = useRouter();
    const { id } = router.query;

    const [gradeStructure, setGradeStructure] = useState<
        Array<{ title: string; grade: Number; _id: string }>
    >([]);

    async function getClassGradeByClassId() {
        try {
            if (id == undefined) return;
            const res = await classGradeApi.getClassGradesByClassId(id);
            setGradeStructure(res?.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const fetchClassGrade = () => {
        getClassGradeByClassId();
    };

    const onDragEnd = async (result: any) => {
        try {
            if (id == undefined) return;
            const res = await classGradeApi.orderClassGrade(id, result.source.index, result.destination.index);
        } catch (error: any) {
            console.log(error.message);
        }

        await getClassGradeByClassId();
    };

    useEffect(()=>{
        getClassGradeByClassId();
    },[id]);

    return (
        <div>
            <Header />
            <div className="flex justify-center">
                <div className="w-[700px] h-[84px] flex justify-center p-6 flex-col rounded-xl mt-4 mb-2 shadow-md border-t-4 border-blue-500">
                    <p className="font-bold">Grade Structure</p>
                    <p>Edit your classroom grade structure</p>
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
                                return (
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
                                                    fetchClassGrade={fetchClassGrade}
                                                    classId={id}
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
            <AddingForm fetchClassGrade={fetchClassGrade} classId={id}/>
        </div>
    );
};

export default GradeStructure;
