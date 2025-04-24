"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Define the form schema
const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters."),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must include uppercase, lowercase, number, and special character."
    // ),
    confirmPassword: z.string().min(1, "Current password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ChangePasswordTab = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    toast.loading("Updating password...", { id: "change-password" });
    try {
      console.log(values);
      //! perform the API call to update the password

      toast.success("Password updated successfully!", {
        id: "change-password",
      });
    } catch (error) {
      toast.error("Failed to update password.", { id: "change-password" });
      console.error(error);
    }
  };

  return (
    <section className="grid gap-8">
      <h1>Enter a new password below to change your password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 px-1 max-w-screen-sm"
        >
          {/* Old Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter old password"
                      {...field}
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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

          <p className="text-[#B6B6B6]">
            Strong password required enter minimum 8 characters, <br /> Do not
            include common words or names. <br /> Combine uppercase letters,
            lowercase letters, numbers, and symbols.
          </p>

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isNewPasswordVisible ? "text" : "password"}
                      placeholder="Enter new password"
                      {...field}
                    />
                    <span
                      onClick={() =>
                        setIsNewPasswordVisible(!isNewPasswordVisible)
                      }
                      className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                    >
                      {isNewPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isConfPasswordVisible ? "text" : "password"}
                      placeholder="Enter new password again"
                      {...field}
                    />
                    <span
                      onClick={() =>
                        setIsConfPasswordVisible(!isConfPasswordVisible)
                      }
                      className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                    >
                      {isConfPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div>
            <Button type="submit" className="px-8">
              Save & Change
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ChangePasswordTab;
