import React, { ReactElement } from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import AuthLayout from "components/layouts/AuthLayout";
import AdminLayout from "components/layouts/AdminLayout";
import ClassTable from "components/admin/ClassTable";

export default function ClassesManager() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
          <ClassTable />
        {/* <div className="w-full mb-12 px-4">
          <CardTable />
        </div> */}
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

ClassesManager.getLayout = function getLayout(page: ReactElement) {
  return (
      <AuthLayout >
          <AdminLayout>
              {page}
          </AdminLayout>
      </AuthLayout>
  );
};
