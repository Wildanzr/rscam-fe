import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Mohon maaf, halaman yang Anda kunjungi belum tersedia atau masih dalam proses sinkronisasi."
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
