"use client";

import { useRouter } from "next/navigation";

export const useUpdateMultiSearchParams = () => {
  const router = useRouter();

  const updateMultiSearchParams = (updates: Record<string, string | null>) => {
    const searchParams = new URLSearchParams(window.location.search);

    // Iterate over the updates object and set or delete keys
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== null) {
        searchParams.set(key, value); // Add or update the key-value pair
      } else {
        searchParams.delete(key); // Remove the key if the value is null
      }
    });

    const newPath = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPath);
  };

  return updateMultiSearchParams;
};
