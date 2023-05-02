/* eslint-disable react-hooks/exhaustive-deps */
import { CheckUpProps } from "../../@types";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../contexts/Global";

import { AutoLayout } from "../other";
import { UploadPictures, UploadVideos } from "./uploads";
import { TakePicture, TakeVideo } from "../modals";
import { Form, Input } from "antd";

import debounce from "lodash.debounce";

const { Item } = Form;
const { TextArea } = Input;

interface IGlobalContext {
  checkUpData: CheckUpProps;
  setCheckUpData: React.Dispatch<React.SetStateAction<CheckUpProps>>;
}

interface ICheckUpForm {
  checkForm: boolean;
  setCheckForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckUpForm = (props: ICheckUpForm) => {
  // Props destructuring
  const { checkForm, setCheckForm } = props;

  // Global states
  const { globalStates } = useGlobalContext() as {
    globalStates: IGlobalContext;
  };
  const { checkUpData, setCheckUpData } = globalStates;

  // useForm
  const [form] = Form.useForm();

  // Initially set video data
  useEffect(() => {
    setCheckUpData({ ...checkUpData, videos: [] });
  }, []);

  // Monitor checkForm
  useEffect(() => {
    if (checkForm) {
      form.validateFields().then(() => {
        setCheckForm(false);
      });
    }
  }, [checkForm]);
  return (
    <Form
      form={form}
      initialValues={checkUpData}
      name="checkup-form"
      className="flex flex-col space-y-2 w-full h-full items-start justify-start"
    >
      {/* Result */}
      <Item
        name="result"
        rules={[{ required: true, message: "Mohon isi hasil pemeriksaan!" }]}
        className="w-full"
      >
        <TextArea
          placeholder="Hasil pemeriksaan"
          autoSize={{ minRows: 3, maxRows: 5 }}
          onChange={debounce((e) => {
            setCheckUpData({ ...checkUpData, result: e.target.value });
          }, 500)}
          className="w-full"
        />
      </Item>

      <AutoLayout>
        {/* Conclusion */}
        <Item
          name="conclusion"
          rules={[{ required: true, message: "Mohon isi kesimpulan!" }]}
          className="w-full"
        >
          <TextArea
            placeholder="Kesimpulan"
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={debounce((e) => {
              setCheckUpData({ ...checkUpData, conclusion: e.target.value });
            }, 500)}
            className="w-full"
          />
        </Item>

        {/* Advice */}
        <Item
          name="advice"
          rules={[{ required: true, message: "Mohon isi saran!" }]}
          className="w-full"
        >
          <TextArea
            placeholder="Saran"
            autoSize={{ minRows: 3, maxRows: 5 }}
            onChange={debounce((e) => {
              setCheckUpData({ ...checkUpData, advice: e.target.value });
            }, 500)}
            className="w-full"
          />
        </Item>
      </AutoLayout>

      <AutoLayout>
        <div className="flex flex-col space-y-3 w-full h-full bg-white rounded-xl p-3 border-[1px]">
          {/* Pictures */}
          <TakePicture />
          <UploadPictures />
        </div>

        <div className="flex flex-col space-y-3 w-full h-full bg-white rounded-xl p-3 border-[1px]">
          {/* Videos */}
          <TakeVideo />
          <UploadVideos />
        </div>
      </AutoLayout>
    </Form>
  );
};

export default CheckUpForm;
