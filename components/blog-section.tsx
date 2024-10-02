import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import prisma from "@/lib/db";

const BlogSection = async () => {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="mb-16">
      <div className="py-4 flex items-center justify-between w-full container mx-auto px-4">
        <h2 className="text-xl font-semibold">Latest Blog Posts</h2>
        <Link href="/blog" className="inline-flex items-center ">
          View all posts
          <svg
            className="ml-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              fillRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
      <Carousel
        className="container mx-auto px-4"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4">
          {posts.map((post) => (
            <CarouselItem
              key={post.id}
              className="basis-1/2 md:basis-1/3 pl-4 lg:basis-1/4"
            >
              <div className="p-4 bg-slate-800 h-full flex flex-col justify-between">
                <div className="w-full relative aspect-w-7 aspect-h-5 rounded-lg bg-gradient-to-br from-slate-500/50 to-blue-500/50 via-red-500/50 backdrop-blur-3xl">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover object-center w-full h-full rounded-lg"
                  />
                </div>
                <h3 className="text-sm py-8 font-bold text-gray-100">
                  {post.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400"></p>
                <Link
                  className="inline-flex items-center text-gray-100 border px-2 py-2"
                  href={`/blog/${post.title}/${post.id}`}
                >
                  Read more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-12" />
        <CarouselNext className="right-12" />
      </Carousel>
    </div>
  );
};

export default BlogSection;
