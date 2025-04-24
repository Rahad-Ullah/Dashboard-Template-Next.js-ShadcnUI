"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const GlobalErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <h1 className="text-4xl font-bold text-red-500">Error</h1>
      <p className="text-xl font-medium">Oops! Something went wrong!</p>
      <Button variant={"outline"} onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default GlobalErrorPage;
