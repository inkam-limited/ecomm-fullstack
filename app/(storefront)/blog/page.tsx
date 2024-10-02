import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/db";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 to-indigo-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Our Blog
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Discover insightful articles, expert opinions, and the latest
                  trends in technology and design.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white/10 text-white placeholder:text-gray-300"
                    placeholder="Search articles"
                    type="search"
                  />
                  <Button
                    className="bg-white text-purple-600 hover:bg-gray-200"
                    type="submit"
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter">
                Recent Posts
              </h2>
              <div className="flex flex-wrap justify-between">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="w-[calc(50%-.5rem)] md:w-[calc(25%-.5rem)] text-slate-900 flex flex-col justify-between"
                  >
                    <Image
                      alt={post.title}
                      className="aspect-video overflow-hidden rounded-lg object-cover"
                      height="200"
                      src={post.coverImage}
                      width="400"
                    />
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400"></p>
                    <Link
                      className="inline-flex items-center text-blue-600 hover:underline"
                      href={`/blog/${post.title}/${post.id}`}
                    >
                      Read more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
