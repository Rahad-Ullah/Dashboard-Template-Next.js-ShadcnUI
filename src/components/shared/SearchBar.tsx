"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

const SearchBar = () => {
  const updateSearchParam = useUpdateSearchParams();
  return (
    <div className="relative hidden md:block">
      <Input
        type="search"
        id="search"
        placeholder="Search your interest"
        className="rounded-full bg-[#F1F1F1] px-5 h-10 placeholder:text-[#B6B6B6]"
        size={28}
        onChange={(e) => updateSearchParam("searchTerm", e.target.value)}
      />
      <Search className="absolute right-2 top-2 text-zinc-500" />
    </div>
  );
};

export default SearchBar;
