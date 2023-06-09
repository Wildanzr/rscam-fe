import { CheckUpProps, VideoConstaintsProps } from "../../@types";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useGlobalContext } from "../../contexts/Global";

import { Button, Modal, Select, UploadFile } from "antd";
import Webcam from "react-webcam";

import videothumb from '../../assets/videothumb.png'

interface IGlobalContext {
  checkUpData: CheckUpProps;
  setCheckUpData: React.Dispatch<React.SetStateAction<CheckUpProps>>;
  setRenderUploadedVideos: React.Dispatch<React.SetStateAction<boolean>>;
}

const TakeVideo: React.FC = () => {
  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { checkUpData, setCheckUpData, setRenderUploadedVideos } = globalStates;

  // Local states
  const [visible, setVisible] = useState<boolean>(false);
  const [videoVisible, setVideoVisible] = useState<boolean>(true);
  const [captureState, setCaptureState] = useState<string>("idle");
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoConstraints, setVideoConstraints] =
    useState<VideoConstaintsProps>({
      width: 1280,
      height: 720,
      facingMode: "environment",
    });
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  // Refs
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const openModal = (): void => {
    setVisible(true);
    setCaptureState("idle");
    setRecordedChunks([]);

    setTimeout(() => {
      setVideoVisible(true);
    }, 300);
  };

  const closeModal = (): void => {
    setVideoVisible(false);
    setCaptureState("idle");
    setRecordedChunks([]);

    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const handleDataAvailable = useCallback(
    ({ data }: { data: Blob }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCaptureState("recording");
    if (webcamRef.current !== null) {
      mediaRecorderRef.current = new MediaRecorder(
        webcamRef.current.stream as MediaStream,
        {
          mimeType: "video/webm",
        }
      );
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setCaptureState("stopped");
    setVideoVisible(false);
  }, [mediaRecorderRef]);

  const handleUpload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const videoObjectURL = URL.createObjectURL(blob)

      const length = checkUpData?.videos?.length || 0;
      const newVideos: UploadFile = {
        uid: `${length}`,
        name: `video-${length}.webm`,
        status: "done" as const,
        url: videoObjectURL,
        thumbUrl: videothumb
      };

      setCheckUpData({
        ...checkUpData,
        videos: checkUpData.videos
          ? [...checkUpData.videos, newVideos]
          : [newVideos],
      });

      setRenderUploadedVideos((prev) => !prev);
      setRecordedChunks([]);
      closeModal();
    }
  }, [checkUpData, recordedChunks, setCheckUpData, setRenderUploadedVideos]);

  const handleRetake = useCallback(() => {
    setRecordedChunks([]);
    setCaptureState("idle");
    setVideoVisible(true);
  }, [setRecordedChunks]);

  const handleButtonRecord = (): void => {
    if (captureState === "idle") {
      handleStartCaptureClick();
    } else if (captureState === "recording") {
      handleStopCaptureClick();
    } else if (captureState === "stopped") {
      handleRetake();
    }
  };

  const handleDevices = useCallback((MediaDevices: MediaDeviceInfo[]) => {
    setDevices(MediaDevices);
    setVideoConstraints({
      width: 1280,
      height: 720,
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
      <Button type="primary" onClick={openModal}>
        Ambil Video
      </Button>
      <Modal
        title="Ambil Video"
        open={visible}
        centered
        onCancel={closeModal}
        footer={null}
      >
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
          <div className="flex flex-col w-full space-y-2">
            {videoVisible && (
              <>
                <Webcam
                  audio={true}
                  mirrored={false}
                  videoConstraints={videoConstraints}
                  ref={webcamRef}
                  hidden={captureState === "stopped"}
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
                      width: 1280,
                      height: 720,
                      facingMode: "environment",
                      deviceId: selectedDevice.deviceId,
                    });
                  }}
                />
              </>
            )}

            {/* Show recorded video */}
            {recordedChunks.length > 0 && !videoVisible && (
              <video
                controls
                autoPlay
                loop
                className="flex w-full"
                id="recorded-video"
                hidden={captureState !== "stopped"}
              >
                <source
                  src={URL.createObjectURL(
                    new Blob(recordedChunks, { type: "video/webm" })
                  )}
                  type="video/webm"
                />
              </video>
            )}
          </div>

          <div className="flex flex-row items-center justify-center w-full space-x-3">
            <Button
              type="primary"
              danger={captureState === "recording"}
              onClick={handleButtonRecord}
            >
              {captureState === "idle"
                ? "Mulai Rekam"
                : captureState === "recording"
                ? "Berhenti Rekam"
                : "Ambil Ulang"}
            </Button>

            <Button
              type="primary"
              onClick={handleUpload}
              disabled={recordedChunks.length === 0}
            >
              Upload Video
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TakeVideo;
