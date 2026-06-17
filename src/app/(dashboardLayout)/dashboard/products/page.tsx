"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchBar from "@/components/Dashboard/Shared/SearchBar";
import PaginationControls from "@/components/Dashboard/Shared/PaginationControls";
import ActionMenu from "@/components/Dashboard/Shared/ActionMenu";
import DeleteModal from "@/components/Dashboard/Shared/DeleteModal";
import MultiImageUpload from "@/components/Dashboard/Shared/MultiImageUpload";
import MultiSelect from "@/components/Dashboard/Shared/MultiSelect";
import DatePicker from "@/components/Dashboard/Shared/DatePicker";
import { useCrud } from "@/hooks/useCrud";
import { Badge } from "@/components/ui/badge";
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

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { useGetItems, useCreateItem, useUpdateItem, useDeleteItem } =
    useCrud("products");
  const { data: categoriesData } = useCrud("product-categories").useGetItems({
    page: 1,
    limit: 100,
    search: "",
  });
  const { data, isLoading } = useGetItems({ page, limit, search });
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Tracks whether the user has manually edited the slug. Once true, we stop
  // auto-generating it from the title so we don't clobber a manual edit.
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({ ...emptyForm });

  const resetForm = () => {
    setFormData({
      ...emptyForm,
      testimonial: { ...emptyTestimonial },
      seoData: { ...emptySeoData },
    });
    setSlugManuallyEdited(false);
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      title: value,
      // Auto-generate slug from title unless the user has typed their own slug
      slug: slugManuallyEdited ? prev.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
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
        // Only send the testimonial object if at least one field is filled in
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
        // Handle array of images/files or IDs
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = buildFormData();

    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateOpen(false);
        resetForm();
      },
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      const data = buildFormData();

      updateMutation.mutate(
        { id: selectedItem._id, data: data },
        {
          onSuccess: () => setIsEditOpen(false),
        },
      );
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      deleteMutation.mutate(selectedItem._id, {
        onSuccess: () => setIsDeleteOpen(false),
      });
    }
  };

  const openEdit = (item: any) => {
    setSelectedItem(item);
    setSlugManuallyEdited(true); // existing slug shouldn't be overwritten just by viewing/editing
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
    setIsEditOpen(true);
  };

  const openCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const openView = (item: any) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const openDelete = (item: any) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const allItems = Array.isArray(data?.data) ? data.data : [];
  const filteredItems = allItems.filter(
    (item: any) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.slug?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const items = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
      </div>

      <div className="flex justify-between items-center mb-6 py-4">
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
        />
        <Button
          onClick={openCreate}
          className="bg-[#1677ff] hover:bg-[#0f62d9] text-white h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Product
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[60px] font-semibold text-gray-700">
                #
              </TableHead>
              <TableHead className="w-[80px] font-semibold text-gray-700">
                Image
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Title
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Slug
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Categories
              </TableHead>
              <TableHead className="w-[100px] text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Loading...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item: any, index: number) => (
                <TableRow key={item._id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-500">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-[10px] text-gray-400 font-medium uppercase">
                          No Img
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-gray-600">{item.slug}</TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {item.categories?.map((cat: any) => (
                        <Badge
                          key={cat._id}
                          variant="secondary"
                          className="text-[10px] py-0 px-1 bg-blue-50 text-blue-600 border-blue-100"
                        >
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{item.client}</TableCell>
                  <TableCell className="text-right">
                    <ActionMenu
                      onView={() => openView(item)}
                      onEdit={() => openEdit(item)}
                      onDelete={() => openDelete(item)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 mt-4">
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
                // Strip newlines just in case content is pasted in, keeping this a true single-line field
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
            <RichTextEditor
              label="Product Details Content (Rich Text)"
              value={formData.contentHtml}
              onChange={(html) =>
                setFormData({ ...formData, contentHtml: html })
              }
            />

            {/* Testimonial Section */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-semibold text-gray-800 pt-3">
                Testimonial{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (optional)
                </span>
              </p>
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

            {/* SEO Section */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-semibold text-gray-800 pt-3">
                SEO Settings{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (optional)
                </span>
              </p>
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

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1677ff] hover:bg-[#0f62d9] text-white"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">
                  Slug{" "}
                  <span className="text-gray-400 font-normal">
                    (auto-generated, editable)
                  </span>
                </Label>
                <Input
                  id="edit-slug"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">
                Short Description{" "}
                <span className="text-gray-400 font-normal">
                  (single line, for listing)
                </span>
              </Label>
              <Input
                id="edit-description"
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
                <Label htmlFor="edit-client">Client</Label>
                <Input
                  id="edit-client"
                  value={formData.client}
                  onChange={(e) =>
                    setFormData({ ...formData, client: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-launchDate">Launch Date</Label>
                <DatePicker
                  value={formData.launchDate}
                  onChange={(val) =>
                    setFormData({ ...formData, launchDate: val })
                  }
                  placeholder="Pick a launch date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duration (e.g. 6 months)</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-fullDescription">
                Full Description (for Details Page Hero)
              </Label>
              <textarea
                id="edit-fullDescription"
                value={formData.fullDescription}
                onChange={(e) =>
                  setFormData({ ...formData, fullDescription: e.target.value })
                }
                className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                placeholder="e.g. WEB DEVELOPMENT, MOBILE APP"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-technologies">
                Technologies (comma separated)
              </Label>
              <Input
                id="edit-technologies"
                placeholder="e.g. Next.js, Node.js, AWS"
                value={formData.technologies}
                onChange={(e) =>
                  setFormData({ ...formData, technologies: e.target.value })
                }
                required
              />
            </div>
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
            <RichTextEditor
              label="Product Details Content (Rich Text)"
              value={formData.contentHtml}
              onChange={(html) =>
                setFormData({ ...formData, contentHtml: html })
              }
            />

            {/* Testimonial Section */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-semibold text-gray-800 pt-3">
                Testimonial{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (optional)
                </span>
              </p>
              <div className="space-y-2">
                <Label htmlFor="edit-testimonial-quote">Quote</Label>
                <textarea
                  id="edit-testimonial-quote"
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
                  <Label htmlFor="edit-testimonial-author">Author</Label>
                  <Input
                    id="edit-testimonial-author"
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
                  <Label htmlFor="edit-testimonial-role">Author Role</Label>
                  <Input
                    id="edit-testimonial-role"
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

            {/* SEO Section */}
            <div className="space-y-3 pt-2 border-t">
              <p className="text-sm font-semibold text-gray-800 pt-3">
                SEO Settings{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (optional)
                </span>
              </p>
              <div className="space-y-2">
                <Label htmlFor="edit-seo-metaTitle">Meta Title</Label>
                <Input
                  id="edit-seo-metaTitle"
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
                <Label htmlFor="edit-seo-metaDescription">
                  Meta Description
                </Label>
                <textarea
                  id="edit-seo-metaDescription"
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
                <Label htmlFor="edit-seo-keywords">
                  SEO Keywords (comma separated)
                </Label>
                <Input
                  id="edit-seo-keywords"
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

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1677ff] hover:bg-[#0f62d9] text-white"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0">
          <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Product Details
                </DialogTitle>
                <p className="text-gray-500 text-sm mt-1">
                  View complete product information
                </p>
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                ID: {selectedItem?._id?.slice(-8).toUpperCase() || "N/A"}
              </div>
            </div>
          </DialogHeader>

          {selectedItem && (
            <div className="p-6 space-y-6">
              {/* Main Info Section */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                    Product Title
                  </p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedItem.title || "N/A"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2.5 rounded-full text-blue-600 shrink-0">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Slug</p>
                      <p className="font-medium text-gray-900 break-all">
                        {selectedItem.slug || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2.5 rounded-full text-purple-600 shrink-0">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Client</p>
                      <p className="font-medium text-gray-900">
                        {selectedItem.client || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2.5 rounded-full text-orange-600 shrink-0">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">
                        Launch Date
                      </p>
                      <p className="font-medium text-gray-900">
                        {selectedItem.launchDate
                          ? new Date(
                              selectedItem.launchDate,
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2.5 rounded-full text-green-600 shrink-0">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                      <p className="font-medium text-gray-900">
                        {selectedItem.duration || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedItem.images && selectedItem.images.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    Product Images
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedItem.images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center"
                      >
                        <img
                          src={img}
                          alt={`${selectedItem.title} ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories, Tags & Technologies Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedItem.categories &&
                  selectedItem.categories.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        Categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.categories.map((cat: any) => (
                          <Badge
                            key={cat._id}
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1"
                          >
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedItem.tags &&
                  (Array.isArray(selectedItem.tags)
                    ? selectedItem.tags.length > 0
                    : selectedItem.tags.trim().length > 0) && (
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(selectedItem.tags)
                          ? selectedItem.tags
                          : selectedItem.tags
                              .split(",")
                              .map((t: string) => t.trim())
                              .filter(Boolean)
                        ).map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200 px-3 py-1 uppercase text-[10px] font-bold tracking-wider"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedItem.technologies &&
                  (Array.isArray(selectedItem.technologies)
                    ? selectedItem.technologies.length > 0
                    : selectedItem.technologies.trim().length > 0) && (
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(selectedItem.technologies)
                          ? selectedItem.technologies
                          : selectedItem.technologies
                              .split(",")
                              .map((t: string) => t.trim())
                              .filter(Boolean)
                        ).map((tech: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-100 px-3 py-1 font-medium"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                {selectedItem.description && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Short Description
                    </h4>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                      <p className="text-gray-700 leading-relaxed break-words">
                        {selectedItem.description}
                      </p>
                    </div>
                  </div>
                )}

                {selectedItem.fullDescription && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Full Description (Details Hero)
                    </h4>
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                      <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                        {selectedItem.fullDescription}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Testimonial Section */}
              {selectedItem.testimonial &&
                (selectedItem.testimonial.quote ||
                  selectedItem.testimonial.author) && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Testimonial
                    </h4>
                    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-5">
                      {selectedItem.testimonial.quote && (
                        <p className="text-gray-700 italic leading-relaxed mb-3">
                          “{selectedItem.testimonial.quote}”
                        </p>
                      )}
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedItem.testimonial.author || "N/A"}
                        {selectedItem.testimonial.role && (
                          <span className="text-gray-500 font-normal">
                            {" "}
                            — {selectedItem.testimonial.role}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

              {/* SEO Settings Section */}
              {selectedItem.seo && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    SEO Settings
                  </h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Meta Title
                      </p>
                      <p className="font-semibold text-gray-950">
                        {selectedItem.seo.metaTitle || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        Meta Description
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedItem.seo.metaDescription || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        SEO Keywords
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedItem.seo.seoKeywords &&
                        selectedItem.seo.seoKeywords.length > 0 ? (
                          selectedItem.seo.seoKeywords.map(
                            (kw: string, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-200/60 text-gray-800 text-xs"
                              >
                                {kw}
                              </Badge>
                            ),
                          )
                        ) : (
                          <span className="text-sm text-gray-500">None</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rich Details Content Section */}
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Detailed Content (Rich Text)
                </h4>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div
                    className="product-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedItem.contentHtml ||
                        "<p>No content provided.</p>",
                    }}
                  />
                </div>
                <style jsx global>{`
                  .product-content {
                    font-size: 0.9375rem;
                    line-height: 1.8;
                    color: #374151;
                    word-break: break-word;
                  }
                  .product-content h1 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    line-height: 1.3;
                    color: #111827;
                    margin-top: 1.75rem;
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #e5e7eb;
                  }
                  .product-content h2 {
                    font-size: 1.375rem;
                    font-weight: 600;
                    line-height: 1.35;
                    color: #1f2937;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                  }
                  .product-content h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    line-height: 1.4;
                    color: #1f2937;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                  }
                  .product-content p {
                    margin-bottom: 0.875rem;
                  }
                  .product-content p:last-child {
                    margin-bottom: 0;
                  }
                  .product-content strong {
                    font-weight: 700;
                    color: #111827;
                  }
                  .product-content em {
                    font-style: italic;
                  }
                  .product-content u {
                    text-decoration: underline;
                    text-underline-offset: 3px;
                  }
                  .product-content s {
                    text-decoration: line-through;
                    color: #9ca3af;
                  }
                  .product-content ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                  }
                  .product-content ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                  }
                  .product-content li {
                    margin-bottom: 0.25rem;
                    padding-left: 0.25rem;
                  }
                  .product-content li p {
                    margin-bottom: 0.25rem;
                  }
                  .product-content blockquote {
                    border-left: 4px solid #1677ff;
                    padding: 0.75rem 1rem;
                    margin: 1.25rem 0;
                    background-color: #f0f6ff;
                    border-radius: 0 8px 8px 0;
                    color: #374151;
                    font-style: italic;
                  }
                  .product-content blockquote p {
                    margin-bottom: 0;
                  }
                  .product-content code {
                    background-color: #f3f4f6;
                    border: 1px solid #e5e7eb;
                    border-radius: 4px;
                    padding: 2px 6px;
                    font-size: 0.85em;
                    font-family: "JetBrains Mono", "Fira Code", monospace;
                    color: #dc2626;
                  }
                  .product-content pre {
                    background-color: #1e293b;
                    color: #e2e8f0;
                    border-radius: 8px;
                    padding: 1rem 1.25rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                    font-size: 0.85em;
                    line-height: 1.7;
                  }
                  .product-content pre code {
                    background: none;
                    border: none;
                    padding: 0;
                    color: inherit;
                    font-size: inherit;
                  }
                  .product-content a {
                    color: #1677ff;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    transition: color 0.15s;
                  }
                  .product-content a:hover {
                    color: #0f62d9;
                  }
                  .product-content mark {
                    background-color: #fef08a;
                    padding: 1px 4px;
                    border-radius: 3px;
                  }
                  .product-content hr {
                    border: none;
                    border-top: 2px solid #e5e7eb;
                    margin: 1.75rem 0;
                  }
                  .product-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 1rem 0;
                    border: 1px solid #e5e7eb;
                  }
                  .product-content > *:first-child {
                    margin-top: 0;
                  }
                `}</style>
              </div>
            </div>
          )}

          <div className="p-4 border-t sticky bottom-0 bg-white z-10 flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsViewOpen(false)}
              className="px-8 border-gray-300 font-medium"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        title="Delete Product"
        description={`Are you sure you want to delete ${selectedItem?.title}?`}
      />
    </div>
  );
}
