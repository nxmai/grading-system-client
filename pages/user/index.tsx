import React, {Fragment, useEffect} from "react";

import { useRouter } from "next/router";

export default function UserIndex() {
    const router = useRouter();
    useEffect(()=>{
        router.push('/user/me');
    });
    return (<Fragment></Fragment>);
}
