import Button from "components/Button";
import React, { useState } from "react";

type FormCreatorProps = {
    assignment: any;
};

const FormCreator = ({ assignment }: FormCreatorProps) => {
    const [didEdit, setDidEdit] = useState<Boolean>(false);

    return (
        <div className="flex justify-center mt-4 ">
            <div className="text-sm text-left pt-4 pb-4 pl-10 pr-10 border rounded-lg shadow-lg w-[700px] flex flex-col gap-3 bg-white">
                <div className="">
                    <label htmlFor="title">Grade Title *</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className={
                            "h-10 border mt-1 rounded px-4 w-full focus:outline-none " +
                            (!didEdit
                                ? "bg-gray-200 text-gray-400"
                                : "bg-gray-50")
                        }
                        disabled={!didEdit ? true : false}
                        value={assignment.title}
                    />
                </div>
                <div className="">
                    <label htmlFor="grade">Grade *</label>
                    <input
                        type="text"
                        name="grade"
                        id="grade"
                        className={
                            "h-10 border mt-1 rounded px-4 w-full focus:outline-none " +
                            (!didEdit
                                ? "bg-gray-200 text-gray-400"
                                : "bg-gray-50")
                        }
                        value={assignment.grade}
                        disabled={!didEdit ? true : false}
                    />
                </div>
                <div className="flex gap-2 justify-end">
                    {!didEdit ? (
                        <Button
                            type="button"
                            variants="primary"
                            className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={() => setDidEdit(true)}
                        >
                            Edit
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variants="primary"
                            className="!bg-green-500 pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={() => setDidEdit(false)}
                        >
                            Save
                        </Button>
                    )}
                    <Button
                        type="button"
                        variants="error"
                        className="sm:mt-0 sm:w-auto sm:text-sm"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FormCreator;
