import { TPatient } from "./patient";

export type TBill = {
  id: number;
  report_no: string;
  ordering_provider: string;
  ordering_physician: string;
  bill_date: string;
  bill_amount: number;
  patient: TPatient;
};

export interface IBill {
  _id: string;
  report: {
    _id: string;
    report_no: number;
    patient: {
      _id: string;
      name: string;
    };
    doctor: {
      _id: string;
      name: string;
    };
    facility_location: string;
    ordering_provider: string;
  };
  bill_date: string;
  total_amount: number;
  isBilled: boolean;
}