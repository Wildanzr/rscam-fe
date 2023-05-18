import React from "react";

import { Modal } from "antd";
import ReactPlayer from "react-player"

interface IPreviewVideo {
  previewOpen: boolean;
  previewVideo: string | undefined;
  previewTitle: string;
  handleCancel: () => void;
  width?: number;
  footer?: React.ReactNode | null;
}

const PreviewVideo = ({
  previewOpen,
  previewTitle,
  handleCancel,
  width = 500,
  footer = null,
  previewVideo,
}: IPreviewVideo) => {
  return (
    <>
      <Modal
        open={previewOpen}
        title={previewTitle}
        onCancel={handleCancel}
        centered
        footer={footer}
        width={width}
      >
        <ReactPlayer 
          url={previewVideo}
          controls
          id="video-preview"
          width="100%"
          height="100%"
        />
        {/* <video
          src={previewVideo}
          controls
          className="w-full"
          id="video-preview"
        /> */}
      </Modal>
    </>
  );
};

export default PreviewVideo;
