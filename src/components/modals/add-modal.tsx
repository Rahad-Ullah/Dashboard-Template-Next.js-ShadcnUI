"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchResponse } from "@/utils/myFetch";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type TModalProps = {
  action?: (data: {
    option: string;
  }) => Promise<FetchResponse> | void | undefined;
  triggerBtn: React.ReactNode;
  btnVariant?:
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
    | "outline"
    | "default"
    | null
    | undefined;
  title?: string;
  placeholderText?: string;
  btnText?: string;
};

// Define the form schema using zod
const addOptionSchema = z.object({
  option: z.string().min(1, "Option is required"),
});

const AddModal = ({
  triggerBtn,
  action,
  btnVariant = "default",
  title = "Add New Option",
  btnText = "Add Option",
  placeholderText = "Enter option",
}: TModalProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof addOptionSchema>>({
    resolver: zodResolver(addOptionSchema),
  });

  const onSubmit = async (data: { option: string }) => {
    if (action) {
      const res = await action(data); // Call the action callback with the form data
      if (res?.success) {
        reset();
        setOpen(false);
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {triggerBtn}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Input placeholder={placeholderText} {...register("option")} />
            {errors.option && (
              <p className="text-red-500 text-sm mt-1">
                {errors.option.message} {/* Display validation error */}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild onClick={() => setOpen(false)}>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button variant={btnVariant} type="submit">
              {btnText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
