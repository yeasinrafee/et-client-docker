import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  image?: string;
  authorName: string;
  shortDescription: string;
  tags?: string[];
  createdAt?: string;
}

interface BlogsPreviewProps {
  data: BlogItem[];
}

const BlogsPreview = ({ data }: BlogsPreviewProps) => {
  if (!data || data.length === 0) return null;

  const displayedBlogs = data.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-accent">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 sm:mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary tracking-tighter uppercase">
              OUR BLOG
            </h2>
            <p className="text-secondary/50 text-lg max-w-xl">
              Insights, tutorials, and updates from our team.
            </p>
          </div>
          <Link
            href="/blogs"
            className="flex items-center max-w-fit gap-3 bg-primary text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20"
          >
            VIEW ALL POSTS
            <MdArrowOutward className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog.slug}`}
              className="group cursor-pointer"
            >
              {/* Image */}
              {blog.image && (
                <div className="relative aspect-[16/10] rounded-[24px] sm:rounded-[32px] overflow-hidden mb-6 transition-transform duration-500 ease-out group-hover:-translate-y-2 border border-accent bg-[#F8F8F8]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold tracking-widest rounded-full uppercase">
                        {blog.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="space-y-3 px-1">
                <div className="flex items-center gap-3 text-xs text-secondary/40">
                  <span className="font-bold">{blog.authorName}</span>
                  {blog.createdAt && (
                    <>
                      <span>•</span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-secondary transition-all duration-300 group-hover:text-primary line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-secondary/60 text-sm line-clamp-2 leading-relaxed">
                  {blog.shortDescription}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm pt-2">
                  <span className="tracking-widest uppercase text-xs">
                    READ MORE
                  </span>
                  <MdArrowOutward className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BlogsPreview;
