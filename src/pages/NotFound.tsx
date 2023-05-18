import React from "react";
import { Result } from "antd";
const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Mohon maaf, halaman yang Anda kunjungi belum tersedia atau masih dalam proses sinkronisasi."
      />
    </div>
  );
};

export default NotFound;
