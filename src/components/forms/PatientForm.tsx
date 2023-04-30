/* eslint-disable react-hooks/exhaustive-deps */
import { IPatientData } from "../../@types";
import { DATE_FORMAT } from "../../constants";

import { useGlobalContext } from "../../contexts/Global";

import { AutoLayout } from "../other";

import { Form, Input, Select, DatePicker } from "antd";
import debounce from "lodash.debounce";

const { Item } = Form;
const { TextArea } = Input;

interface IGlobalContext {
  patientData: IPatientData;
  setPatientData: React.Dispatch<React.SetStateAction<IPatientData>>;
}

const PatientForm = () => {
  // Global States
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { patientData, setPatientData } = globalStates;

  // useForm
  const [form] = Form.useForm();

  // onFinish
  const onFinish = (values: unknown) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      name="patient-form"
      onFinish={onFinish}
      initialValues={patientData}
      className="flex flex-col w-full h-full items-start justify-start"
    >
      <AutoLayout>
        {/* Patient name */}
        <Item
          name="name"
          rules={[{ required: true, message: "Mohon isikan nama pasien" }]}
          className="w-full"
        >
          <Input
            placeholder="Nama Pasien"
            className="w-full"
            onChange={debounce(
              (e) => setPatientData({ ...patientData, name: e.target.value }),
              500
            )}
          />
        </Item>

        {/* Patient sex */}
        <Item
          name="gender"
          rules={[{ required: true, message: "Mohon isikan jenis kelamin" }]}
          className="w-full"
        >
          <Select
            placeholder="Jenis Kelamin"
            className="w-full"
            onChange={debounce(
              (value) => setPatientData({ ...patientData, gender: value }),
              500
            )}
            options={[
              { value: true, label: "Laki-laki" },
              { value: false, label: "Perempuan" },
            ]}
          />
        </Item>

        {/* Patient dob */}
        <Item
          name="dob"
          rules={[{ required: true, message: "Mohon isikan tanggal lahir" }]}
          className="w-full"
        >
          <DatePicker
            placeholder="Tanggal Lahir"
            format={DATE_FORMAT}
            onChange={debounce(
              (date) => setPatientData({ ...patientData, dob: date }),
              500
            )}
            className="w-full rounded-xl"
          />
        </Item>
      </AutoLayout>

      <AutoLayout>
        {/* Patient address */}
        <Item
          name="address"
          rules={[{ required: true, message: "Mohon isikan alamat pasien" }]}
          className="w-full"
        >
          <Input
            placeholder="Alamat Pasien"
            onChange={debounce(
              (e) =>
                setPatientData({ ...patientData, address: e.target.value }),
              500
            )}
            className="w-full"
          />
        </Item>
      </AutoLayout>

      <AutoLayout>
        {/* Patient disease complaint */}
        <Item
          name="complaint"
          rules={[{ required: true, message: "Mohon isikan keluhan penyakit" }]}
          className="w-full"
        >
          <TextArea
            placeholder="Keluhan Pasien"
            autoSize={{ minRows: 4, maxRows: 8 }}
            onChange={debounce(
              (e) =>
                setPatientData({ ...patientData, complaint: e.target.value }),
              500
            )}
            className="w-full"
          />
        </Item>
      </AutoLayout>
    </Form>
  );
};

export default PatientForm;
