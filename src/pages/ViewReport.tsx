import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import type { ReportProps } from "../@types";
import React, { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "../contexts/Global";
import { AppLayout } from "../layouts";

import { NotFound } from ".";
import { PDF } from "../components/document";
import { Spin, QRCode } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST as string;

interface IGlobalContext {
  qrCode: string | undefined | null;
  setQRCode: React.Dispatch<React.SetStateAction<string | undefined | null>>;
}

const ViewReport: React.FC = () => {
  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { qrCode, setQRCode } = globalStates;

  // Local states
  const [hideQRCode, setHideQRCode] = useState<boolean>(false);
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

  // Build image from QR Code
  const buildQRCode = useCallback(async () => {
    const qrCode = document.getElementById("qr-code");
    if (qrCode) {
      try {
        const dataUrl = await toPng(qrCode);
        setQRCode(dataUrl);
      } catch (error) {
        console.log(error);
        setQRCode(undefined);
      } finally {
        setHideQRCode(true);
      }
    }
  }, [setQRCode]);

  // fetch report data
  const fetchReportData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_HOST}/checkup/${checkupId}`);
      buildQRCode();
      setReportData(data);
    } catch (error) {
      console.log(error);
      setReportData(null);
    }
  }, [buildQRCode, checkupId]);

  // First render and when checkupId changes
  useEffect(() => {
    fetchReportData();
  }, [fetchReportData, checkupId, buildQRCode]);
  return (
    <AppLayout title={`Laporan ${checkupId}`} breadcrumb={breadcrumbItems}>
      <div className="flex w-full h-full items-start justify-center">
        <div id="qr-code" className="flex" hidden={hideQRCode}>
          <QRCode value={`${API_HOST}/checkup/${checkupId}`} />
        </div>

        {reportData && qrCode ? (
          <PDF {...reportData} />
        ) : reportData === null ? (
          <NotFound />
        ) : (
          <Spin size="default" tip="Loading..." />
        )}
      </div>
    </AppLayout>
  );
};

export default ViewReport;
