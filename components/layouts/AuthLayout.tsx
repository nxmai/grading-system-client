import React, { useEffect, useState } from "react";
import type { ReactElement } from 'react';

import type { UserModel } from "features/user/userSlice";
import { useAppDispatch } from "app/hooks";
import { setInit } from "features/user/userSlice";
import { useRouter } from "next/router";
import userApi from "api/user";
import Waiting from "components/user/Waiting";

type LayoutProps = {
    children: ReactElement
}

export default function AuthLayout({ children }: LayoutProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push('/auth/login');
        }
        const initUser = async function() {
            try {
                const response = await userApi.getMe();
                console.log("]Get Me> ", response.data);
                const reps = response.data;
                const userPayload : UserModel = {
                    _id: reps._id,
                    firstName: reps.firstName,
                    lastName: reps.lastName,
                    studentCardID: reps.studentCardID,
                    studentCardIDScraft: reps.studentCardIDScraft,
                    photoUrl: reps.photoUrl,
                    active: reps.active,
                    email: reps.email,
                    role: reps.role,
                    black_type: reps.black_type,
                };
                dispatch(setInit(userPayload));
                setIsLoading(false);
                return children;
            } catch(err: any) {
                setErrorMessage(err);
                setIsLoading(false);
            }
        };
        initUser();
    }, []);
    if (isLoading) {
        return <div>Loading</div>;
    } else if (errorMessage) {
       return <Waiting title="Sorry" subTitle={errorMessage} onSubmit={() => router.push('/auth/login')} action="Back to log in" />;
    } else {
        return children;
    }
}
