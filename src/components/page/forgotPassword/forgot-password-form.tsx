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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BackButton from "@/components/shared/back-button";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toast.loading("Sending...", {
      id: "forgot-password-toast",
    });
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
    };
    console.log(payload);

    try {
      //! perform your api call here...

      toast.success("OTP sent to your email", { id: "forgot-password-toast" });
      router.push(`/otp-verify?email=${payload.email}`);
    } catch (error: unknown) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-4 md:px-20 md:py-12 shadow-none border-none bg-white/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <span className="absolute left-4 top-4">
            <BackButton />
          </span>
          <figure className="flex justify-center pb-4">
            <Image src={"/logo.png"} alt="logo" width={180} height={100} />
          </figure>
          <CardTitle className="text-2xl">Forgot password ?</CardTitle>
          <CardDescription className="pt-2 text-primary-foreground">
            Please enter your email for verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {/* email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="me@example.com"
                    required
                    className="bg-white border-none shadow-none"
                  />
                </div>
                {/* submit button */}
                <Button type="submit" className="w-full">
                  Send Code
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
