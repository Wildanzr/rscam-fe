import { CheckUpProps } from "../../@types";
import React, { useState, useRef, useCallback } from "react";
import { useGlobalContext } from "../../contexts/Global";

import { Button, Modal } from "antd";
import Webcam from "react-webcam";
import axios from "axios";

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

  // Refs
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

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

      const file = new File([blob], "video.webm", { type: blob.type });

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
        const length = checkUpData?.videos?.length || 0;
        const newVideos = {
          uid: `${length}`,
          name: `video-${length}.webm`,
          status: "done" as const,
          url: url,
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
      } catch (err) {
        console.log("Eroor: ", err);
      }
    }
  }, [checkUpData, recordedChunks, setCheckUpData, setRenderUploadedVideos]);

  const handleRetake = useCallback(() => {
    setRecordedChunks([]);
    setCaptureState("idle");
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
        <div className="flex flex-col space-y-4 w-full h-full items-center justify-center">
          <div className="flex w-full">
            {videoVisible && (
              <Webcam
                height={videoConstraints.height}
                width={videoConstraints.width}
                audio={true}
                mirrored={true}
                videoConstraints={videoConstraints}
                ref={webcamRef}
                hidden={captureState === "stopped"}
                className="flex w-full"
              />
            )}

            {/* Show recorded video */}
            {recordedChunks.length > 0 && (
              <video controls autoPlay loop className="flex w-full" hidden={captureState !== "stopped"}>
                <source
                  src={URL.createObjectURL(
                    new Blob(recordedChunks, { type: "video/webm" })
                  )}
                  type="video/webm"
                />
              </video>
            )}
          </div>

          <div className="flex flex-row w-full space-x-3 items-center justify-center">
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
