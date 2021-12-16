import React, { useEffect, useState, FC, Fragment } from "react";
import Header from "components/Header";
import Button from "components/Button";
import classScoreApi from "api/classScore";
import { useRouter } from "next/router";
import UploadScoreModal from "components/class/UploadScoreModal";

export default function ClassScore() {
    const router = useRouter();
    const { id } = router.query;

    const [isOpenUploadScoreModal, setOpenUploadScoreModal] = useState<boolean>(false);

    // for test
    function onClickDowndloadTemplate() {
        classScoreApi.downloadTemplateListStudentId(id).then((res) => {
            console.log(res);
            alert(res.data.data);
        });
    }

    // for test
    function onClickDowndloadTemplateScore() {
        classScoreApi.downloadTemplateScoreByGradeId(id, id).then((res) => {
            console.log(res);
            alert(res.data.data);
        });
    }

    return (
        <Fragment>
            <Header />
            <UploadScoreModal isOpen={isOpenUploadScoreModal} setShowModal={setOpenUploadScoreModal} classId={id} gradeId={id} />
            <div className="w-[760px] ml-[calc(50%-380px)] mr-[calc(50%-380px)]">
                <div className="flex">
                    <div className="justify-end">
                        {/* this using for test */}
                        <Button onClick={onClickDowndloadTemplate}>
                            Download Template
                        </Button>
                        <Button onClick={onClickDowndloadTemplateScore}>
                            Download Template Score
                        </Button>
                        <Button onClick={()=> setOpenUploadScoreModal(!isOpenUploadScoreModal)}>
                            Upload Score
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
