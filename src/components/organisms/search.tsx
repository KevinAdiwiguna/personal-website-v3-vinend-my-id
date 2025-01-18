"use client";

import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { InputWithLabel } from "../atoms/input-with-label";

interface titleProps {
  title?: string
}


const Search = ({ title = "" }: titleProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <InputWithLabel
      classContainer="w-full"
      type="text"
      id="search"
      name="search"
      label={title ? title : "Search"}
      className="w-full border border-gray-200 py-2 pl-6 text-sm outline-2 rounded-sm"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      leftIcon={<IoSearch className="text-gray-400" />}

    />
  );
};

export default Search;
