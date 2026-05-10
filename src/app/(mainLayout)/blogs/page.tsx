import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import PageHero from "@/components/ui/PageHero";
import bg1 from "@/assets/images/banner/bg1.gif";
import { fetchAPI } from "@/lib/api";

export const metadata = {
  title: "Blog | Emperal Tech",
  description:
    "Read the latest insights, tutorials, and updates from the Emperal Tech team on software development, design, and technology.",
};

export default async function BlogsPage() {
  const blogs = await fetchAPI("/blogs");

  return (
    <main>
      <PageHero
        title="Our Blog"
        subtitle="Stay up-to-date with the latest insights, tutorials, and updates from our expert team on software development, design, and technology."
        bgImage={bg1}
        buttonText="CONTACT US"
        buttonHref="/contact"
      />

      <section className="py-10 md:py-16 lg:py-20 bg-white">
        <Container>
          {blogs && blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {blogs.map(
                (blog: {
                  _id: string;
                  title: string;
                  slug: string;
                  image?: string;
                  authorName: string;
                  shortDescription: string;
                  tags?: string[];
                  createdAt?: string;
                }) => (
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
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold tracking-widest rounded-full uppercase"
                              >
                                {tag}
                              </span>
                            ))}
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
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-secondary transition-all duration-300 group-hover:text-primary line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-secondary/60 text-sm line-clamp-3 leading-relaxed">
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
                )
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-secondary/40">
                No blog posts yet
              </h3>
              <p className="text-secondary/30 mt-2">
                Check back later for our latest articles.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
