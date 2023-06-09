/* eslint-disable react-hooks/exhaustive-deps */
import { CheckUpProps } from "../../../@types";

import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../contexts/Global";

import { PreviewImage } from "../../modals";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadRequestOption } from "rc-upload/lib/interface";

const { Dragger } = Upload;

interface IGlobalContext {
  checkUpData: CheckUpProps;
  setCheckUpData: React.Dispatch<React.SetStateAction<CheckUpProps>>;
  renderUploadedPictures: boolean;
  setRenderUploadedPictures: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadPictures = () => {
  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const {
    checkUpData,
    setCheckUpData,
    renderUploadedPictures,
    setRenderUploadedPictures,
  } = globalStates;

  // Local states
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>(
    checkUpData.pictures || []
  );

  const fileToBase64 = (file: RcFile): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1]; // Extract the base64-encoded data from the data URL
        const mimeType = file.type;
        resolve(`data:${mimeType};base64,${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle upload file using axios
  const handleUpload = async (options: UploadRequestOption<unknown>) => {
    const { onSuccess, file } = options as unknown as {
      onSuccess: (msg: string) => void;
      onError: (err: Error) => void;
      file: RcFile;
    };

    const convertedFile = await fileToBase64(file);
    onSuccess(convertedFile);
    setRenderUploadedPictures(true);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Handle close preview modal
  const handleCancel = () => setPreviewOpen(false);

  // Handle preview image
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
    // Filter successfully uploaded pictures and map to new array
    const newPictures = newFileList
      .filter((file) => file.status === "done")
      .map((file, index) => {
        return {
          uid: `-${index}`,
          name: `image-${index}.jpg`,
          status: "done" as const,
          url: file.response || file.url as string,
        };
      });

    // Update checkUpData
    setCheckUpData((prev) => ({
      ...prev,
      pictures: newPictures,
    }));

    setFileList(newFileList);
  };

  const handleBeforeUpload = (file: File) => {
    // Check current filelist length, if more than 6, don't upload
    if (fileList.length >= 6) {
      message.error("Jumlah maksimal yang dapat diunggah adalah 6 foto");
      return Upload.LIST_IGNORE;
    }

    const isImage = file.type.includes("image");
    if (!isImage) {
      message.error("Anda hanya dapat mengunggah file gambar");
    }

    return isImage ? true : Upload.LIST_IGNORE;
  };

  const draggerProps: UploadProps = {
    name: "pictures",
    listType: "picture",
    fileList: fileList,
    beforeUpload: handleBeforeUpload,
    onPreview: handlePreview,
    onChange: handleChange,
    customRequest: handleUpload,
    className: "flex flex-col space-y-2 w-full",
  }

  // Update fileList when checkUpData.pictures changes
  useEffect(() => {
    setFileList(checkUpData.pictures || []);
    setRenderUploadedPictures(false);
  }, [renderUploadedPictures]);

  return (
    <>
      <ImgCrop
       quality={1}
       showReset={true}
       aspect={1 / 1}
      >
        <Dragger {...draggerProps} >
          <p className="ant-upload-drag-icon">
            <PlusOutlined />
          </p>
          <p className="ant-upload-text">
            Tekan atau tarik foto ke area ini untuk mengunggah
          </p>
          <p className="ant-upload-hint">
            Jumlah maksimal yang dapat diunggah adalah 6 foto
          </p>
        </Dragger>
      </ImgCrop>
      <PreviewImage 
        previewOpen={previewOpen}
        previewTitle={previewTitle}
        handleCancel={handleCancel}
        previewImage={previewImage}
        footer={null}
        width={500}
      />
    </>
  );
};

export default UploadPictures;
