import classGradeApi from "api/classGrade";
import Button from "components/Button";
import React, { useState } from "react";

type FormAddingProps = {
    fetchClassGrade: VoidFunction;
    classId: any;
};

const AddingForm = ({ fetchClassGrade, classId }: FormAddingProps) => {
    const [assignment, setAssignment] = useState({ title: "", grade: ""});
    const handleChangeInput = (e: any) => {
        const { name, value } = e.target;
        if(name == "title"){
            setAssignment({ ...assignment, [name]: value});
            return;
        }
        setAssignment({ ...assignment, [name]: value });
    };

    async function createClassGrade() {
        try {
            const grade = await classGradeApi.createClassGrade(classId, assignment);
            return grade;
        } catch(err: any) {
            console.log(err.message);
        }
    }

    const handleAddAssignment = async () => {
        await createClassGrade();
        fetchClassGrade();
        setAssignment({ title: "", grade: ""});
    };

    return (
        <div className="flex justify-center mt-8 mb-20">
            <div className="text-sm text-left pt-4 pb-4 pl-10 pr-10 border rounded-lg shadow-lg w-[700px] flex flex-col gap-3">
                <div className="">
                    <label htmlFor="title">Grade Title *</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="h-10 border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50 "
                        value={assignment.title}
                        onChange={handleChangeInput}
                        placeholder="Assignment Title"
                    />
                </div>
                <div className="">
                    <label htmlFor="grade">Grade *</label>
                    <input
                        type="number"
                        name="grade"
                        id="grade"
                        className="h-10 border mt-1 rounded px-4 w-full focus:outline-none bg-gray-50"
                        value={assignment.grade}
                        onChange={handleChangeInput}
                        placeholder="Assignment Grade"
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    <Button
                        type="button"
                        variants="primary"
                        className="sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={handleAddAssignment}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddingForm;
