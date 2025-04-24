"use client";

import { Button } from "@/components/ui/button";
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
import { useTestFormContext } from "@/contexts/testFormContext";
import { addTestFormSchema } from "@/schemas/formSchemas/addTestForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import TagInput from "@/components/shared/tag-input";
import { ethnicityData } from "@/constants/ethnicityData";

const Step1 = ({ nextStep, doctors, insurances }) => {
  const formContext = useTestFormContext();

  // get the form data from from context
  const { formData, setFormData } = formContext;

  // 1. Define your form schema.
  const formSchema = addTestFormSchema();

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData?.patient_info,
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData({ ...formData, patient_info: values });
    nextStep();
  }

  return (
    <div className="grid gap-8">
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 lg:space-y-0 lg:grid gap-6"
          >
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Patient last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="me@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Road City State " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* APT Field */}
            <FormField
              control={form.control}
              name="aptNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>APT Number</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of birth */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Select a date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Insurance Field */}
            <FormField
              control={form.control}
              name="insuranceCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Company</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a insurance company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {insurances?.map((insurance, idx: number) => (
                        <SelectItem key={idx} value={insurance?.name}>
                          {insurance?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Member Id Field */}
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reasons for Visit Input */}
            <FormField
              control={form.control}
              name="reasonsForVisit" // The name of the form field
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason(s) for visit</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Type and press Enter to add"
                      value={field.value} // Pass the value from form field
                      onChange={field.onChange} // Pass onChange to update the form state
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sensory Symptoms Input */}
            <FormField
              control={form.control}
              name="sensorySymptoms" // The name of the form field
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sensory Symptoms</FormLabel>
                  <FormControl>
                    <TagInput
                      placeholder="Type and press Enter to add"
                      value={field.value} // Pass the value from form field
                      onChange={field.onChange} // Pass onChange to update the form state
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ethnicity */}
            <FormField
              control={form.control}
              name="ethnicity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ethnicity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a ethnicity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ethnicityData?.map((item, idx) => (
                        <SelectItem key={idx} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ordering Physician */}
            <FormField
              control={form.control}
              name="orderingPhysician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordering Physician</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a physician" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map((doctor, idx) => (
                        <SelectItem key={idx} value={doctor?._id}>
                          {doctor?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* submit button */}
            <div className="col-span-2 flex justify-end gap-4">
              <Button type="submit" className="md:px-6">
                Next <ChevronRight />
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default Step1;
