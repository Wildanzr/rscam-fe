/* eslint-disable react-hooks/exhaustive-deps */
import { CheckUpProps } from "../../../@types";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../../contexts/Global";

import { UploadFile, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import axios from "axios";

const { Dragger } = Upload;

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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Handle upload file using axios
  const handleUpload = async (options: UploadRequestOption<unknown>) => {
    const { onSuccess, onError, file } = options as unknown as {
      onSuccess: (msg: string) => void;
      onError: (err: Error) => void;
      file: RcFile;
    };

    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    fmData.append("files", file);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/upload",
        fmData,
        config
      );
      const url = data.data.url;
      onSuccess(url);
    } catch (err) {
      console.log("Eroor: ", err);
      onError(err as Error);
    }
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

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    // Filter successfully uploaded pictures and map to new array
    const newVideos = newFileList
      .filter((file) => file.status === "done")
      .map((file, index) => {
        return {
          uid: `-${index}`,
          name: `video-${index}.jpg`,
          status: "done" as const,
          url: file.response,
        };
      });

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
    onChange: handleChange,
    customRequest: handleUpload,
    className: "flex flex-col space-y-2 w-full",
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
    </>
  );
};

export default UploadVideos;
