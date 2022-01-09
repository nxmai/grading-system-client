import React from "react";
import { useRouter } from "next/router";

type AppProps = {
    studentId: String;
    name: String;
    time: String;
    classStudentId: String;
};

const RequestComp = ({ studentId, name, time, classStudentId }: AppProps) => {
    const router = useRouter();
    const { id, assignmentid } = router.query;

    return (
        <div
            className="text-sm text-left pt-4 pb-4 pl-10 pr-10 mb-4 border rounded-lg shadow-lg w-[700px] flex justify-between bg-white cursor-pointer"
            onClick={() =>
                router.push(`/class/${id}/assignment/${assignmentid}/request/${classStudentId}`)
            }
        >
            <div className="flex flex-col gap-3">
                <p>{name}</p>
                <p>{studentId}</p>
            </div>
            <div>
                <p>
                    <span className="font-bold">Time sent: </span>
                    {time}
                </p>
            </div>
        </div>
    );
};

export default RequestComp;
