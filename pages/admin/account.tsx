import React from "react";
import type { ReactElement } from 'react';
import AdminLayout from "components/layouts/AdminLayout";
import AuthLayout from "components/layouts/AuthLayout";

export default function AccountManager() {
    return (
        <div>Account User/ Admin</div>
    );
}

AccountManager.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout >
            <AdminLayout>
                {page}
            </AdminLayout>
        </AuthLayout>
    );
};
