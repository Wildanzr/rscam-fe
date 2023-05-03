import React from "react";

import { Modal } from "antd";

interface IPreviewImage {
  previewOpen: boolean;
  previewImage: string | undefined;
  previewTitle: string;
  handleCancel: () => void;
  width?: number;
  footer?: React.ReactNode | null;
}

const PreviewImage = ({
  previewOpen,
  previewTitle,
  handleCancel,
  width = 500,
  footer = null,
  previewImage,
}: IPreviewImage) => {
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
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PreviewImage;
