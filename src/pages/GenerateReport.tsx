import { PatientProps, CheckUpProps, AnyObjectProps } from "../@types";
import type { UploadFile } from "antd/es/upload/interface";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React, { useState, useCallback } from "react";
import { useGlobalContext } from "../contexts/Global";
import { useCheckupDb } from "../database/useCheckupDb";
import { useAttachmentDb } from "../database/useAttachmentDb";

import { AppLayout } from "../layouts";
import { ReviewCheckUp } from "../views";
import { PatientForm, CheckUpForm } from "../components/forms";
import { Button, message, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import { ICheckup } from "../entities/checkup";

interface IGlobalContext {
  patientData: PatientProps;
  checkUpData: CheckUpProps;
  setPatientData: React.Dispatch<React.SetStateAction<PatientProps>>;
  setCheckUpData: React.Dispatch<React.SetStateAction<CheckUpProps>>;
}

interface IGlobalFunctions {
  nanoid: (size?: number) => string;
}

const GenerateReport: React.FC = () => {
  // Global States
  const { globalStates, globalFunctions } = useGlobalContext() as {
    globalStates: IGlobalContext;
    globalFunctions: IGlobalFunctions;
  };
  const { patientData, checkUpData, setCheckUpData, setPatientData } =
    globalStates;
  const { nanoid } = globalFunctions;

  // React Router Navigate
  const navigate = useNavigate();

  // Local states
  const [current, setCurrent] = useState(0);
  const [checkForm, setCheckForm] = useState(false);

  // Breadcrumb items
  const breadcrumbItems: ItemType[] = [
    {
      title: "Dashboard",
      onClick: () => navigate("/"),
    },
  ];

  // Db
  const { checkupDb } = useCheckupDb();
  const { attachmentDb } = useAttachmentDb();

  const steps = [
    {
      title: "Data Diri Pasien",
      content: (
        <PatientForm checkForm={checkForm} setCheckForm={setCheckForm} />
      ),
    },
    {
      title: "Hasil Pemeriksaan",
      content: (
        <CheckUpForm checkForm={checkForm} setCheckForm={setCheckForm} />
      ),
    },
    {
      title: "Buat Laporan",
      content: <ReviewCheckUp />,
    },
  ];
  const stepItems = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  // Check form is filled or not
  const checkFilled = (data: AnyObjectProps) => {
    const isDataValid = Object.values(data).every(
      (value) => value !== undefined && value !== "" && value !== null
    );

    if (!isDataValid) {
      message.error("Mohon isi semua data terlebih dahulu!");
      setCheckForm(true);
    }

    return isDataValid;
  };

  // Check pictures or videos is undefined or length is 0
  const checkMedia = (data: UploadFile[]) => {
    return data === undefined || data.length === 0;
  };

  const next = () => {
    setTimeout(() => {
      // Check form data is filled or not
      if (current === 0 && !checkFilled(patientData)) return;
      if (current === 1 && !checkFilled(checkUpData)) {
        if (checkMedia(checkUpData.pictures as UploadFile[])) {
          message.error("Mohon upload minimal 1 gambar!");
        }
        if (checkMedia(checkUpData.videos as UploadFile[])) {
          message.error("Mohon upload minimal 1 video!");
        }
        return;
      }

      setCurrent(current + 1);
    }, 300);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const convertUrlToBlob = async (videoUrl: string): Promise<Blob> => {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    return blob;
  };

  const handlePicsAttachment = useCallback(
    async (pictures: UploadFile[]): Promise<string[]> => {
      const res: string[] = [];
      for (let index = 0; index < pictures.length; index++) {
        const name = `${Date.now()}-pic-${nanoid()}.jpg`;
        const base64 = pictures[index].url?.toString().split(",")[1] as string;
        await attachmentDb.put({
          _id: name,
          name,
          sync: false,
          type: "image/jpeg",
          _attachments: {
            [name]: {
              content_type: "image/jpeg",
              data: base64,
            },
          },
        });
        res.push(name);
      }

      return res;
    },
    [attachmentDb, nanoid]
  );

  const handleVidsAttachment = useCallback(
    async (videos: UploadFile[]): Promise<string[]> => {
      const res: string[] = [];
      for (let index = 0; index < videos.length; index++) {
        const name = `${Date.now()}-vid-${nanoid()}.webm`;
        const blob = await convertUrlToBlob(videos[index].url as string);

        await attachmentDb.put({
          _id: name,
          name,
          sync: false,
          type: "video/webm",
          _attachments: {
            [name]: {
              content_type: "video/webm",
              data: blob,
            },
          },
        });

        res.push(name);
      }
      return res;
    },
    [attachmentDb, nanoid]
  );

  const handleCreateReport = useCallback(async () => {
    try {
      // Upload pictures
      const pics = await handlePicsAttachment(
        checkUpData.pictures as UploadFile[]
      );

      // Upload videos
      const vids = await handleVidsAttachment(
        checkUpData.videos as UploadFile[]
      );

      const res = await checkupDb.put<ICheckup>({
        _id: `checkup-${nanoid()}-${nanoid()}`,
        address: patientData.address as string,
        gender: patientData.gender as boolean,
        name: patientData.name as string,
        dob: patientData.dob,
        complaint: patientData.complaint as string,
        result: checkUpData.result as string,
        advice: checkUpData.advice as string,
        conclusion: checkUpData.conclusion as string,
        pictures: [...pics],
        videos: [...vids],
      });

      console.log(res)

      message.success("Laporan berhasil dibuat!");

      // Reset global states
      setPatientData({
        address: undefined,
        complaint: undefined,
        dob: undefined,
        gender: undefined,
        name: undefined,
        id: undefined,
      });
      setCheckUpData({
        advice: undefined,
        conclusion: undefined,
        pictures: undefined,
        videos: undefined,
        result: undefined,
      });

      // navigate(`/checkup/${res.id}`);
    } catch (error) {
      console.log(error);
    }
  }, [checkUpData.advice, checkUpData.conclusion, checkUpData.pictures, checkUpData.result, checkUpData.videos, checkupDb, handlePicsAttachment, handleVidsAttachment, nanoid, patientData.address, patientData.complaint, patientData.dob, patientData.gender, patientData.name, setCheckUpData, setPatientData]);

  return (
    <AppLayout title="Pemeriksaan" breadcrumb={breadcrumbItems}>
      <div className="flex flex-col justify-between w-full h-full space-y-3">
        {/* Step title */}
        <div className="flex items-center justify-center w-full">
          <Steps current={current} items={stepItems} />
        </div>

        {/* Step content */}
        <div className="flex w-full h-full px-3 py-3 border-2 border-dashed bg-slate-100 rounded-2xl">
          {steps[current].content}
        </div>

        {/* Step navigation */}
        <div className="flex items-center justify-end w-full">
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Sebelumnya
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleCreateReport}>
              Selesai
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Selanjutnya
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default GenerateReport;
