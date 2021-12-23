import React, { useEffect } from "react";
import { useRouter } from "next/router";

import classScoreApi from "api/classScore";
import { triggerDownloadScv } from "libs/downloadCsv";

export default function DownloadScore() {
    const router = useRouter();
    const { id } = router.query;
    
    function onClickDownloadScore() {
        classScoreApi.downloadFullTable(id).then((res) => {
            triggerDownloadScv("download", res);
        });
    }
    useEffect(()=>{
        onClickDownloadScore();
    }, []);
    
    router.replace(`/class/${id}/grade`);
    return (<></>);
}
