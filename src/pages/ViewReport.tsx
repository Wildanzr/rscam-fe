import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import type { ReportProps } from "../@types";
import React, { useState, useEffect, useCallback } from "react";
import { AppLayout } from "../layouts";

import { NotFound } from ".";
import { PDF } from "../components/document";
import { Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST as string;

const ViewReport: React.FC = () => {
  // Local states
  const [reportData, setReportData] = useState<ReportProps | undefined | null>(
    undefined
  );

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

  // fetch report data
  const fetchReportData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_HOST}/checkup/${checkupId}`);
      console.log(data);
      setReportData(data);
    } catch (error) {
      console.log(error);
      setReportData(null);
    }
  }, [checkupId]);

  // First render and when checkupId changes
  useEffect(() => {
    fetchReportData();
  }, [fetchReportData, checkupId]);
  return (
    <AppLayout title={`Laporan ${checkupId}`} breadcrumb={breadcrumbItems}>
      <div className="flex w-full h-full items-start justify-center">
        {reportData === undefined ? (
          <Spin size="default" tip="Loading..." />
        ) : reportData === null ? (
          <NotFound />
        ) : (
          <PDF {...reportData} />
        )}
      </div>
    </AppLayout>
  );
};

export default ViewReport;
