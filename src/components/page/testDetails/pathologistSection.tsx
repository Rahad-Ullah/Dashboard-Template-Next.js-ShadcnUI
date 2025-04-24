"use client";

import { Button } from "@/components/ui/button";
import GraySection from "./grayPortion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Define the form schema using zod
const pathologistSchema = z.object({
  finalDiagnosis: z.array(
    z.object({
      sampleId: z.string(),
      diagnosis: z.string().min(1, "Diagnosis is required."),
    })
  ),
  microscopicExamination: z.array(
    z.object({
      sampleId: z.string(),
      examination: z.string().min(1, "Examination is required."),
    })
  ),
  grossDescription: z.array(
    z.object({
      sampleId: z.string(),
      description: z.string().min(1, "Description is required."),
    })
  ),
  comments: z.array(
    z.object({
      sampleId: z.string(),
      comment: z.string().optional(),
    })
  ),
  biopsiesDemonstrate: z.string().min(1, "This field is required."),
  nerveFiberDensity: z.string().min(1, "This field is required."),
  neuropathyType: z.string().min(1, "Please select a neuropathy type."),
});

const PathologistSection = ({ test }) => {
  const form = useForm<z.infer<typeof pathologistSchema>>({
    resolver: zodResolver(pathologistSchema),
    defaultValues: {
      finalDiagnosis: test?.biopsy_sample?.map((sample) => ({
        sampleId: sample._id,
        cannedDx: sample?.microscopic_diagnosis?.canned_dx || "",
        diagnosis: sample?.microscopic_diagnosis?.description || "",
      })),
      microscopicExamination: test?.biopsy_sample?.map((sample) => ({
        sampleId: sample._id,
        examination: sample?.microscopic_examination || "",
      })),
      grossDescription: test?.biopsy_sample?.map((sample) => ({
        sampleId: sample._id,
        description: sample?.gross_description || "",
      })),
      comments: test?.biopsy_sample?.map((sample) => ({
        sampleId: sample._id,
        comment: sample?.comment || "",
      })),
      biopsiesDemonstrate:
        String(test?.additional_biopsies_details?.biopsies_demonstrate) || "",
      nerveFiberDensity:
        test?.additional_biopsies_details?.nerve_fibber_density_consistent ||
        "",
      neuropathyType: test?.additional_biopsies_details?.neuropathy || "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof pathologistSchema>) => {
    toast.loading("Submitting...", { id: "update-boipsy-sample-taost" });
    try {
      console.log(values);
      // perform your API call here...

      toast.success("Biopsy updated successfully!", {
        id: "update-boipsy-sample-taost",
      });
    } catch (error) {
      toast.error("An error occurred while submitting data.", {
        id: "update-boipsy-sample-taost",
      });
      console.error(error);
    }
  };

  return (
    <section className="grid gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-medium text-primary">
            Pathologist Section:
          </h1>

          {/* Final Microscopic Diagnosis */}
          <GraySection>
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h1 className="text-xl font-medium">
                Final Microscopic Diagnosis:
              </h1>
              <p className="flex flex-wrap gap-2 text-sm text-zinc-400">
                Normal &gt; 9 Borderline 7.2-8.9 Mild 3.9-7.1 Moderate 2.1-3.8
                Severe 0-2
              </p>
            </div>

            {test?.biopsy_sample?.map((item, idx) => (
              <div key={idx} className="grid gap-5">
                <div className="flex flex-wrap justify-between items-center gap-2 px-1">
                  <p>
                    {idx + 1}. Sample taken from{" "}
                    <span className="text-primary font-medium">
                      {item?.sample_area}
                    </span>{" "}
                    <span className="text-red-500 capitalize">
                      {item?.sample_side}
                    </span>{" "}
                    Side
                  </p>
                  <p className="text-sm text-zinc-400">
                    Specimen Id: {item.specimen_id}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name={`finalDiagnosis.${idx}.diagnosis`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnosis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={"Write diagnosis here..."}
                          className="bg-white"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </GraySection>

          {/* Microscopic Examination */}
          <GraySection>
            <div className="">
              <h1 className="text-xl font-medium">Microscopic Examination:</h1>
            </div>

            {test?.biopsy_sample?.map((item, idx) => (
              <div key={idx} className="grid gap-5">
                <div className="flex flex-wrap justify-between items-center gap-2 px-1">
                  <p>
                    {idx + 1}. Sample taken from{" "}
                    <span className="text-primary font-medium">
                      {item?.sample_area}
                    </span>{" "}
                    <span className="text-red-500 capitalize">
                      {item?.sample_side}
                    </span>{" "}
                    Side
                  </p>
                  <p className="text-sm text-zinc-400">
                    Specimen Id: {item.specimen_id}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name={`microscopicExamination.${idx}.examination`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Examination</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={"Write examination here..."}
                          className="bg-white"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </GraySection>

          {/* Gross Description */}
          <GraySection>
            <div className="">
              <h1 className="text-xl font-medium">Gross Description:</h1>
            </div>

            {test?.biopsy_sample?.map((item, idx) => (
              <div key={idx} className="grid gap-5">
                <div className="flex flex-wrap justify-between items-center gap-2 px-1">
                  <p>
                    {idx + 1}. Sample taken from{" "}
                    <span className="text-primary font-medium">
                      {item?.sample_area}
                    </span>{" "}
                    <span className="text-red-500 capitalize">
                      {item?.sample_side}
                    </span>{" "}
                    Side
                  </p>
                  <p className="text-sm text-zinc-400">
                    Specimen Id: {item.specimen_id}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name={`grossDescription.${idx}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={"Write description here..."}
                          className="bg-white"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </GraySection>

          {/* Comments */}
          <GraySection>
            <div className="">
              <h1 className="text-xl font-medium">Comment</h1>
            </div>

            {test?.biopsy_sample?.map((item, idx) => (
              <div key={idx} className="grid gap-5">
                <div className="flex flex-wrap justify-between items-center gap-2 px-1">
                  <p>
                    {idx + 1}. Sample taken from{" "}
                    <span className="text-primary font-medium">
                      {item?.sample_area}
                    </span>{" "}
                    <span className="text-red-500 capitalize">
                      {item?.sample_side}
                    </span>{" "}
                    Side
                  </p>
                  <p className="text-sm text-zinc-400">
                    Specimen Id: {item.specimen_id}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name={`comments.${idx}.comment`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={"Write comment here..."}
                          className="bg-white"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </GraySection>

          {/* Fill out the following */}
          <GraySection>
            <div className="">
              <h1 className="text-xl font-medium">Fill out the following</h1>
            </div>
            <FormField
              control={form.control}
              name="biopsiesDemonstrate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>The biopsies demonstrate</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Number of fibers"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nerveFiberDensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nerve fiber density consistent with</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Choose one of the following" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Option 1">Option 1</SelectItem>
                      <SelectItem value="Option 2">Option 2</SelectItem>
                      <SelectItem value="Option 3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neuropathyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuropathy Type</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Length - dependent neuropathy"
                        id="Length - dependent neuropathy"
                        className="size-5"
                      />
                      <Label htmlFor="Length - dependent neuropathy">
                        Length - dependent neuropathy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Non length - dependent neuropathy"
                        id="Non length - dependent neuropathy"
                        className="size-5"
                      />
                      <Label htmlFor="Non length - dependent neuropathy">
                        Non length - dependent neuropathy
                      </Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid justify-end">
              <Button type="submit" className="px-16">
                Confirm
              </Button>
            </div>
          </GraySection>
        </form>
      </Form>
    </section>
  );
};

export default PathologistSection;
