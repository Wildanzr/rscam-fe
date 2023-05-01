/* eslint-disable react-hooks/exhaustive-deps */
import { CheckUpProps } from "../../@types";
import React, { useState, useRef, useCallback } from "react";
import { useGlobalContext } from "../../contexts/Global";

import { Button, Modal } from "antd";
import Webcam from "react-webcam";
import axios from "axios";

interface IGlobalContext {
  checkUpData: CheckUpProps;
  setCheckUpData: React.Dispatch<React.SetStateAction<CheckUpProps>>;
  setRenderUploadedPictures: React.Dispatch<React.SetStateAction<boolean>>;
}

const TakePicture: React.FC = () => {
  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { checkUpData, setCheckUpData, setRenderUploadedPictures } =
    globalStates;

  // Local states
  const [visible, setVisible] = useState<boolean>(false);
  const [cameraVisible, setCameraVisible] = useState<boolean>(true);
  const [capturedImage, setCapturedImage] = useState<string | undefined>(
    undefined
  );

  // Refs
  const webcamRef = useRef<Webcam>(null);

  // Webcam constraints
  const videoConstraints = {
    width: 700,
    height: 700,
    facingMode: "user",
  };

  const openModal = (): void => {
    setVisible(true);
    setCapturedImage(undefined);

    setTimeout(() => {
      setCameraVisible(true);
    }, 500);
  };

  const closeModal = (): void => {
    setCameraVisible(false);

    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  const retake = (): void => {
    setCapturedImage(undefined);
    setCameraVisible(true);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot() as string;
    setCapturedImage(imageSrc);
    setCameraVisible(false);
  }, [webcamRef]);

  // Handle capture and retake
  const handleRetakeOrCapture = (): void => {
    if (capturedImage) {
      retake();
    } else {
      capture();
    }
  };

  // Convert imageFileUri to File object with promise
  const imageDataUriToFile = (
    imageDataUri: string,
    fileName: string
  ): Promise<File> =>
    new Promise((resolve, reject) => {
      try {
        const byteString = atob(imageDataUri.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        resolve(new File([ab], fileName, { type: "image/jpeg" }));
      } catch (err) {
        reject(err);
      }
    });

  // Handle upload picture with base64 string using axios
  const handleUploadPicture = async (): Promise<void> => {
    const file = await imageDataUriToFile(capturedImage as string, "image.jpg");
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

      //   Result
      const url = data.data.url;
      const length = checkUpData?.pictures?.length || 0;
      const newPictures = {
        uid: `${length}`,
        name: `image-${length}.jpg`,
        status: "done" as const,
        url: url,
      };

      setCheckUpData({
        ...checkUpData,
        pictures: checkUpData.pictures
          ? [...checkUpData.pictures, newPictures]
          : [newPictures],
      });

      setRenderUploadedPictures((prev) => !prev);

      closeModal();
    } catch (err) {
      console.log("Eroor: ", err);
    }
  };

  return (
    <>
      <Button type="primary" onClick={openModal}>
        Ambil Foto
      </Button>
      <Modal
        title="Ambil Foto"
        centered
        footer={null}
        open={visible}
        onCancel={closeModal}
      >
        <div className="flex flex-col space-y-4 w-full h-full items-center justify-center">
          <div className="flex w-full">
            {cameraVisible && (
              <Webcam
                audio={false}
                mirrored={true}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
                videoConstraints={videoConstraints}
                ref={webcamRef}
                className="flex w-full"
              />
            )}
          </div>

          {/* Captured image */}
          {capturedImage && (
            <div className="flex flex-col w-full items-center justify-center">
              <img src={capturedImage} alt="captured" />
            </div>
          )}

          <div className="flex flex-row w-full space-x-3 items-center justify-center">
            <Button type="primary" onClick={handleRetakeOrCapture}>
              {capturedImage ? "Ambil Ulang" : "Ambil Foto"}
            </Button>
            <Button
              type="primary"
              onClick={handleUploadPicture}
              disabled={capturedImage === undefined}
            >
              Simpan Foto
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TakePicture;
