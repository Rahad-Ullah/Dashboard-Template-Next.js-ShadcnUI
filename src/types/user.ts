export type TUser = {
  _id: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  status: string;
  address: string;
  company_name: string;
  signature: string;
  facility_location: string;
  npi_number: number;
  apt_number: number;
  isLocked: boolean;
  verified: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string;
  id: number;
};

export interface IUser {
  _id: string;
  id: number;
  role: "Admin" | "Representative" | "Pathologist" | "Histologist";
  email: string;
  phone: string;
  image: string;
  isLocked: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string;
  address: string;
}