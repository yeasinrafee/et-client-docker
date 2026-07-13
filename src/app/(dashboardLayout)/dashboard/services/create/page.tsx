"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MultiImageUpload from "@/components/Dashboard/Shared/MultiImageUpload";
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
  description: "",
  longDescription: "",
  images: [] as any[],
  tags: "",
  features: "",
  contentHtml: "",
  seoData: { ...emptySeoData },
};

function CreateServiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id");

  const { useGetItems, useCreateItem, useUpdateItem } = useCrud("services");
  const { data: servicesData, isLoading: isServicesLoading } = useGetItems({
    page: 1,
    limit: 1000,
    search: "",
  });

  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const [formData, setFormData] = useState<any>({ ...emptyForm });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (serviceId && servicesData?.data && !isLoaded) {
      const item = servicesData.data.find((d: any) => d._id === serviceId);
      if (item) {
        setFormData({
          title: item.title || "",
          slug: item.slug || "",
          description: item.description || "",
          longDescription: item.longDescription || "",
          images: item.images || [],
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
          features: Array.isArray(item.features) ? item.features.join(", ") : item.features || "",
          contentHtml: item.contentHtml || "",
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
  }, [serviceId, servicesData, isLoaded]);

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
      if (key === "images") {
        const files = (value as any[]).filter((v) => v instanceof File);
        const urls = (value as any[]).filter((v) => !(v instanceof File));
        files.forEach((file) => fd.append(key, file));
        textData[key] = urls;
      } else if (key === "seoData") {
        textData[key] = value;
      } else if (key === "tags" || key === "features") {
        textData[key] = (value as string)
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      } else if (value !== null && value !== undefined) {
        textData[key] = value;
      }
    });

    if (!textData.longDescription) textData.longDescription = textData.description || "";
    if (!textData.tags?.length) textData.tags = [];
    if (!textData.features?.length) textData.features = [];
    textData.benefits = textData.benefits || [];
    textData.process = textData.process || [];

    fd.append("data", JSON.stringify(textData));

    if (serviceId) {
      updateMutation.mutate(
        { id: serviceId, data: fd },
        { onSuccess: () => router.push("/dashboard/services") }
      );
    } else {
      createMutation.mutate(fd, {
        onSuccess: () => router.push("/dashboard/services"),
      });
    }
  };

  const isEdit = !!serviceId;
  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isEdit && isServicesLoading) {
    return <div className="p-8 text-center text-gray-500">Loading service data...</div>;
  }

  return (
    <div className="p-6 max-w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Service" : "Create Service"}
        </h1>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/services")}
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
              <h2 className="font-semibold text-gray-800 text-base">Basic Information</h2>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Service title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="service-slug"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description shown in listings"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  placeholder="Detailed description for the service detail page"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags <span className="text-gray-400 font-normal text-xs">(comma separated)</span></Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="UI DESIGN, BRANDING, RESEARCH"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features <span className="text-gray-400 font-normal text-xs">(comma separated)</span></Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Figma Prototypes, Design System, Accessibility Check"
                />
              </div>
            </div>

            {/* Rich Text */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-800 text-base">Service Content (Rich Text)</h2>
              <RichTextEditor
                value={formData.contentHtml}
                onChange={(html) => setFormData({ ...formData, contentHtml: html })}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-800 text-base mb-4">Service Images</h2>
              <MultiImageUpload
                label=""
                value={formData.images}
                onChange={(files) => setFormData({ ...formData, images: files })}
              />
            </div>

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

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.push("/dashboard/services")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#1677ff] hover:bg-[#0f62d9] text-white"
                disabled={isPending}
              >
                {isPending ? (isEdit ? "Saving..." : "Creating...") : isEdit ? "Save Changes" : "Create Service"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CreateServicePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
      <CreateServiceForm />
    </Suspense>
  );
}

