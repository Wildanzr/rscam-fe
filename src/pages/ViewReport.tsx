import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import type { ReportProps } from "../@types";
import React, { useState, useEffect, useCallback } from "react";
import { useGlobalContext } from "../contexts/Global";
import { AppLayout } from "../layouts";
import { useCheckupDb } from "../database/useCheckupDb";
import { useAttachmentDb } from "../database/useAttachmentDb";

import { NotFound } from ".";
import { PDF } from "../components/document";
import { Spin, QRCode } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import dayjs from "dayjs";

const APP_HOST = import.meta.env.VITE_APP_HOST as string;

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

  // Database
  const { checkupDb } = useCheckupDb();
  const { attachmentDb } = useAttachmentDb();

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

  // fetch picture attachment
  const fetchAttachments = useCallback(
    async (pictures: string[]): Promise<string[]> => {
      const res: string[] = [];
      for (const pic of pictures) {
        const imgData = await attachmentDb.getAttachment(pic, pic);
        const url = URL.createObjectURL(imgData as Blob) as string;
        res.push(url);
      }

      return res;
    },
    [attachmentDb]
  );

  // fetch report data
  const fetchReportData = useCallback(async () => {
    try {
      const res = await checkupDb.get(checkupId as string)
      const { videos, pictures, dob, _id } = res;

      const pics = await fetchAttachments(pictures);
      const vids = await fetchAttachments(videos);
      const newReportData: ReportProps = {
        ...res,
        dob: dayjs(dob),
        id: _id,
        pictures: pics,
        videos: vids,
      };

      setReportData(newReportData);
    } catch (error) {
      console.log(error);
      setReportData(null);
    } finally {
      buildQRCode();
    }
  }, [buildQRCode, checkupDb, checkupId, fetchAttachments]);

  // First render and when checkupId changes
  useEffect(() => {
    fetchReportData();
  }, [fetchReportData, checkupId, buildQRCode]);
  return (
    <AppLayout title={`Laporan ${checkupId}`} breadcrumb={breadcrumbItems}>
      <div className="flex items-start justify-center w-full h-full">
        <div id="qr-code" className="flex" hidden={hideQRCode}>
          <QRCode value={`${APP_HOST}/report/checkup/${checkupId}`} />
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
