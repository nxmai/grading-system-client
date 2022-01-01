import Button from "components/Button";
import ReviewRequest from "components/grade/review/ReviewRequest";
import Header from "components/Header";
import React, { useState } from "react";

const SingleAssignment = () => {
    const [openReviewRequest, setOpenReviewRequest] = useState<boolean>(false);


    return (
        <div>
            <Header />
            <ReviewRequest isOpen={openReviewRequest} setShowModal={setOpenReviewRequest}/>
            <div className="ml-[calc(50%-450px)] mr-[calc(50%-450px)] mt-6 ">
                <div className="flex justify-between items-end">
                    <p className="text-3xl text-blue-700 mb-2">
                        Assignment Name
                    </p>
                    <p className="text-gray-600 mb-2">Teacher name</p>
                </div>

                <p className="mb-4">100 points</p>

                <div className="w-full h-[1px] bg-blue-700"></div>
                <p className="mt-4 text-lg text-gray-600">
                    Student name: first name
                </p>
                <div className="flex justify-between items-center">
                    <p className="">You get: 90/100</p>
                    <Button
                        type="button"
                        variants="primary"
                        className="pl-6 pr-6 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setOpenReviewRequest(true)}
                        
                    >
                        Complain
                    </Button>
                </div>
                <div className="mt-6">
                    
                </div>
            </div>
        </div>
    );
};

export default SingleAssignment;
