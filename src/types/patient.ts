export type TPatient = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  apt_number: string;
  gender: string;
  date_of_birth: string;
  insurance_company: string;
  member_id: string;
  reasons: string[];
  sensory_symptoms: string[];
  ethnicity: string;
};

export interface IPatient {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  insuranceCompany: string;
}
