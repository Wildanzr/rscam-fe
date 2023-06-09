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
    _id: string;
    _rev: string;
    id: string;
    name: string;
    gender: boolean;
    dob: dayjs | undefined;
    address: string;
    complaint: string;
    result: string;
    conclusion: string;
    advice: string;
    pictures: string[];
    videos: string[];
    at: dayjs | Date;
}

export type AttachmentProps = {
    [key: string]: {
        content_type: string;
        data: string;
    }
}

type AttachmentData = string | Blob | Buffer;

interface FullAttachment {
    content_type: string;
    digest?: string | undefined;
    data: AttachmentData;
}

interface StubAttachment {
    content_type: string;
    digest: string;
    stub: true;
    length: number;
}

export type Attachment = StubAttachment | FullAttachment;

export type Attachments = {
    [attachmentId: string]: Attachment;
}