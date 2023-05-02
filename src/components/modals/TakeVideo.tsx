import { CheckUpProps } from "../../@types";
import React, { useState } from "react";
import { useGlobalContext } from "../../contexts/Global";

import { Button, Modal } from "antd";
import { useRecordWebcam } from "react-record-webcam";
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
  const [recordState, setRecordState] = useState<string>("idle");
  const [recordedVideo, setRecordedVideo] = useState<boolean>(false);

  //   Webcam constraints
  const recordWebcam = useRecordWebcam({
    frameRate: 60,
    width: 1280,
    height: 720,
    mimeType: "video/mp4"
  });

  const uploadVideo = async () => {
    const blob = (await recordWebcam.getRecording()) as Blob;
    const file = new File([blob], "video.mp4", { type: blob.type });

    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "mime-type": "video/mp4",
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
      console.log(data);

      closeModal();
    } catch (err) {
      console.log("Eroor: ", err);
    }
  };

  const openModal = (): void => {
    setVisible(true);
    setRecordedVideo(false);
    setRecordState("idle");

    setTimeout(() => {
      recordWebcam.open();
    }, 300);
  };

  const closeModal = (): void => {
    recordWebcam.close();
    setRecordedVideo(false);
    setRecordState("idle");

    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const handleButtonRecord = () => {
    const startRecording = () => {
      setRecordedVideo(false);
      setRecordState("recording");

      setTimeout(() => {
        recordWebcam.start();
      }, 300);
    };

    const stopRecording = () => {
      setRecordedVideo(true);
      setRecordState("stopped");

      setTimeout(() => {
        recordWebcam.stop();
      }, 300);
    };

    const retake = () => {
      setRecordedVideo(false);
      setRecordState("idle");

      setTimeout(() => {
        recordWebcam.retake();
      }, 300);
    };
    if (recordState === "idle") {
      startRecording();
    } else if (recordState === "recording") {
      stopRecording();
    } else if (recordState === "stopped") {
      retake();
    }
  };

  return (
    <>
      <Button type="primary" onClick={openModal}>
        Ambil Video
      </Button>
      <Modal
        title="Ambil Video"
        centered
        open={visible}
        footer={null}
        onCancel={closeModal}
      >
        <div className="flex flex-col w-full space-y-2">
          <video ref={recordWebcam.webcamRef} autoPlay hidden={recordedVideo} />
          <video
            ref={recordWebcam.previewRef}
            autoPlay
            loop
            controls
            hidden={!recordedVideo}
          />

          <div className="flex flex-row w-full space-x-3 items-center justify-center">
            <Button type="primary" onClick={handleButtonRecord}>
              {recordState === "idle"
                ? "Mulai Rekam"
                : recordState === "recording"
                ? "Berhenti Rekam"
                : "Ambil Ulang"}
            </Button>

            <Button type="primary" onClick={uploadVideo}>
              Upload Video
            </Button>
          </div>

          {/* <button onClick={recordWebcam.start}>Start recording</button>
          <button onClick={stopRecording}>Stop recording</button>
          <button onClick={recordWebcam.retake}>Retake recording</button>
          <button onClick={recordWebcam.download}>Download recording</button>
          <button onClick={saveFile}>Save file to server</button> */}
        </div>
      </Modal>
    </>
  );
};

export default TakeVideo;
