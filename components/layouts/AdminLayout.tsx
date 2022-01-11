import React, { useEffect } from "react";
import type { ReactElement } from 'react';
import Error from 'next/error';

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

import { useAppSelector } from "app/hooks";
import { selectUser } from "features/user/userSlice";

type LayoutProps = {
    children: ReactElement
}

export default function AdminLayout({ children }: LayoutProps) {
    const user = useAppSelector(selectUser);
    if (user.role != "admin"){
        return <Error statusCode={404} />;
    } else {
        return (
            <>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
                    <AdminNavbar />
                    {/* Header */}
                    <HeaderStats />
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                        {children}
                        <FooterAdmin />
                    </div>
                </div>
            </>
        );
    }
}
