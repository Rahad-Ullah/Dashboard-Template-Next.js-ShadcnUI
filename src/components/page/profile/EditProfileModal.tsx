"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editUserFormSchema } from "@/schemas/formSchemas/editUserForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { TUser } from "@/types/user";
import toast from "react-hot-toast";
import { facilitiesData } from "@/demoData/facilities";

const EditProfileModal = ({ user }: { user: TUser }) => {
  const [file, setFile] = useState<File | string | null>(user.image);

  // 1. Define your form schema.
  const formSchema = editUserFormSchema();

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
      company_name: user?.company_name,
      address: user?.address || "",
      npi_number: user?.npi_number?.toString() || "",
      apt_number: user?.apt_number?.toString() || "",
      facility_location: user?.facility_location || "",
    },
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Updating...", {
      id: "update-profile",
    });
    console.log(values, file);

    try {
      // perform the API call to update the user profile

      toast.error("Failed to update profile", {
        id: "update-profile",
      });
    } catch (error) {
      toast.error("Failed to update", {
        id: "update-profile",
      });
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="shadow-lg text-primary">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80vw] h-[90vh] overflow-scroll grid gap-6">
        <DialogHeader>
          <DialogTitle className="text-primary font-medium text-xl">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Label>Upload Profile Image</Label>
          <ImageUpload setFile={setFile} user={user} />
        </div>
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

              {/* Company Field */}
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Example Limited" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NPI Number for only doctor */}
              {user?.npi_number && (
                <FormField
                  control={form.control}
                  name="npi_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NPI Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* APT Number for only doctor */}
              {user?.apt_number && (
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

              {/* facility location */}
              {user?.facility_location && (
                <FormField
                  control={form.control}
                  name="facility_location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 mt-0.5 col-span-2">
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
                                ? facilitiesData?.data.find(
                                    (items) => items.address === field.value
                                  )?.address
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
                                {facilitiesData?.data.map((item, idx) => (
                                  <CommandItem
                                    value={item.address}
                                    key={idx}
                                    onSelect={() => {
                                      form.setValue(
                                        "facility_location",
                                        item.address
                                      );
                                      form.clearErrors("facility_location");
                                    }}
                                  >
                                    {item.address}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        item.address === field.value
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

              {/* submit button */}
              <DialogFooter className="col-span-2">
                <Button type="submit" className="md:px-16">
                  Save & Change
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
