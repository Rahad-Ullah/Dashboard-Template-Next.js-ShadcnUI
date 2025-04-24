"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NotepadText } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Define the form schema using zod
const noteSchema = z.object({
  note: z.string().optional(),
});

const NoteSection = ({ testId, note }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      note: note || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof noteSchema>) => {
    toast.loading("Saving note...", { id: "save-note" });
    try {
      // perform your API call here...

      console.log(values, testId);
      toast.success("Note added successfully!", { id: "save-note" });
    } catch (error) {
      toast.error("An error occurred while saving the note.", {
        id: "save-note",
      });
      console.error(error);
    }
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-medium text-primary">Note:</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="ml-1">
          <Textarea
            rows={8}
            placeholder="Write note here..."
            {...register("note")}
          />
          {errors.note && (
            <p className="text-red-500 text-sm mt-1">{errors.note.message}</p>
          )}
        </div>
        <div className="grid justify-end">
          <Button type="submit">
            <NotepadText /> Save Note
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteSection;
