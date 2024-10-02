import ProductDescription from "@/components/ProductDescription";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPostWithCreator } from "./page";
import { JSONContent } from "@tiptap/react";
export default function BlogArticle({ post }: { post: BlogPostWithCreator }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="container max-w-3xl px-4 py-6 lg:py-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {post?.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Exploring the emerging trends that are set to shape the future of
              web development
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar
                  values={post.createdAt.toDateString()}
                  className="h-4 w-4"
                />
                <span>{post.createdAt.toDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
          <Image
            alt="Blog post cover image"
            className="aspect-video overflow-hidden rounded-lg object-cover my-8"
            height="500"
            src={post?.coverImage!}
            width="800"
          />
          <ProductDescription content={post?.content as JSONContent} />
        </article>
        <section className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="container max-w-3xl px-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  alt="Author's profile picture"
                  src="/placeholder-avatar.svg"
                />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Jesus Christ</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Web designer and Tech Enthusiast
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Jesus Christ is a seasoned web designer with over a decade of
              experience in creating innovative web solutions. He is passionate
              about staying at the forefront of design trends and sharing his
              insights with the design community.
            </p>
          </div>
        </section>
        <section className="py-12">
          <div className="container max-w-3xl px-4">
            <h2 className="text-2xl font-bold mb-4">Share this article</h2>
            <div className="flex space-x-4">
              <Button variant="outline">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline">
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Creative Blog. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
