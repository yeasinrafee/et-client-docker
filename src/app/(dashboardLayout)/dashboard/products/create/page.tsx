"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiImageUpload from "@/components/Dashboard/Shared/MultiImageUpload";
import MultiSelect from "@/components/Dashboard/Shared/MultiSelect";
import DatePicker from "@/components/Dashboard/Shared/DatePicker";
import { useCrud } from "@/hooks/useCrud";
import RichTextEditor from "@/components/Dashboard/Shared/RichTextEditor";

// Generates a URL-friendly slug from a title, e.g. "High Performance App" -> "high-performance-app"
function slugify(text: string): string {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_]+/g, "-") // collapse whitespace/underscores into a single dash
    .replace(/-+/g, "-") // collapse multiple dashes
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

const emptyTestimonial = { quote: "", author: "", role: "" };

const emptySeoData = { metaTitle: "", metaDescription: "", seoKeywords: "" };

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  client: "",
  images: [] as any[],
  categories: [] as string[],
  contentHtml: "",
  fullDescription: "",
  tags: "",
  technologies: "",
  launchDate: "",
  duration: "",
  testimonial: { ...emptyTestimonial },
  seoData: { ...emptySeoData },
};

function CreateProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const { useGetItems, useCreateItem, useUpdateItem } = useCrud("products");
  const { data: productsData, isLoading: isProductsLoading } = useGetItems({
    page: 1,
    limit: 1000,
    search: "",
  });
  const { data: categoriesData } = useCrud("product-categories").useGetItems({
    page: 1,
    limit: 100,
    search: "",
  });

  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const [formData, setFormData] = useState<any>({ ...emptyForm });
  const [isLoaded, setIsLoaded] = useState(false);

  // Populate data if in Edit Mode
  useEffect(() => {
    if (productId && productsData?.data && !isLoaded) {
      const item = productsData.data.find((p: any) => p._id === productId);
      if (item) {
        setFormData({
          title: item.title || "",
          slug: item.slug || "",
          description: item.description || "",
          client: item.client || "",
          images: item.images || [],
          categories: item.categories?.map((c: any) => c._id || c) || [],
          contentHtml: item.contentHtml || "",
          fullDescription: item.fullDescription || "",
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
          technologies: Array.isArray(item.technologies)
            ? item.technologies.join(", ")
            : item.technologies || "",
          launchDate: item.launchDate || "",
          duration: item.duration || "",
          testimonial: {
            quote: item.testimonial?.quote || "",
            author: item.testimonial?.author || "",
            role: item.testimonial?.role || "",
          },
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
  }, [productId, productsData, isLoaded]);

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      testimonial: { ...emptyTestimonial },
      seoData: { ...emptySeoData },
    });
  };

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

  const buildFormData = () => {
    const data = new FormData();
    const textData: any = {};

    const tagsArray =
      typeof formData.tags === "string"
        ? formData.tags
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        : formData.tags || [];

    const technologiesArray =
      typeof formData.technologies === "string"
        ? formData.technologies
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        : formData.technologies || [];

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "tags") {
        textData.tags = tagsArray;
      } else if (key === "technologies") {
        textData.technologies = technologiesArray;
      } else if (key === "testimonial") {
        const t = value as typeof emptyTestimonial;
        if (t && (t.quote?.trim() || t.author?.trim() || t.role?.trim())) {
          textData.testimonial = {
            quote: t.quote?.trim() || "",
            author: t.author?.trim() || "",
            role: t.role?.trim() || "",
          };
        }
      } else if (key === "seoData") {
        const s = value as typeof emptySeoData;
        const kw =
          typeof s.seoKeywords === "string"
            ? s.seoKeywords
                .split(",")
                .map((k: string) => k.trim())
                .filter(Boolean)
            : s.seoKeywords || [];
        if (s.metaTitle?.trim() || s.metaDescription?.trim() || kw.length > 0) {
          textData.seoData = {
            metaTitle: s.metaTitle?.trim() || "",
            metaDescription: s.metaDescription?.trim() || "",
            seoKeywords: kw,
          };
        }
      } else if (value instanceof File) {
        data.append(key, value);
      } else if (Array.isArray(value)) {
        const files = value.filter((v) => v instanceof File);
        const nonFiles = value.filter((v) => !(v instanceof File));

        files.forEach((file) => data.append(key, file));
        textData[key] = nonFiles;
      } else if (value !== null && value !== undefined) {
        textData[key] = value;
      }
    });

    data.append("data", JSON.stringify(textData));
    return data;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = buildFormData();

    if (productId) {
      updateMutation.mutate(
        { id: productId, data },
        {
          onSuccess: () => {
            router.push("/dashboard/products");
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          resetForm();
          router.push("/dashboard/products");
        },
      });
    }
  };

  const isLoading = productId && isProductsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Loading Product Data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full max-w-full">
      {/* Header - Label left, Back icon right */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {productId ? "Edit Product" : "Create Product"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {productId ? "Update the product details and save changes" : "Fill in the details to add a new product"}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/products")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full-width container with 2-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 pb-2 border-b">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">
                    Slug{" "}
                    <span className="text-gray-400 font-normal">
                      (auto-generated, editable)
                    </span>
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Short Description{" "}
                  <span className="text-gray-400 font-normal">
                    (single line, for listing)
                  </span>
                </Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData
                      .getData("text")
                      .replace(/\s*\n\s*/g, " ");
                    setFormData((prev: any) => ({
                      ...prev,
                      description: (prev.description || "") + text,
                    }));
                  }}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="launchDate">Launch Date</Label>
                  <DatePicker
                    value={formData.launchDate}
                    onChange={(val) =>
                      setFormData({ ...formData, launchDate: val })
                    }
                    placeholder="Pick a launch date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (e.g. 6 months)</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">
                  Full Description (for Details Page Hero)
                </Label>
                <textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, fullDescription: e.target.value })
                  }
                  className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>
            </div>

            {/* Media & Categories Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 pb-2 border-b">
                Media & Categories
              </h2>

              <MultiImageUpload
                label="Product Images"
                value={formData.images}
                onChange={(files) => setFormData({ ...formData, images: files })}
              />
              <MultiSelect
                label="Categories"
                placeholder="Select Categories"
                options={
                  categoriesData?.data?.map((c: any) => ({
                    label: c.name,
                    value: c._id,
                  })) || []
                }
                selected={formData.categories}
                onChange={(vals) =>
                  setFormData({ ...formData, categories: vals })
                }
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tags & Technologies Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 pb-2 border-b">
                Tags & Technologies
              </h2>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g. WEB DEVELOPMENT, MOBILE APP"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies">
                  Technologies (comma separated)
                </Label>
                <Input
                  id="technologies"
                  placeholder="e.g. Next.js, Node.js, AWS"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Rich Text Editor Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 pb-2 border-b">
                Product Content
              </h2>
              <RichTextEditor
                label="Product Details Content (Rich Text)"
                value={formData.contentHtml}
                onChange={(html) =>
                  setFormData({ ...formData, contentHtml: html })
                }
              />
            </div>

            {/* Testimonial Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 pb-2 border-b">
                Testimonial{" "}
                <span className="text-gray-400 font-normal text-sm">(optional)</span>
              </h2>

              <div className="space-y-2">
                <Label htmlFor="testimonial-quote">Quote</Label>
                <textarea
                  id="testimonial-quote"
                  placeholder="e.g. The speed improvement made a huge difference..."
                  value={formData.testimonial.quote}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      testimonial: {
                        ...formData.testimonial,
                        quote: e.target.value,
                      },
                    })
                  }
                  className="flex min-h-[70px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-author">Author</Label>
                  <Input
                    id="testimonial-author"
                    placeholder="e.g. Michael Rahman"
                    value={formData.testimonial.author}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonial: {
                          ...formData.testimonial,
                          author: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial-role">Author Role</Label>
                  <Input
                    id="testimonial-role"
                    placeholder="e.g. CEO, TechNova Solutions"
                    value={formData.testimonial.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonial: {
                          ...formData.testimonial,
                          role: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* SEO Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 pb-2 border-b">
                SEO Settings{" "}
                <span className="text-gray-400 font-normal text-sm">(optional)</span>
              </h2>

              <div className="space-y-2">
                <Label htmlFor="seo-metaTitle">Meta Title</Label>
                <Input
                  id="seo-metaTitle"
                  placeholder="e.g. AI Analytics Dashboard | Emperal Tech"
                  value={formData.seoData.metaTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seoData: {
                        ...formData.seoData,
                        metaTitle: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-metaDescription">Meta Description</Label>
                <textarea
                  id="seo-metaDescription"
                  placeholder="A compelling description for search engines (150-160 chars recommended)"
                  value={formData.seoData.metaDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seoData: {
                        ...formData.seoData,
                        metaDescription: e.target.value,
                      },
                    })
                  }
                  className="flex min-h-[70px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-keywords">
                  SEO Keywords (comma separated)
                </Label>
                <Input
                  id="seo-keywords"
                  placeholder="e.g. AI analytics, business intelligence, dashboard"
                  value={formData.seoData.seoKeywords}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seoData: {
                        ...formData.seoData,
                        seoKeywords: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3 pb-12 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/products")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#1677ff] hover:bg-[#0f62d9] text-white px-6 font-medium"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {productId
              ? updateMutation.isPending
                ? "Saving..."
                : "Save Changes"
              : createMutation.isPending
              ? "Creating..."
              : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CreateProductPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Loading Form...</p>
      </div>
    }>
      <CreateProductForm />
    </Suspense>
  );
}
