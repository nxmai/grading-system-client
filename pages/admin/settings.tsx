import React, { ReactElement } from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import AuthLayout from "components/layouts/AuthLayout";
import AdminLayout from "components/layouts/AdminLayout";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
      <AuthLayout >
          <AdminLayout>
              {page}
          </AdminLayout>
      </AuthLayout>
  );
};
