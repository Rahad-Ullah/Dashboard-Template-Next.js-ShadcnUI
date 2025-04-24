import { z } from "zod";

// zod validation schema for add user form
export const editUserFormSchema = () => {
  return z.object({
    firstname: z
      .string()
      .min(2, {
        message: "Must be at least 2 characters.",
      })
      .optional(),
    lastname: z
      .string()
      .min(2, {
        message: "Must be at least 2 characters.",
      })
      .optional(),
    email: z
      .string()
      .email()
      .min(1, {
        message: "Must be a valid email address.",
      })
      .optional(),
    phone: z
      .string()
      .min(10)
      .max(14, {
        message: "Must be a valid phone number.",
      })
      .optional(),
    address: z
      .string()
      .min(3, {
        message: "Must be at least 3 characters.",
      })
      .optional(),
    company_name: z.string().optional(),
    npi_number: z.string().optional(),
    apt_number: z.string().optional(),
    facility_location: z.string().optional(),
  });
};
