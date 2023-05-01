import { CheckUpProps } from "../../../@types";

import { useState } from "react";
import { useGlobalContext } from "../../../contexts/Global";

import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import axios from "axios";

interface IGlobalContext {
  checkUpData: CheckUpProps;
  setCheckUpData: React.Dispatch<React.SetStateAction<CheckUpProps>>;
}

const UploadPictures = () => {
  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { checkUpData, setCheckUpData } = globalStates;

  // Local states
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>(checkUpData.pictures || []);

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

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name ||
        file.url?.substring(file.url?.lastIndexOf("/") + 1) ||
        "image.jpg"
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    // Update checkUpData
    setCheckUpData((prev) => ({
      ...prev,
      pictures: newFileList,
    }));

    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <ImgCrop 
        quality={0.8}
        showReset={true}
      >
        <Upload
          customRequest={handleUpload}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        width={500}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadPictures;
