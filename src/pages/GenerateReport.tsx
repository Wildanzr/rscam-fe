import { PatientProps, CheckUpProps, AnyObjectProps } from "../@types";

import React, { useState } from "react";
import { useGlobalContext } from "../contexts/Global";

import { PatientForm, CheckUpForm } from "../components/forms";

import { Button, message, Steps } from "antd";

interface IGlobalContext {
  patientData: PatientProps;
  checkUpData: CheckUpProps;
}

const GenerateReport: React.FC = () => {
  // Global States
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { patientData, checkUpData } = globalStates;

  // Local states
  const [current, setCurrent] = useState(0);
  const [checkForm, setCheckForm] = useState(false);

  const steps = [
    {
      title: "Data Diri Pasien",
      content: <PatientForm checkForm={checkForm} setCheckForm={setCheckForm} />,
    },
    {
      title: "Hasil Pemeriksaan",
      content: <CheckUpForm checkForm={checkForm} setCheckForm={setCheckForm} />,
    },
    {
      title: "Buat Laporan",
      content: "Last-content",
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  // Check form is filled or not
  const checkFilled = (data: AnyObjectProps) => {
    const isDataValid = Object.values(data).every(
      (value) => value !== undefined && value !== "" && value !== null
    );

    if (!isDataValid) {
      message.error("Mohon isi semua data terlebih dahulu!");
      setCheckForm(true);
    }

    return isDataValid;
  }

  const next = () => {
    // Check form data is filled or not
    if (current === 0 && !checkFilled(patientData)) return
    if (current === 1 && !checkFilled(checkUpData)) return

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
