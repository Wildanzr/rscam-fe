import { CheckUpProps, VideoConstaintsProps } from "../../@types";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGlobalContext } from "../../contexts/Global";

import { Button, Modal, Select, UploadFile } from "antd";
import Webcam from "react-webcam";

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
  const [videoConstraints, setVideoConstraints] =
    useState<VideoConstaintsProps>({
      width: 1280,
      height: 720,
      facingMode: "environment",
    });
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  // Refs
  const webcamRef = useRef<Webcam>(null);

  const openModal = (): void => {
    setVisible(true);
    setCapturedImage(undefined);

    setTimeout(() => {
      setCameraVisible(true);
    }, 300);
  };

  const closeModal = (): void => {
    setCameraVisible(false);

    setTimeout(() => {
      setVisible(false);
    }, 300);
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

  // Upload offline
  const handleOffline = (): UploadFile => {
    const length = checkUpData?.pictures?.length || 0;
    const url: string = capturedImage as string;
    const result: UploadFile = {
      name: `image-${length}.jpg`,
      uid: `${length}`,
      status: "done",
      url
    };

    return result;
  };

  // Handle upload picture with base64 string using axios
  const handleUploadPicture = async (): Promise<void> => {
    const newPicture = handleOffline();

    setCheckUpData({
      ...checkUpData,
      pictures: checkUpData.pictures
        ? [...checkUpData.pictures, newPicture]
        : [newPicture],
    });

    setRenderUploadedPictures((prev) => !prev);

    closeModal();
  };

  const handleDevices = useCallback((MediaDevices: MediaDeviceInfo[]) => {
    setDevices(MediaDevices);
    setVideoConstraints({
      width: 700,
      height: 700,
      facingMode: "environment",
      deviceId: MediaDevices[0].deviceId,
    });
  }, []);

  // Detect devices
  useEffect(() => {
    // only get devices with camera
    navigator.mediaDevices.enumerateDevices().then((MediaDevices) => {
      const videoDevices = MediaDevices.filter(
        (device) => device.kind === "videoinput"
      );
      handleDevices(videoDevices);
    });
  }, [handleDevices]);

  return (
    <>
      <Button
        type="primary"
        onClick={openModal}
        disabled={
          checkUpData &&
          checkUpData.pictures &&
          checkUpData.pictures.length >= 6
        }
      >
        Ambil Foto
      </Button>
      <Modal
        title="Ambil Foto"
        centered
        footer={null}
        open={visible}
        onCancel={closeModal}
      >
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
          <div className="flex flex-col w-full space-y-2">
            {cameraVisible && (
              <>
                <Webcam
                  audio={false}
                  mirrored={false}
                  screenshotFormat="image/jpeg"
                  screenshotQuality={1}
                  imageSmoothing={true}
                  videoConstraints={videoConstraints}
                  ref={webcamRef}
                  className="flex w-full"
                />
                <Select
                  className="flex w-full"
                  defaultValue={devices[0]?.label || ""}
                  options={
                    devices.map((device, idx) => ({
                      label: device.label,
                      value: idx,
                    })) || []
                  }
                  onChange={(value) => {
                    const selectedDevice = devices[value as unknown as number];
                    setVideoConstraints({
                      width: 700,
                      height: 700,
                      facingMode: "environment",
                      deviceId: selectedDevice.deviceId,
                    });
                  }}
                />
              </>
            )}
          </div>

          {/* Captured image */}
          {capturedImage && (
            <div className="flex flex-col items-center justify-center w-full">
              <img src={capturedImage} alt="captured" />
            </div>
          )}

          <div className="flex flex-row items-center justify-center w-full space-x-3">
            <Button type="primary" onClick={handleRetakeOrCapture}>
              {capturedImage ? "Ambil Ulang" : "Ambil Foto"}
            </Button>
            <Button
              type="primary"
              onClick={handleUploadPicture}
              disabled={capturedImage === undefined}
            >
              Upload Foto
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TakePicture;
