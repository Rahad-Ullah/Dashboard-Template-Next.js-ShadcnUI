"use client";

import { createContext, useContext, useState } from "react";

interface IDiease {
  name: string;
  disorders: {
    name: string;
  }[];
}
interface IDiagnosis {
  content: string;
  type: string;
}
interface IClinicalSymptom {
  title: string;
  disorders: {
    name: string;
    sides: string[];
  }[];
}

interface IBiopsySample {
  sample_area: string;
  sample_side: string;
  specimen_id: string;
}

// Define the initial form data structure
const initialFormData = {
  patient_info: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    aptNumber: "",
    gender: "",
    dateOfBirth: "",
    insuranceCompany: "",
    memberId: "",
    reasonsForVisit: [] as string[],
    sensorySymptoms: [] as string[],
    ethnicity: "",
    orderingPhysician: "",
  },
  report_info: {
    dieases: [] as IDiease[],
    medical_terms: [] as IDiagnosis[],
    clinical_symptoms: [] as IClinicalSymptom[],
    facility_location: "",
    ordering_provider: "",
    icd: [] as string[],
    cpt: [] as string[],
  },
  biopsy_info: [] as IBiopsySample[],
};

// Define the form context type
interface FormContextType {
  formData: typeof initialFormData;
  initialFormData: typeof initialFormData;
  setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

// Create context
const FormContext = createContext<FormContextType | null>(null);

// Create Provider Component
export const TestFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);

  // console.log(formData);

  return (
    <FormContext.Provider
      value={{ formData, setFormData, step, setStep, initialFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook to use form context
export const useTestFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a TestFormProvider");
  }
  return context;
};
