import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React from "react";
import { AppLayout } from "../layouts";

import { useNavigate, useLocation } from "react-router-dom";

const ViewReport: React.FC = () => {
  // React Router Navigate
  const navigate = useNavigate();

  // Path location using route
  const location = useLocation();
  const checkupId = location.pathname.split("/")[2];

  // Breadcrumb items
  const breadcrumbItems: ItemType[] = [
    {
      title: "Dashboard",
      onClick: () => navigate("/"),
      className: "cursor-pointer",
    },
    {
      title: "Lihat Laporan",
    },
  ];
  return (
    <AppLayout title={`Laporan ${checkupId}`} breadcrumb={breadcrumbItems}>
      <h1>View Report</h1>
    </AppLayout>
  );
};

export default ViewReport;
