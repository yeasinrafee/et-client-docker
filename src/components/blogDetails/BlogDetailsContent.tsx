"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdArrowBack,
  MdCalendarToday,
  MdPerson,
  MdArrowOutward,
  MdLabel,
} from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import PageHero from "../ui/PageHero";
import bg1 from "@/assets/images/banner/bg1.gif";

type BlogNavItem = {
  _id: string;
  slug: string;
  title: string;
  image?: string;
  authorName: string;
  createdAt?: string;
};

interface BlogDetailsProps {
  blog: {
    title: string;
    slug: string;
    image?: string;
    authorName: string;
    shortDescription: string;
    content: string;
    tags?: string[];
    createdAt?: string;
  };
  recentBlogs?: BlogNavItem[];
}

const BlogDetailsContent = ({ blog, recentBlogs = [] }: BlogDetailsProps) => {
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <PageHero
        title={blog.title}
        bgImage={blog.image || bg1}
        buttonText="BACK TO BLOGS"
        buttonHref="/blogs"
      />

      {/* Breadcrumb */}
      <section className="bg-white border-b border-accent">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            <Link
              href="/blogs"
              className="flex items-center gap-2 text-secondary/50 hover:text-primary transition-colors text-sm font-medium"
            >
              <MdArrowBack className="text-lg" />
              Back to Blogs
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-secondary/40 text-sm">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-primary transition-colors">
                Blogs
              </Link>
              <span>/</span>
              <span className="text-secondary font-medium line-clamp-1 max-w-[200px]">
                {blog.title}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-14 lg:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left — Article */}
            <div className="lg:col-span-8 space-y-10">

              {/* Article Header */}
              <div className="space-y-5">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 bg-primary/10 text-primary text-[11px] font-bold tracking-widest rounded-full uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight tracking-tighter">
                  {blog.title}
                </h1>

                {/* Short Description */}
                {blog.shortDescription && (
                  <p className="text-secondary/60 text-lg leading-relaxed border-l-4 border-primary pl-4">
                    {blog.shortDescription}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-5 pt-2 border-t border-accent">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {blog.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-secondary/40">Author</p>
                      <p className="text-sm font-bold text-secondary">{blog.authorName}</p>
                    </div>
                  </div>
                  {formattedDate && (
                    <>
                      <div className="w-px h-8 bg-accent"></div>
                      <div className="flex items-center gap-2 text-secondary/50">
                        <MdCalendarToday className="text-primary text-base" />
                        <div>
                          <p className="text-xs text-secondary/40">Published</p>
                          <p className="text-sm font-bold text-secondary">{formattedDate}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              {blog.image && (
                <div className="relative w-full aspect-[16/9] rounded-[28px] overflow-hidden border border-accent bg-[#F8F8F8]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Rich Text Content */}
              <div className="bg-white border border-accent rounded-[28px] p-6 md:p-10 shadow-sm">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 self-start">

              {/* Author Card */}
              <div className="p-6 md:p-8 rounded-[28px] bg-secondary text-white space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary/20 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none"></div>
                <h3 className="relative z-10 text-xs font-bold text-white/40 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-5 h-px bg-white/20"></span>
                  About the Author
                </h3>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {blog.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg leading-tight">{blog.authorName}</p>
                    <p className="text-white/40 text-xs mt-0.5">Author at Emperal Tech</p>
                  </div>
                </div>
                {formattedDate && (
                  <div className="relative z-10 flex items-center gap-2 pt-3 border-t border-white/10 text-white/50 text-xs">
                    <MdCalendarToday className="text-primary text-sm" />
                    Published on {formattedDate}
                  </div>
                )}
              </div>

              {/* Tags Card */}
              {/* {blog.tags && blog.tags.length > 0 && (
                <div className="p-6 md:p-8 rounded-[28px] bg-[#F8F8F8] border border-accent space-y-4">
                  <h3 className="text-xs font-bold text-secondary/50 tracking-widest uppercase flex items-center gap-2">
                    <MdLabel className="text-primary text-base" />
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 bg-white border border-accent hover:border-primary/50 hover:bg-primary/5 text-secondary/70 hover:text-secondary text-[11px] font-bold tracking-wider rounded-full transition-all duration-200 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Recent Posts */}
              {recentBlogs.length > 0 && (
                <div className="p-6 md:p-8 rounded-[28px] bg-[#F8F8F8] border border-accent space-y-5">
                  <h3 className="text-xs font-bold text-secondary/50 tracking-widest uppercase flex items-center gap-2">
                    <span className="w-5 h-px bg-secondary/20"></span>
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {recentBlogs.map((post) => (
                      <Link
                        key={post._id}
                        href={`/blogs/${post.slug}`}
                        className="flex gap-3 group"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-accent shrink-0 bg-white">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary/5 flex items-center justify-center">
                              <MdPerson className="text-secondary/20 text-2xl" />
                            </div>
                          )}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-secondary font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </p>
                          {post.createdAt && (
                            <p className="text-secondary/40 text-xs">
                              {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-primary text-xs font-bold">
                            <span>Read</span>
                            <MdArrowOutward className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View All */}
                  <div className="pt-2 border-t border-accent">
                    <Link
                      href="/blogs"
                      className="flex items-center justify-center w-full gap-2 bg-secondary text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-widest hover:bg-primary transition-all duration-300 group"
                    >
                      VIEW ALL POSTS
                      <MdArrowOutward className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </Container>
      </section>

      {/* Rich text styles */}
      <style jsx global>{`
        .blog-content {
          font-size: 1.0625rem;
          line-height: 1.85;
          color: #374151;
          word-break: break-word;
        }
        .blog-content h1 {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.25;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 2px solid #f3f4f6;
        }
        .blog-content h2 {
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.3;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 0.875rem;
        }
        .blog-content h3 {
          font-size: 1.3rem;
          font-weight: 600;
          line-height: 1.4;
          color: #1f2937;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
        }
        .blog-content p:last-child {
          margin-bottom: 0;
        }
        .blog-content strong {
          font-weight: 700;
          color: #111827;
        }
        .blog-content em {
          font-style: italic;
        }
        .blog-content u {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .blog-content s {
          text-decoration: line-through;
          color: #9ca3af;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }
        .blog-content li p {
          margin-bottom: 0.5rem;
        }
        .blog-content blockquote {
          border-left: 4px solid #f97316;
          padding: 1rem 1.5rem;
          margin: 1.75rem 0;
          background-color: #fff7ed;
          border-radius: 0 12px 12px 0;
          color: #1f2937;
          font-style: italic;
          font-size: 1.15rem;
          font-weight: 500;
        }
        .blog-content blockquote p {
          margin-bottom: 0;
        }
        .blog-content a {
          color: #f97316;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s;
        }
        .blog-content a:hover {
          color: #ea580c;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 14px;
          margin: 2rem auto;
          display: block;
          border: 1px solid #e5e7eb;
        }
        .blog-content pre {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1.25rem;
          border-radius: 14px;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.875rem;
          line-height: 1.65;
        }
        .blog-content code {
          background-color: #f3f4f6;
          color: #db2777;
          padding: 0.2em 0.45em;
          border-radius: 5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.875em;
        }
        .blog-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          border-radius: 0;
        }
        .blog-content hr {
          border: 0;
          border-top: 1px solid #e5e7eb;
          margin: 2.5rem 0;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.75rem 0;
          font-size: 0.95em;
        }
        .blog-content th,
        .blog-content td {
          border: 1px solid #d1d5db;
          padding: 0.75rem 1rem;
          text-align: left;
        }
        .blog-content th {
          background-color: #f3f4f6;
          font-weight: 600;
          color: #111827;
        }
        .blog-content tr:nth-child(even) td {
          background-color: #f9fafb;
        }
      `}</style>
    </div>
  );
};

export default BlogDetailsContent;
