import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// zod validation schema for add user form
export const addUserFormSchema = (role: string) => {
  return z
    .object({
      image: z
        .any()
        .refine((file) => file, "Image is required.") // Required
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
      signature: z
        .any()
        .optional()
        .transform((file) => (file === null ? "" : file)) // Convert null to empty string
        .refine(
          (file) => !file || file?.size <= MAX_FILE_SIZE,
          "Max image size is 5MB."
        )
        .refine(
          (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png, and .webp formats are supported."
        ),
      firstname: z.string().min(2, {
        message: "Must be at least 2 characters.",
      }),
      lastname: z.string().min(2, {
        message: "Must be at least 2 characters.",
      }),
      email: z.string().email().min(1, {
        message: "Must be a valid email address.",
      }),
      password: z.string().min(8, {
        message: "Must be at least 8 digit.",
      }),
      phone: z.string().min(10).max(14, {
        message: "Must be a valid phone number.",
      }),
      address: z.string().min(3, {
        message: "Must be at least 3 characters.",
      }),
      company_name: z.string().min(3, {
        message: "Must be at least 3 characters.",
      }),
      npi_number: z.string().optional(), // Optional by default for non-doctors
      apt_number: z.string().optional(), // Optional by default for non-doctors
      facility_location: z.string().optional(), // Optional by default for non-doctors
    })
    .superRefine((data, ctx) => {
      if (role === "Doctor") {
        // Validate NPI number for doctors
        if (!data.npi_number || data.npi_number.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["npi_number"],
            message: "Must be a valid NPI number.",
          });
        } else if (data.npi_number.length < 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            path: ["npi_number"],
            message: "Must be at least 5 characters.",
            type: "string",
            minimum: 5,
            inclusive: true,
          });
        }

        // Validate ATP number for doctors
        if (!data.apt_number || data.apt_number.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["apt_number"],
            message: "Must be a valid APT number.",
          });
        } else if (data.apt_number.length < 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            path: ["apt_number"],
            message: "Must be at least 5 characters.",
            type: "string",
            minimum: 5,
            inclusive: true,
          });
        }

        // Validate Facility Location for doctors
        if (!data.facility_location || data.facility_location.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["facility_location"],
            message: "Must select a location.",
          });
        }

        // Validate Signature for doctors
        if (!data.signature || data.signature === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["signature"],
            message: "Signature is required.",
          });
        }
      }
    });
};
