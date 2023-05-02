import React from "react";

import { Modal } from "antd";

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
        footer={footer}
        width={width}
      >
        <video
          src={previewVideo}
          controls
          className="w-full"
          id="video-preview"
        />
      </Modal>
    </>
  );
};

export default PreviewVideo;
