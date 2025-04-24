"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <ChevronLeft
      onClick={() => router.back()}
      className="size-10 p-2 text-zinc-400 hover:text-primary cursor-pointer"
    />
  );
};

export default BackButton;
