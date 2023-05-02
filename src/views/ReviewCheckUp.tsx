import { PatientProps, CheckUpProps } from "../@types";
import React, { useState } from "react";
import { useGlobalContext } from "../contexts/Global";

import { PreviewImage, PreviewVideo } from "../components/modals";
import { Descriptions, Divider } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";

const { Item } = Descriptions;

interface IGlobalContext {
  patientData: PatientProps;
  checkUpData: CheckUpProps;
}

const ReviewCheckUp: React.FC = () => {
  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { patientData, checkUpData } = globalStates;

  // Local states
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewImageOpen, setPreviewImageOpen] = useState<boolean>(false);
  const [previewImageTitle, setPreviewImageTitle] = useState<string>("");
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [previewVideoOpen, setPreviewVideoOpen] = useState<boolean>(false);
  const [previewVideoTitle, setPreviewVideoTitle] = useState<string>("");

  // Handle preview image
  const handlePreviewImage = (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewImageOpen(true);
    setPreviewImageTitle(
      file.name ||
        file.url?.substring(file.url?.lastIndexOf("/") + 1) ||
        "image.jpg"
    );
  };

  // Handle close preview image
  const handleClosePreviewImage = () => {
    setPreviewImage("");
    setPreviewImageOpen(false);
    setPreviewImageTitle("");
  };

  // Handle preview video
  const handlePreviewVideo = async (file: UploadFile) => {
    setPreviewVideo(file.url || (file.preview as string));
    setPreviewVideoOpen(true);
    setPreviewVideoTitle(
      file.name ||
        file.url?.substring(file.url?.lastIndexOf("/") + 1) ||
        "video.webm"
    );
  };

  // Handle close preview video
  const handleClosePreviewVideo = (): void => {
    setPreviewVideoOpen(false);
    setPreviewVideo("");
    setPreviewVideoTitle("");

    setTimeout(() => {
      const video = document.getElementById(
        "video-preview"
      ) as HTMLVideoElement;
      video.pause();
      video.currentTime = 0;
    }, 300);
  };

  return (
    <div className="flex flex-col space-y-2 w-full h-full">
      <Divider orientation="left">Data Pasien</Divider>
      <Descriptions layout="vertical" className="w-full h-full">
        <Item label="Nama Pasien">{patientData.name}</Item>
        <Item label="Jenis Kelamin">
          {patientData.gender ? "Laki-laki" : "Perempuan"}
        </Item>
        <Item label="Tanggal Lahir / Umur">
          {dayjs(patientData.dob).format("DD MMMM YYYY")} /{" "}
          {dayjs().diff(patientData.dob, "year")} tahun
        </Item>
        <Item label="Alamat">{patientData.address}</Item>
      </Descriptions>

      <Divider orientation="left">Rekap Pemeriksaan</Divider>

      <Descriptions layout="vertical">
        <Item label="Keluhan">{patientData.complaint}</Item>
        <Item label="Hasil Pemeriksaan">{checkUpData.result}</Item>
        <Item label="Kesimpulan">{checkUpData.conclusion}</Item>
        <Item label="Saran">{checkUpData.advice}</Item>
      </Descriptions>

      <Divider orientation="left">Lampiran Pemeriksaan</Divider>

      <Descriptions layout="vertical">
        <Item label="Foto">
          <div className="flex flex-row flex-wrap space-x-2">
            {checkUpData.pictures?.length !== 0 &&
              checkUpData.pictures !== undefined &&
              checkUpData.pictures.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.name}
                  className="w-32 h-32 object-cover cursor-pointer"
                  onClick={() => handlePreviewImage(image)}
                />
              ))}
          </div>
        </Item>
        <Item label="Video">
          <div className="flex flex-row flex-wrap space-x-2">
            {checkUpData.videos?.length !== 0 &&
              checkUpData.videos !== undefined &&
              checkUpData.videos.map((video, index) => (
                <video
                  key={index}
                  src={video.url}
                  className="w-32 h-32 object-cover cursor-pointer"
                  onClick={() => handlePreviewVideo(video)}
                />
              ))}
          </div>
        </Item>
      </Descriptions>

      <PreviewImage
        previewImage={previewImage}
        previewOpen={previewImageOpen}
        previewTitle={previewImageTitle}
        handleCancel={handleClosePreviewImage}
        footer={null}
        width={500}
      />

      <PreviewVideo
        previewVideo={previewVideo}
        previewOpen={previewVideoOpen}
        previewTitle={previewVideoTitle}
        handleCancel={handleClosePreviewVideo}
        footer={null}
        width={500}
      />
    </div>
  );
};

export default ReviewCheckUp;
