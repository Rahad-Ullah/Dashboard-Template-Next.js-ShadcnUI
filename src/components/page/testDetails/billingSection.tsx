"use client";

import { Input } from "@/components/ui/input";
import GraySection from "./grayPortion";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Define the form schema using zod
const billingSchema = z.object({
  bill_date: z.string().min(1, "Bill date is required."),
  total_amount: z
    .number({ message: "Must be positive number" })
    .min(1, "Bill amount must be greater than 0.")
    .refine((value) => value > 0, { message: "Bill amount must be positive." }),
});

const BillingSection = ({ bill }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof billingSchema>>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      bill_date: bill?.bill_date
        ? new Date(bill?.bill_date).toISOString().split("T")[0]
        : "", // Format the date as YYYY-MM-DD
      total_amount: bill?.total_amount || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof billingSchema>) => {
    toast.loading("Sending to billing...", { id: "send-billing" });
    try {
      // perform your API call here...

      console.log(values);
      toast.success("Billing information sent successfully!", {
        id: "send-billing",
      });
    } catch (error) {
      toast.error("An error occurred while sending billing information.", {
        id: "send-billing",
      });
      console.error(error);
    }
  };

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-medium text-primary">Billing:</h1>
      <GraySection>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Input
              type="date"
              placeholder="Bill Date"
              className="bg-background"
              {...register("bill_date")}
            />
            {errors.bill_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bill_date.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="number"
              placeholder="Bill Amount"
              className="bg-background"
              {...register("total_amount", { valueAsNumber: true })}
            />
            {errors.total_amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.total_amount.message}
              </p>
            )}
          </div>
          <div className="grid justify-end">
            <Button type="submit" variant={"destructive"} className="px-10">
              Send to Billing
            </Button>
          </div>
        </form>
      </GraySection>
    </div>
  );
};

export default BillingSection;
