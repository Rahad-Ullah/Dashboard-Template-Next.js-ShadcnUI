"use client";

import { createContext, useContext, useState } from "react";

type TMedicalDiagnosis = {
  name: string;
  type: string;
  isHidden: boolean;
};

// Define the initial form data structure
const initialFormData = {
  name: "",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  suite: "",
  fax: "",
  notificationEmail1: "",
  notificationEmail2: "",
  accountType: "",
  representative: "",
  disorders: [],
  reasons: [] as TMedicalDiagnosis[],
  clinical_symptoms: [],
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
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);

  return (
    <FormContext.Provider
      value={{ formData, setFormData, step, setStep, initialFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook to use form context
export const useFacilityFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFacilityFormContext must be used within a FormProvider"
    );
  }
  return context;
};
