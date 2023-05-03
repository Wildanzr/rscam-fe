import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Mohon maaf, halaman yang Anda cari tidak ditemukan."
        extra={<LinkBack />}
      />
    </div>
  );
};

const LinkBack: React.FC = () => {
  return (
    <Link to={"/"}>
      <Button type="primary">Kembali</Button>
    </Link>
  );
};

export default NotFound;
