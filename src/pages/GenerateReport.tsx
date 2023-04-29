import React, { useState } from "react";
import { Button, message, Steps } from "antd";

const GenerateReport: React.FC = () => {
  const steps = [
    {
      title: "Data Diri Pasien",
      content: "First-content",
    },
    {
      title: "Hasil Pemeriksaan",
      content: "Second-content",
    },
    {
      title: "Buat Laporan",
      content: "Last-content",
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="flex flex-col space-y-3 w-full h-full justify-between">
      {/* Step title */}
      <div className="flex w-full items-center justify-center">
        <Steps current={current} items={items} />
      </div>

      {/* Step content */}
      <div className="flex w-full h-full px-3 py-3 bg-slate-100 rounded-2xl border-2 border-dashed">
        {steps[current].content}
      </div>

      {/* Step navigation */}
      <div className="flex w-full items-center justify-end">
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Sebelumnya
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Selesai
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Selanjutnya
          </Button>
        )}
      </div>
    </div>
  );
};

export default GenerateReport;
