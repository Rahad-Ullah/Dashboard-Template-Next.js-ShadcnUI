import { z } from "zod";

// zod validation schema for add user form
export const addTestFormSchema = () => {
  return z.object({
    firstname: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    lastname: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    email: z.string().email().min(1, {
      message: "Must be a valid email address.",
    }),
    phone: z.string().min(10).max(14, {
      message: "Must be a valid phone number.",
    }),
    address: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    aptNumber: z.string().min(5, {
      message: "Must be at least 5 digits.",
    }),
    gender: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    dateOfBirth: z.string().min(1, {
      message: "Must be a valid date.",
    }),
    insuranceCompany: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    memberId: z.string().min(5, {
      message: "Must be at least 5 digits.",
    }),
    reasonsForVisit: z
      .array(z.string())
      .min(1, { message: "At least one reason is required" }),
    sensorySymptoms: z
      .array(z.string())
      .min(1, { message: "At least one symptom is required" }),
    ethnicity: z.string().min(1, {
      message: "Must be select at least 1 options.",
    }),
    orderingPhysician: z.string().min(1, {
      message: "Must be select at least 1 options.",
    }),
  });
};
