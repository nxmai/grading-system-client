import Header from "components/Header";
import AddingForm from "components/structure/AddingForm";
import FormCreator from "components/structure/FormCreator";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const data = [
    { title: "one", grade: 10, id: "one" },
    { title: "two", grade: 10, id: "two" },
];

const GradeStructure = () => {
    const [gradeStructure, setGradeStructure] = useState<
        Array<{ title: string; grade: Number; id: string }>
    >([]);

    const handleAddAssignment = (item: any) => {
        setGradeStructure([...gradeStructure, item]);
    };
    console.log(gradeStructure);

    const onDragEnd = (result: any) => {
        const item = Array.from(gradeStructure);
        const [reorderedItem] = item.splice(result.source.index, 1);
        item.splice(result.destination.index, 0, reorderedItem);

        setGradeStructure(item);
    };

    return (
        <div>
            <Header createClass={() => {}} />
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
                            {gradeStructure.map((item, index) => {
                                return (
                                    <Draggable
                                        draggableId={item.id}
                                        index={index}
                                        key={item.id}
                                    >
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                <FormCreator
                                                    assignment={item}
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
            <AddingForm addAssignment={handleAddAssignment} />
        </div>
    );
};

export default GradeStructure;
