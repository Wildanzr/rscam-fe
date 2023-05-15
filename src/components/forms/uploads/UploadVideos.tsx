/* eslint-disable react-hooks/exhaustive-deps */
import { CheckUpProps } from "../../../@types";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../contexts/Global";

import { PreviewVideo } from "../../modals";
import { UploadFile, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import type { UploadRequestOption } from "rc-upload/lib/interface";

const { Dragger } = Upload;

import videothumb from "../../../assets/videothumb.png";

interface IGlobalContext {
  checkUpData: CheckUpProps;
  setCheckUpData: React.Dispatch<React.SetStateAction<CheckUpProps>>;
  renderUploadedVideos: boolean;
  setRenderUploadedVideos: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadVideos: React.FC = () => {
  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const {
    checkUpData,
    setCheckUpData,
    renderUploadedVideos,
    setRenderUploadedVideos,
  } = globalStates;

  // Local states
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  async function convertFileToBlob(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], {
          type: file.type,
        });
        resolve(blob);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  // Handle upload file using axios
  const handleUpload = async (options: UploadRequestOption<unknown>) => {
    const { onSuccess, file } = options as unknown as {
      onSuccess: (msg: string) => void;
      onError: (err: Error) => void;
      file: RcFile;
    };

    const blob = await convertFileToBlob(file);
    const urlVideo = URL.createObjectURL(blob);

    setTimeout(async () => {
      onSuccess(urlVideo);
      setRenderUploadedVideos(true);
    }, 1000);
  };

  // Handle before upload
  const handleBeforeUpload = (file: File) => {
    // Check current filelist length, if more than 6, don't upload
    if (fileList.length >= 6) {
      message.error("Jumlah maksimal yang dapat diunggah adalah 6 video");
      return Upload.LIST_IGNORE;
    }

    const isImage = file.type.includes("video");
    if (!isImage) {
      message.error("Anda hanya dapat mengunggah file video");
    }

    return isImage ? true : Upload.LIST_IGNORE;
  };

  // Handle preview video
  const handlePreview = async (file: UploadFile) => {
    setPreviewVideo(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        file.url?.substring(file.url?.lastIndexOf("/") + 1) ||
        "video.webm"
    );
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    // Filter successfully uploaded pictures and map to new array
    const newVideos = newFileList
      .filter((file) => file.status === "done")
      .map((file, index) => {
        return {
          uid: `-${index}`,
          name: `video-${index}.jpg`,
          status: "done" as const,
          url: file.response || file.url,
          thumbUrl: videothumb,
        };
      });

    const newV = [] as UploadFile[];

    for (let index = 0; index < newVideos.length; index++) {
      const newVideo: UploadFile = {
        name: `video-${index}.jpg`,
        uid: `-${index}`,
        status: "done" as const,
        url: newVideos[index].url,
        thumbUrl: videothumb,
      };
      newV.push(newVideo);
    }

    // Update checkUpData
    setCheckUpData((prev) => ({
      ...prev,
      videos: newVideos,
    }));

    setFileList(newFileList);
  };

  const draggerProps: UploadProps = {
    name: "videos",
    listType: "picture",
    fileList: fileList,
    beforeUpload: handleBeforeUpload,
    onPreview: handlePreview,
    onChange: handleChange,
    customRequest: handleUpload,
    className: "flex flex-col space-y-2 w-full",
  };

  // close modal
  const closePreview = (): void => {
    setPreviewOpen(false);

    setTimeout(() => {
      const video = document.getElementById(
        "video-preview"
      ) as HTMLVideoElement;
      video.pause();
      video.currentTime = 0;
    }, 300);
  };

  // Update fileList when checkUpData.video changes
  useEffect(() => {
    setFileList(checkUpData.videos || []);
    setRenderUploadedVideos(false);
  }, [renderUploadedVideos]);

  return (
    <>
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <PlusOutlined />
        </p>
        <p className="ant-upload-text">
          Tekan atau tarik video ke area ini untuk mengunggah
        </p>
        <p className="ant-upload-hint">
          Jumlah maksimal yang dapat diunggah adalah 6 video
        </p>
      </Dragger>

      <PreviewVideo
        previewOpen={previewOpen}
        previewTitle={previewTitle}
        handleCancel={closePreview}
        previewVideo={previewVideo}
        footer={null}
        width={500}
      />
    </>
  );
};

export default UploadVideos;
