import type { ReportProps } from "../@types";
import React, { useState, useEffect, useCallback } from "react";
import { useCheckupDb } from "../database/useCheckupDb";
import { useAttachmentDb } from "../database/useAttachmentDb";

import { PreviewImage, PreviewVideo } from "../components/modals";
import { Descriptions, Divider, Spin } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { NotFound } from ".";

const { Item } = Descriptions;

const ReportCheckup: React.FC = () => {
  // Path location using route
  const checkupId = useParams<{ checkupId: string }>().checkupId;
  console.log(checkupId)

  // Local states
  const [reportData, setReportData] = useState<ReportProps | undefined | null>(
    undefined
  );
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewImageOpen, setPreviewImageOpen] = useState<boolean>(false);
  const [previewImageTitle, setPreviewImageTitle] = useState<string>("");
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [previewVideoOpen, setPreviewVideoOpen] = useState<boolean>(false);
  const [previewVideoTitle, setPreviewVideoTitle] = useState<string>("");

  // Database
  const { checkupDb } = useCheckupDb()
  const { attachmentDb } = useAttachmentDb()

  // fetch picture attachment
  const fetchPictures = useCallback(async (pictures: string[]): Promise<string []> => {
    const res: string[] = []
    for (const pic of pictures) {
      const imgData = await attachmentDb.getAttachment(pic, pic)
      const url = URL.createObjectURL(imgData as Blob) as string
      res.push(url)
    }

    return res
  }, [attachmentDb])

  // fetch report data
  const fetchReportData = useCallback(async () => {
    try {
      const res = await checkupDb.get(checkupId as string)
      const { videos, pictures, _id, dob } = res

      const pics = await fetchPictures(pictures)
      const vids = await fetchPictures(videos)
      
      const newReportData: ReportProps = {
        ...res,
        dob: dayjs(dob).format("DD MMMM YYYY"),
        id: _id,
        pictures: pics,
        videos: vids
      }

      setReportData(newReportData)



    } catch (error) {
      console.log(error);
      setReportData(null);
    }
  }, [checkupDb, checkupId, fetchPictures]);

  // Handle preview image
  const handlePreviewImage = (path: string) => {
    setPreviewImage(path);
    setPreviewImageOpen(true);
    setPreviewImageTitle(path.substring(path.lastIndexOf("/") + 1));
  };

  // Handle close preview image
  const handleClosePreviewImage = () => {
    setPreviewImage("");
    setPreviewImageOpen(false);
    setPreviewImageTitle("");
  };

  // Handle preview video
  const handlePreviewVideo = async (path: string) => {
    setPreviewVideo(path);
    setPreviewVideoOpen(true);
    setPreviewVideoTitle(path.substring(path.lastIndexOf("/") + 1));
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

  // First render and when checkupId changes
  useEffect(() => {
    fetchReportData();
  }, [fetchReportData, checkupId]);

  return (
    <div className="flex flex-col w-full h-full px-5 py-5 space-y-2">
      {reportData === undefined ? (
        <Spin size="large" />
      ) : reportData === null ? (
        <NotFound />
      ) : (
        <>
          <Divider orientation="left">Data Pasien</Divider>
          <Descriptions layout="vertical" className="w-full h-full">
            <Item label="Nama Pasien">{reportData.name}</Item>
            <Item label="Jenis Kelamin">
              {reportData.gender ? "Laki-laki" : "Perempuan"}
            </Item>
            <Item label="Tanggal Lahir / Umur">
              {dayjs(reportData.dob).format("DD MMMM YYYY")} /{" "}
              {dayjs().diff(reportData.dob, "year")} tahun
            </Item>
            <Item label="Alamat">{reportData.address}</Item>
          </Descriptions>

          <Divider orientation="left">Rekap Pemeriksaan</Divider>

          <Descriptions layout="vertical">
            <Item label="Keluhan">{reportData.complaint}</Item>
            <Item label="Hasil Pemeriksaan">{reportData.result}</Item>
            <Item label="Kesimpulan">{reportData.conclusion}</Item>
            <Item label="Saran">{reportData.advice}</Item>
          </Descriptions>

          <Divider orientation="left">Lampiran Pemeriksaan</Divider>

          <Descriptions layout="vertical">
            <Item label="Foto">
              <div className="flex flex-row flex-wrap gap-2">
                {reportData.pictures?.length !== 0 &&
                  reportData.pictures !== undefined &&
                  reportData.pictures.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={image}
                      className="object-cover w-32 h-32 cursor-pointer"
                      onClick={() => handlePreviewImage(image)}
                    />
                  ))}
              </div>
            </Item>
            <Item label="Video">
              <div className="flex flex-row flex-wrap gap-2">
                {reportData.videos?.length !== 0 &&
                  reportData.videos !== undefined &&
                  reportData.videos.map((video, index) => (
                    <video
                      key={index}
                      src={video}
                      className="object-cover w-32 h-32 cursor-pointer"
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
        </>
      )}
    </div>
  );
};

export default ReportCheckup;
