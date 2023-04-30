import dayjs from "dayjs";

export type ChildrenProps = {
    children: React.ReactNode;
}

export type IPatientData = {
    id: string | undefined;
    name: string | undefined;
    gender: boolean | undefined;
    dob: dayjs | undefined;
    address: string | undefined;
    complaint: string | undefined;
}