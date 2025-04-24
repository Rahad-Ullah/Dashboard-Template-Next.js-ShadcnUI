"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { addUserFormSchema } from "@/schemas/formSchemas/addUserForm";
import { userRoles } from "@/constants/user-roles";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const AddNewUserForm = ({ facilities }) => {
  const [role, setRole] = React.useState("Admin");
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = React.useState<string | null>(
    null
  );

  // 1. Define your form schema.
  const formSchema = addUserFormSchema(role);

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      signature: null,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      company_name: "",
      npi_number: "",
      apt_number: "",
      facility_location: "",
    },
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Submitting...", { id: "add-user" });

    try {
      // Create a FormData object
      const formData = new FormData();

      // Append all form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string | Blob);
        }
      });
      if (role) formData.append("role", role); // append role
      // append signature as image
      if (values.signature) formData.append("image", values.signature);
      formData.delete("signature"); // delete signature to avoid conflict

      //! perform API call to add user

      toast.success("User added successfully!", { id: "add-user" });
      form.reset();
      setImagePreview(null);
      setSignaturePreview(null);
    } catch (error) {
      toast.error("An error occurred while adding the user.", {
        id: "add-user",
      });
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-8 bg-white p-6 rounded-xl h-full">
      <section>
        <h3 className="text-sm font-medium mb-4">User Role</h3>
        <RadioGroup
          defaultValue={role}
          onValueChange={(value) => setRole(value)}
          className="flex flex-col md:flex-row gap-6"
        >
          {userRoles.map((userRole) => (
            <div key={userRole.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={userRole.value}
                id={userRole.value}
                className="size-5"
              />
              <Label htmlFor={userRole.value}>
                {capitalizeSentence(userRole.title)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

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
                    <Input placeholder="John" {...field} />
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
                    <Input placeholder="Doe" {...field} />
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

            {/* password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
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
                    <Input placeholder="1234567890" {...field} />
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

            {/* Company Name Field */}
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Example Company Ltd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NPI Number for only doctor */}
            {role === "Doctor" && (
              <FormField
                control={form.control}
                name="npi_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPI Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="123456789000000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* APT Number for only doctor */}
            {role === "Doctor" && (
              <FormField
                control={form.control}
                name="apt_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>APT Number</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Facility Location for only doctor */}
            {role === "Doctor" && (
              <FormField
                control={form.control}
                name="facility_location"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 mt-0.5">
                    <FormLabel>Facility Location</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? facilities?.find(
                                  (items) => items._id === field.value
                                )?.name
                              : "Select location"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="min-w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search location..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {facilities?.map((item) => (
                                <CommandItem
                                  value={item?._id}
                                  key={item._id}
                                  onSelect={() => {
                                    form.setValue(
                                      "facility_location",
                                      item?._id
                                    );
                                    form.clearErrors("facility_location");
                                  }}
                                >
                                  {item?.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      item?._id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Profile Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </FormControl>
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Image Preview"
                      width={160}
                      height={160}
                      className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Signature image Upload Field */}
            {role === "Doctor" && (
              <FormField
                control={form.control}
                name="signature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Signature</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setSignaturePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    {signaturePreview && (
                      <Image
                        src={signaturePreview}
                        alt="Preview"
                        width={250}
                        height={160}
                        className="mt-2 w-60 h-32 object-cover rounded-md"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* submit button */}
            <div className="col-span-2">
              <Button type="submit" className="md:px-10">
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default AddNewUserForm;
