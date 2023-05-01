import dayjs from "dayjs";
import type { UploadFile } from "antd/es/upload/interface";

export type ChildrenProps = {
    children: React.ReactNode;
}

export type PatientProps = {
    id: string | undefined;
    name: string | undefined;
    gender: boolean | undefined;
    dob: dayjs | undefined;
    address: string | undefined;
    complaint: string | undefined;
}

export type CheckUpProps = {
    result: string | undefined;
    conclusion: string | undefined;
    advice: string | undefined;
    pictures: UploadFile[] | undefined;
    videos: string[] | undefined;
}

export type AnyObjectProps = {
    [key: string]: unknown;
}