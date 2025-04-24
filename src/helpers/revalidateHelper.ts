"use server";

import { revalidateTag } from "next/cache";

export const revalidate = async (tag: string) => {
  return revalidateTag(tag);
};
