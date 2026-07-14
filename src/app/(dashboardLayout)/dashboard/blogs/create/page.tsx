"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/Dashboard/Shared/ImageUpload";
import { useCrud } from "@/hooks/useCrud";
import RichTextEditor from "@/components/Dashboard/Shared/RichTextEditor";

function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptySeoData = { metaTitle: "", metaDescription: "", seoKeywords: "" };

const emptyForm = {
  title: "",
  slug: "",
  authorName: "",
  shortDescription: "",
  content: "",
  tags: "",
  image: null as any,
  seoData: { ...emptySeoData },
};

function CreateBlogForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const { useGetItems, useCreateItem, useUpdateItem } = useCrud("blogs");
  const { data: blogsData, isLoading: isBlogsLoading } = useGetItems({
    page: 1,
    limit: 1000,
    search: "",
  });

  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const [formData, setFormData] = useState<any>({ ...emptyForm, seoData: { ...emptySeoData } });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (blogId && blogsData?.data && !isLoaded) {
      const item = blogsData.data.find((d: any) => d._id === blogId);
      if (item) {
        setFormData({
          title: item.title || "",
          slug: item.slug || "",
          authorName: item.authorName || "",
          shortDescription: item.shortDescription || "",
          content: item.content || "",
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
          image: item.image || null,
          seoData: {
            metaTitle: item.seo?.metaTitle || "",
            metaDescription: item.seo?.metaDescription || "",
            seoKeywords: Array.isArray(item.seo?.seoKeywords)
              ? item.seo.seoKeywords.join(", ")
              : "",
          },
        });
        setIsLoaded(true);
      }
    }
  }, [blogId, blogsData, isLoaded]);

  const handleTitleChange = (value: string) => {
    setFormData((prev: any) => {
      const prevTitleSlug = slugify(prev.title || "");
      const currentSlug = prev.slug || "";
      const shouldAutoGenerate = currentSlug === "" || currentSlug === prevTitleSlug;
      return {
        ...prev,
        title: value,
        slug: shouldAutoGenerate ? slugify(value) : currentSlug,
      };
    });
  };

  const handleSlugChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, slug: value }));
  };

  const buildAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    const textData: any = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image") {
        if (value instanceof File) fd.append("image", value);
        else if (typeof value === "string" && value) textData.image = value;
      } else if (key === "seoData") {
        textData[key] = value;
      } else if (key === "tags") {
        textData[key] = (value as string)
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      } else if (value !== null && value !== undefined) {
        textData[key] = value;
      }
    });

    fd.append("data", JSON.stringify(textData));

    if (blogId) {
      updateMutation.mutate(
        { id: blogId, data: fd },
        { onSuccess: () => router.push("/dashboard/blogs") }
      );
    } else {
      createMutation.mutate(fd, {
        onSuccess: () => router.push("/dashboard/blogs"),
      });
    }
  };

  const isEdit = !!blogId;
  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isEdit && isBlogsLoading) {
    return <div className="p-8 text-center text-gray-500">Loading blog data...</div>;
  }

  return (
    <div className="p-6 max-w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Blog" : "Create Blog"}
        </h1>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/blogs")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={buildAndSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h2 className="font-semibold text-gray-800 text-base">Blog Information</h2>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Blog post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="blog-post-slug"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name *</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="Author full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief excerpt shown in blog listings"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags <span className="text-gray-400 font-normal text-xs">(comma separated)</span></Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="technology, design, web"
                />
              </div>
            </div>

            {/* Rich Text Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-800 text-base">Blog Content *</h2>
              <RichTextEditor
                value={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                placeholder="Write your blog content here..."
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Cover Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-800 text-base mb-4">Cover Image</h2>
              <ImageUpload
                label=""
                value={formData.image}
                onChange={(file) => setFormData({ ...formData, image: file })}
              />
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-800 text-base">SEO Settings</h2>

              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.seoData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, seoData: { ...formData.seoData, metaTitle: e.target.value } })
                  }
                  placeholder="SEO page title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.seoData.metaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, seoData: { ...formData.seoData, metaDescription: e.target.value } })
                  }
                  placeholder="SEO meta description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoKeywords">SEO Keywords <span className="text-gray-400 font-normal text-xs">(comma separated)</span></Label>
                <Input
                  id="seoKeywords"
                  value={formData.seoData.seoKeywords}
                  onChange={(e) =>
                    setFormData({ ...formData, seoData: { ...formData.seoData, seoKeywords: e.target.value } })
                  }
                  placeholder="keyword1, keyword2"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.push("/dashboard/blogs")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1677ff] hover:bg-[#0f62d9] text-white"
                disabled={isPending}
              >
                {isPending ? (isEdit ? "Saving..." : "Creating...") : isEdit ? "Save Changes" : "Create Blog"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CreateBlogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
      <CreateBlogForm />
    </Suspense>
  );
}
