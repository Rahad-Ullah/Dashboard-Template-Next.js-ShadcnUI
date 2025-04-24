import { z } from "zod";

// zod validation schema for add user form
export const addBiopsySampleFormSchema = () => {
  return z.object({
    sample_area: z.string().min(1, {
      message: "Must be select 1 sample area.",
    }),
    sample_side: z.string().min(1, {
      message: "Must be select 1 option.",
    }),
    specimen_id: z.string().min(5, {
      message: "Must be at least 5 digits.",
    }),
  });
};
