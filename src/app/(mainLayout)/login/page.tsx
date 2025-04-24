import { LoginForm } from "@/components/page/login/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] p-6 md:p-10">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
