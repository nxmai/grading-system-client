import React from "react";
import type { ReactElement } from 'react';
import AdminLayout from "components/layouts/AdminLayout";
import AuthLayout from "components/layouts/AuthLayout";

import UserTable from "components/admin/UserTable";

export default function AccountManager() {
    return (
        <div className="w-full mb-12 px-4">
          <UserTable />
        </div>
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
