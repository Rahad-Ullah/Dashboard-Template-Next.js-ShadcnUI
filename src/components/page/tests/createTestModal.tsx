"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTestFormContext } from "@/contexts/testFormContext";
import { IFacility } from "@/types/facility";

const CreateTestModal = ({ facilities }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [facility, setFacility] = useState<IFacility | null>(null);
  const { formData, setFormData } = useTestFormContext();

  // set here default facilicy for quick intake
  const defaultFacility = facilities[0];

  const nextStep = () => setStep(step + 1);
  const resetStep = () => setStep(1);

  // handle confirmation
  const handleConfirm = () => {
    setFormData({
      ...formData,
      report_info: {
        ...formData?.report_info,
        facility_location: facility?._id as string,
        ordering_provider: facility?.name as string,
      },
    });
    setOpen(false);
    resetStep();
    router.push(
      `/dashboard/tests/add-new-test/${facility?._id || defaultFacility?._id}`
    );
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button variant={"default"}>
          <FilePlus /> Intake
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8">
        {step === 1 && (
          <div className="grid gap-8">
            <DialogHeader>
              <DialogTitle>Would you like to start a new intake?</DialogTitle>
            </DialogHeader>
            <DialogFooter className="flex-row gap-6">
              <DialogClose asChild onClick={() => setOpen(false)}>
                <Button variant={"outline"} className="w-full">
                  No
                </Button>
              </DialogClose>
              <Button
                variant={"default"}
                type="submit"
                onClick={nextStep}
                className="w-full"
              >
                Yes
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && (
          <div>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <div className="space-y-6">
                <Button
                  variant={"default"}
                  onClick={nextStep}
                  className="w-full"
                >
                  Full Intake (Recommended)
                </Button>
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/tests/add-new-test/${
                        facility?._id || defaultFacility?._id
                      }`
                    )
                  }
                  variant={"outline"}
                  className="w-full"
                >
                  Quick Intake
                </Button>
                <DialogClose
                  asChild
                  onClick={() => {
                    setOpen(false);
                    resetStep();
                  }}
                >
                  <Button variant={"outline"} className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-6">
            <DialogHeader>
              <DialogTitle>Available facility in the system.</DialogTitle>
            </DialogHeader>
            <div>
              <Select
                onValueChange={(value) =>
                  setFacility(value as unknown as IFacility)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a facility" />
                </SelectTrigger>
                <SelectContent>
                  {facilities?.length > 0 ? (
                    facilities?.map((item, idx: number) => (
                      <SelectItem key={idx} value={item}>
                        {item?.name}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500 py-2 text-center">
                      No data found
                    </p>
                  )}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="flex !flex-col !space-x-0 gap-4">
              <Button onClick={handleConfirm} className="w-full">
                Confirm
              </Button>
              <DialogClose
                asChild
                onClick={() => {
                  setOpen(false);
                  resetStep();
                }}
              >
                <Button variant={"outline"} className="w-full">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestModal;
