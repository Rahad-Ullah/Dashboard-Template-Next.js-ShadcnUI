"use client";

import { useRouter } from "next/navigation";

export const useUpdateSearchParams = () => {
  const router = useRouter();

  const updateSearchParams = (key: string, value: string | null) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (value) {
      searchParams.set(key, value); // Add or update the key-value pair
    } else {
      searchParams.delete(key); // Remove the key if the value is null
    }

    const newPath = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPath);
  };

  return updateSearchParams;
};
