export interface ICheckup {
    _id?: string;
    _rev?: string;
    name: string;
    gender: boolean;
    dob: Date;
    address: string;
    complaint: string;
    result: string;
    conclusion: string;
    advice: string;
    pictures: string[];
    videos: string[];
  }