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
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import toast from "react-hot-toast";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { myFetch } from "@/utils/myFetch";

const FormSchema = z.object({
  oneTimeCode: z.string().min(5, {
    message: "Your one-time password must be 5 digits.",
  }),
});
export function OtpVerifyForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oneTimeCode: "",
    },
  });

  if (!email) {
    redirect("/forgot-password");
  }

  // handle form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    toast.loading("Verifying...", {
      id: "verify-otp-toast",
    });

    const payload = {
      oneTimeCode: Number(values.oneTimeCode),
      email,
    };
    console.log(payload);

    try {
      //! perform your api call here...

      toast.success("OTP verified successfully", { id: "verify-otp-toast" });
      router.push(`/reset-password?auth=demoAuthToken`);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // handle resend otp
  const handleResend = async () => {
    toast.loading("Sending...", {
      id: "resend-otp-toast",
    });
    try {
      const res = await myFetch("/auth/forget-password", {
        method: "POST",
        body: { email },
      });

      if (res?.success) {
        toast.success(res?.message as string, { id: "resend-otp-toast" });
      } else {
        toast.error(res?.message || "Failed to resend", {
          id: "resend-otp-toast",
        });
      }
    } catch (error: unknown) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-4 md:px-20 md:py-12 shadow-none border-none bg-white/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <figure className="flex justify-center pb-4">
            <Image src={"/logo.png"} alt="logo" width={180} height={100} />
          </figure>
          <CardTitle className="text-2xl">Verification code</CardTitle>
          <CardDescription className="pt-2 text-primary-foreground">
            We sent a reset link to <strong>{email}</strong>. Enter 5 digit code
            that is mentioned in the email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  {/* email */}
                  <div className="grid gap-2 mt-2">
                    <FormField
                      control={form.control}
                      name="oneTimeCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP
                              maxLength={5}
                              pattern={REGEXP_ONLY_DIGITS}
                              {...field}
                            >
                              <InputOTPGroup className="w-full justify-center gap-2 md:gap-6">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* submit button */}
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </div>
              </form>
            </Form>
            {/* link to sign up */}
            <div className="text-center text-sm mt-6">
              You have not received the email?{" "}
              <span
                onClick={handleResend}
                className="font-medium text-primary-foreground hover:underline underline-offset-4"
              >
                Resend
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
