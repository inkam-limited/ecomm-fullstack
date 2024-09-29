import Link from "next/link";
import React from "react";

const data = [
  { name: "graphic", url: "/category/graphic" },
  { name: "vector", url: "/category/vector" },
  { name: "logo", url: "/category/logo" },
  { name: "digital", url: "/category/digital" },
  { name: "mockup", url: "/category/mockup" },
  { name: "illustration", url: "/category/illustration" },
];

const CategoryChips = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center pb-12">
      {data.map((item, index) => (
        <div
          key={index}
          className="px-8 py-2 border border-gray-200 rounded-2xl"
        >
          <Link
            href={`/products`}
            className="text-gray-600 text-sm hover:text-gray-800 font-semibold"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryChips;
