"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trash, XIcon } from "lucide-react";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import { addBiopsySampleFormSchema } from "@/schemas/formSchemas/addBiopsySampleForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { anatomyPointsData } from "@/constants/anatomyPointsData";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTestFormContext } from "@/contexts/testFormContext";
import toast from "react-hot-toast";

const formSchema = addBiopsySampleFormSchema();

const Step6 = ({ prevStep, resetStep, facility }) => {
  const { formData, setFormData, initialFormData } = useTestFormContext();
  const [sampleSites, setSampleSites] = React.useState<
    { sample_area: string; sample_side: string; specimen_id: string }[]
  >(formData?.biopsy_info);
  const [icd, setIcd] = useState<string[]>(formData?.report_info?.icd);
  const [cpt, setCpt] = useState<string[]>(formData?.report_info?.cpt);
  const router = useRouter();

  // format a unique list of sample area
  const sampleAreas = [
    ...new Set(
      anatomyPointsData.map((item) =>
        JSON.stringify({
          sample_area: item.sample_area,
        })
      )
    ),
  ].map((item) => JSON.parse(item));

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sample_area: "",
      sample_side: "",
      specimen_id: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setSampleSites((prevSites) => {
      // Check if the new value already exists in the array
      const isDuplicate = prevSites.some(
        (site) =>
          site.sample_area === values.sample_area &&
          site.sample_side === values.sample_side
      );
      // If it's not a duplicate, add it to the array
      if (!isDuplicate) {
        form.resetField("specimen_id");
        return [...prevSites, values];
      }
      // Otherwise, return the original array
      toast.error("Sample already added", {
        id: "intake",
      });
      return prevSites;
    });
  }

  // handle delete site
  const handleDeleteSite = (index: number) => {
    setSampleSites((prevSites) => prevSites.filter((_, idx) => idx !== index));
  };

  // handle adding icd
  const handleAddIcd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const icdCode = formData.get("icd")?.toString().trim();

    if (!icdCode) return; // Prevent adding empty ICD codes

    setIcd((prevIcd) => {
      if (!prevIcd.includes(icdCode)) {
        return [...prevIcd, icdCode];
      }
      // Show a toast message if it's a duplicate
      toast.error("ICD code already added", {
        id: "icd-duplicate",
      });
      return prevIcd;
    });
    e.currentTarget.reset();
  };

  // handle adding cpt
  const handleAddCpt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const cptCode = formData.get("cpt")?.toString().trim();

    if (!cptCode) return; // Prevent adding empty ICD codes

    setCpt((prevCpt) => {
      if (!prevCpt.includes(cptCode)) {
        return [...prevCpt, cptCode];
      }
      // Show a toast message if it's a duplicate
      toast.error("CPT code already added", {
        id: "cpt-duplicate",
      });
      return prevCpt;
    });
    e.currentTarget.reset();
  };

  // handle delete icd
  const handleDeleteIcd = (index: number) => {
    setIcd((prevIcd) => prevIcd.filter((_, idx) => idx !== index));
  };

  // handle delete cpt
  const handleDeleteCpt = (index: number) => {
    setCpt((prevCpt) => prevCpt.filter((_, idx) => idx !== index));
  };

  // handle submit the whole form
  const handleSubmit = async () => {
    toast.loading("Submitting...", { id: "intake" });
    const newFormData = {
      ...formData,
      report_info: {
        ...formData?.report_info,
        facility_location: facility?._id || "",
        ordering_provider: facility?.name || "",
        icd: icd,
        cpt: cpt,
      },
      biopsy_info: sampleSites,
    };
    setFormData(newFormData);

    try {
      // perform the API call to submit the data

      toast.success("Submitted successfully", {
        id: "intake",
      });
      resetStep();
      setFormData(initialFormData); // reset the form data
      router.push(`/dashboard/tests`);
    } catch (error) {
      toast.error("Something went wrong", { id: "intake" });
      console.error(error);
    }
  };

  return (
    <div className="grid gap-8">
      {/* Body section */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3 grid gap-6">
          {/* biopsy samples */}
          <div className="bg-muted p-6 rounded-xl">
            <div>
              <ul className="text-zinc-500 grid gap-4 w-full">
                {sampleSites.map((item, idx: number) => (
                  <li key={idx} className="flex flex-wrap justify-between">
                    <p>
                      {idx + 1}. Sample taken from{"  "}
                      <span className="text-primary font-medium">
                        {item.sample_area}{" "}
                      </span>
                      <span className="text-red-500 capitalize">
                        {item.sample_side}{" "}
                      </span>
                      Side
                    </p>
                    <p className="text-sm text-zinc-400 flex items-center gap-4">
                      Specimen Id: {item.specimen_id}
                      <Button
                        onClick={() => handleDeleteSite(idx)}
                        variant={"ghost"}
                        size={"icon"}
                        className="text-destructive"
                      >
                        <Trash />
                      </Button>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {sampleSites.length > 0 && <Separator className="my-6" />}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                {/* area */}
                <FormField
                  control={form.control}
                  name="sample_area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Sample Area</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a sample area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleAreas.map((area) => (
                            <SelectItem
                              key={area.sample_area}
                              value={area.sample_area}
                            >
                              {area.sample_area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* area side */}
                <FormField
                  control={form.control}
                  name="sample_side"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Sample Side</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a side " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key="Left" value="Left">
                            Left
                          </SelectItem>
                          <SelectItem key="Right" value="Right">
                            Right
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* specimen Id */}
                <FormField
                  control={form.control}
                  name="specimen_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specimen Id</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter specimen ID"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* submit button */}
                <Button type="submit">Add Site</Button>
              </form>
            </Form>
          </div>

          <div className="grid gap-4">
            <h3>
              Please remove any of the following that dont apply and add
              whatever you would like{" "}
            </h3>
            {/* ICD codes */}
            <div className="bg-muted p-6 rounded-xl grid gap-4">
              <h1 className="font-medium">ICD&apos;s</h1>
              {icd?.length > 0 && (
                <ul className="flex items-center gap-4 flex-wrap">
                  {icd?.map((item, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 bg-background p-2 rounded-lg w-fit"
                    >
                      <span>{item}</span>
                      <XIcon
                        onClick={() => handleDeleteIcd(idx)}
                        size={20}
                        className="text-red-500/80 hover:text-destructive cursor-pointer"
                      />
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleAddIcd} className="flex gap-4">
                <Input
                  name="icd"
                  placeholder="Enter icd code"
                  className="bg-background"
                  required
                />
                <Button type="submit" className="px-12">
                  Add
                </Button>
              </form>
            </div>
            {/* CPT codes */}
            <div className="bg-muted p-6 rounded-xl grid gap-4">
              <h1 className="font-medium">CPT&apos;s</h1>
              {cpt?.length > 0 && (
                <ul className="flex items-center gap-4 flex-wrap">
                  {cpt?.map((item, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 bg-background p-2 rounded-lg w-fit"
                    >
                      <span>{item}</span>
                      <XIcon
                        onClick={() => handleDeleteCpt(idx)}
                        size={20}
                        className="text-red-500/80 hover:text-destructive cursor-pointer"
                      />
                    </li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleAddCpt} className="flex gap-4">
                <Input
                  name="cpt"
                  placeholder="Enter cpt code"
                  className="bg-background"
                  required
                />
                <Button type="submit" className="px-12">
                  Add
                </Button>
              </form>
            </div>
          </div>
        </section>
        <section className="flex-1">
          <AnatomyWrapper testPoints={sampleSites} />
        </section>
      </div>

      {/* Submit buttons */}
      <section className="flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={handleSubmit} className="md:px-6">
          Submit <ChevronRight />
        </Button>
      </section>
    </div>
  );
};

export default Step6;
