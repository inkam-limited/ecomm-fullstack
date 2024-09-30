"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SearchIcon } from "lucide-react";
import { Category } from "@prisma/client";
import { getSearchSuggestions } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  category: {
    name: string;
  }[];
  id: string;
  images: string[];
}

const MainSearchBar = ({ categories }: { categories: Category[] }) => {
  const [searchParams, setSearchParams] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);

  // Debounce implementation to prevent immediate API calls
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async (searchParams: string) => {
      if (searchParams.trim()) {
        const searchResults = await getSearchSuggestions(searchParams);
        setSearchSuggestions(searchResults);
      } else {
        setSearchSuggestions([]); // Clear suggestions if search is empty
      }
    }, 300),
    []
  );

  // Watch searchParams and trigger debounced search
  useEffect(() => {
    handleSearch(searchParams);
  }, [searchParams, handleSearch]);

  // Prevent closing on clicking inside suggestions
  const handleSuggestionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex relative items-center w-full px-4 bg-gray-50 py-2 rounded-full">
      <div className="flex items-center gap-4 flex-grow z-50">
        <SearchIcon className="w-6 h-6" />
        <Input
          onClick={() => setSearchFocus(true)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setTimeout(() => setSearchFocus(false), 100)} // Add delay to handle suggestion click
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          placeholder="Search millions of photos, fonts, graphics, and more..."
          className="border-none bg-transparent focus:border-none focus:ring-transparent focus-visible:ring-transparent focus-visible:outline-transparent focus-within:outline-transparent focus-visible:outline-none flex h-10 w-full rounded-md border-0 px-3 py-2 text-sm ring-offset-transparent  focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-0"
        />
      </div>
      <Select>
        <SelectTrigger className="w-[180px] bg-transparent border-none">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {searchFocus && searchSuggestions.length > 0 && (
        <div
          className="absolute h-auto top-12 right-0 w-full z-20 bg-white border border-gray-200 rounded-lg"
          onMouseDown={handleSuggestionClick} // Prevent closing dropdown on click
        >
          <div className="flex flex-col gap-2 py-4 px-4">
            {searchSuggestions.map((suggestion) => (
              <Link
                key={suggestion.id}
                href={`/product/${suggestion.id}`}
                className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md"
              >
                <span className="line-clamp-1 text-gray-700 text-sm w-full">
                  {suggestion.name} in {suggestion.category[0].name}
                </span>
                <span>
                  <Image
                    src={suggestion.images[0]}
                    alt={suggestion.name}
                    height={50}
                    width={50}
                    className="object-cover rounded-lg"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSearchBar;
