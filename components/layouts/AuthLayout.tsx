import React, { useEffect, useState } from "react";
import type { ReactElement } from 'react';

import type { UserModel } from "features/user/userSlice";
import { useAppDispatch } from "app/hooks";
import { setInit } from "features/user/userSlice";
import { useRouter } from "next/router";
import userApi from "api/user";

type LayoutProps = {
    children: ReactElement
}

export default function AuthLayout({ children }: LayoutProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
                    photoUrl: reps.photoUrl,
                    active: reps.active,
                    email: reps.email,
                    role: reps.role
                };
                dispatch(setInit(userPayload));
                setIsLoading(false);
                return children;
            } catch(err) {
                router.push('/auth/login');
            }
        };
        initUser();
    }, []);
    if (isLoading) {
        return <div>Loading</div>;
    } else {
        return children;
    }
}
