"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-xl font-medium">Oops! Page Not Found!</p>
      <Button variant={"outline"} onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
