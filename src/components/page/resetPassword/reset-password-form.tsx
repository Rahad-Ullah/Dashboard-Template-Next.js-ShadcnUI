"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// zod schema for form validation
const FormSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password not matched",
    path: ["confirmPassword"], // Error will be shown on the confirmPassword field
  });

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("auth");

  // define form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // handle form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    toast.loading("Reseting...", {
      id: "reset-password-toast",
    });
    console.log(values, token);

    try {
      //! perform your api call here...

      toast.success("Reseted successfully", {
        id: "reset-password-toast",
      });
      router.push(`/login`);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-4 md:px-20 md:py-12 shadow-none border-none bg-white/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <figure className="flex justify-center mb-4">
            <Image src={"/logo.png"} alt="logo" width={180} height={100} />
          </figure>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription className="pt-2 text-primary-foreground">
            Please enter your new password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {/* new password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <Label htmlFor="password">New Password</Label>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={`${isPasswordVisible ? "text" : "password"}`}
                            placeholder="Enter password"
                            className="bg-white border-none shadow-none"
                            {...field}
                          />
                          <span
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                            className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                          >
                            {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* confirm new password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <Label htmlFor="conf-password">Confirm Password</Label>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="conf-password"
                            type={`${
                              isConfPasswordVisible ? "text" : "password"
                            }`}
                            placeholder="Enter password"
                            className="bg-white border-none shadow-none"
                            {...field}
                          />
                          <span
                            onClick={() =>
                              setIsConfPasswordVisible(!isConfPasswordVisible)
                            }
                            className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                          >
                            {isConfPasswordVisible ? (
                              <EyeOffIcon />
                            ) : (
                              <EyeIcon />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* submit button */}
                <Button type="submit" className="w-full">
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
