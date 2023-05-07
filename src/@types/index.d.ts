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
    videos: UploadFile[] | undefined;
}

export type AnyObjectProps = {
    [key: string]: unknown;
}

export type VideoConstaintsProps = {
    width: number;
    height: number;
    facingMode: string;
    deviceId?: string;
}

export type ReportProps = {
    id: string | undefined;
    name: string | undefined;
    gender: boolean | undefined;
    dob: string | undefined;
    address: string | undefined;
    complaint: string | undefined;
    result: string | undefined;
    conclusion: string | undefined;
    advice: string | undefined;
    pictures: string[] | undefined;
    videos: string[] | undefined;
}