"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack, MdCalendarToday } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import PageHero from "../ui/PageHero";
import bg1 from "@/assets/images/banner/bg1.gif";

interface BlogDetailsProps {
  blog: {
    title: string;
    image?: string;
    authorName: string;
    content: string;
    tags?: string[];
    createdAt?: string;
  };
}

const BlogDetailsContent = ({ blog }: BlogDetailsProps) => {
  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHero
        title={blog.title}
        bgImage={blog.image || bg1}
        buttonText="BACK TO BLOGS"
        buttonHref="/blogs"
      />

      {/* Breadcrumb & Navigation */}
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
              <Link
                href="/blogs"
                className="hover:text-primary transition-colors"
              >
                Blogs
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pt-12 md:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Info */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-secondary/50 font-medium">
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-xs text-secondary font-bold">
                  {blog.authorName.charAt(0)}
                </div>
                {blog.authorName}
              </span>
              {blog.createdAt && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MdCalendarToday />
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {/* {blog.image && (
            <div className="relative w-full aspect-[21/9] rounded-[24px] overflow-hidden mb-12 border border-accent bg-[#F8F8F8]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )} */}

          {/* Content */}
          <div className="bg-white border border-accent rounded-[32px] p-6 md:p-10 shadow-sm">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </Container>

      {/* Styled JSX for the rich text content matching the dashboard editor */}
      <style jsx global>{`
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
          word-break: break-word;
        }
        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.3;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f3f4f6;
        }
        .blog-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.35;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
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
          border-left: 4px solid #f97316; /* Primary color */
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background-color: #fff7ed; /* Primary/10 equivalent */
          border-radius: 0 12px 12px 0;
          color: #1f2937;
          font-style: italic;
          font-size: 1.25rem;
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
          border-radius: 12px;
          margin: 2rem auto;
          display: block;
          border: 1px solid #e5e7eb;
        }
        .blog-content pre {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1.25rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        .blog-content code {
          background-color: #f3f4f6;
          color: #db2777;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
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
      `}</style>
    </div>
  );
};

export default BlogDetailsContent;
