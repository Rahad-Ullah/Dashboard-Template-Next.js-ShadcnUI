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
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const redirect = useSearchParams().get("redirect");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toast.loading("Logging in...", {
      id: "login",
    });
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(payload);

    try {
      //! perform your api call here..

      toast.success("Login successful", { id: "login" });
      router.push(redirect || "/dashboard/tests");
    } catch (error: unknown) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-4 md:px-20 shadow-none border-none bg-white/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <figure className="flex justify-center mb-4">
            <Image src={"/logo.png"} alt="logo" width={180} height={100} />
          </figure>
          <CardTitle className="text-2xl">Log in to your account</CardTitle>
          <CardDescription className="pt-2 text-primary-foreground">
            Please enter your email and password to continue
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
                {/* password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter password"
                      required
                      className="bg-white border-none shadow-none"
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                    >
                      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>
                {/* remember checkbox */}
                <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="size-5" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember Password
                    </label>
                  </div>
                  <Link
                    href="forgot-password"
                    className="text-sm text-primary-foreground font-medium underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                {/* submit button */}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
              {/* link to sign up */}
              {/* <div className="text-center text-sm md:mt-6">
                Don&apos;t have any account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary-foreground hover:underline underline-offset-4"
                >
                  Sign Up
                </Link>
              </div> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
