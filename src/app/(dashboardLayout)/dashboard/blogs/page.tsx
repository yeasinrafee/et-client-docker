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
import ActionMenu from "@/components/Dashboard/Shared/ActionMenu";
import DeleteModal from "@/components/Dashboard/Shared/DeleteModal";
import ImageUpload from "@/components/Dashboard/Shared/ImageUpload";
import PaginationControls from "@/components/Dashboard/Shared/PaginationControls";
import SearchBar from "@/components/Dashboard/Shared/SearchBar";
import RichTextEditor from "@/components/Dashboard/Shared/RichTextEditor";
import { Badge } from "@/components/ui/badge";
import { useCrud } from "@/hooks/useCrud";

export default function BlogsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { useGetItems, useCreateItem, useUpdateItem, useDeleteItem } =
    useCrud("blogs");
  const { data, isLoading } = useGetItems({ page, limit, search });
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    title: "",
    authorName: "",
    shortDescription: "",
    content: "",
    tags: "",
    image: null,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    const textData: any = {};

    // Process tags from comma-separated string
    const tagsArray = typeof formData.tags === "string"
      ? formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : formData.tags || [];

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        data.append("image", value);
      } else if (key === "tags") {
        textData.tags = tagsArray;
      } else if (value !== null && value !== undefined) {
        textData[key] = value;
      }
    });

    data.append("data", JSON.stringify(textData));

    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setFormData({
          title: "",
          authorName: "",
          shortDescription: "",
          content: "",
          tags: "",
          image: null,
        });
      },
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      const data = new FormData();
      const textData: any = {};

      // Process tags from comma-separated string
      const tagsArray = typeof formData.tags === "string"
        ? formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : formData.tags || [];

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          data.append("image", value);
        } else if (key === "tags") {
          textData.tags = tagsArray;
        } else if (value !== null && value !== undefined) {
          textData[key] = value;
        }
      });

      data.append("data", JSON.stringify(textData));

      updateMutation.mutate(
        { id: selectedItem._id, data: data },
        {
          onSuccess: () => setIsEditOpen(false),
        }
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
    setFormData({
      title: item.title || "",
      authorName: item.authorName || "",
      shortDescription: item.shortDescription || "",
      content: item.content || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      image: item.image || null,
    });
    setIsEditOpen(true);
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
      item.authorName?.toLowerCase().includes(search.toLowerCase()) ||
      item.shortDescription?.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const items = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
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
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#1677ff] hover:bg-[#0f62d9] text-white h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Blog
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
                Author
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Tags
              </TableHead>
              <TableHead className="w-[100px] text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Loading...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
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
                      {item.image ? (
                        <img
                          src={item.image}
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
                  <TableCell className="font-medium text-gray-900 max-w-[200px] truncate">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.authorName}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.slice(0, 3).map((tag: string, i: number) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-[10px] py-0 px-1.5 bg-blue-50 text-blue-600 border-blue-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {item.tags?.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] py-0 px-1.5 bg-gray-50 text-gray-500"
                        >
                          +{item.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
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
            <DialogTitle>Create Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) =>
                    setFormData({ ...formData, authorName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shortDescription: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g. tech, ai, design"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
            <ImageUpload
              label="Blog Cover Image"
              value={formData.image}
              onChange={(file) => setFormData({ ...formData, image: file })}
            />
            <RichTextEditor
              label="Content"
              value={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
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
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-authorName">Author Name</Label>
                <Input
                  id="edit-authorName"
                  value={formData.authorName}
                  onChange={(e) =>
                    setFormData({ ...formData, authorName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-shortDescription">Short Description</Label>
              <Input
                id="edit-shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shortDescription: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                placeholder="e.g. tech, ai, design"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
            <ImageUpload
              label="Blog Cover Image"
              value={formData.image}
              onChange={(file) => setFormData({ ...formData, image: file })}
            />
            <RichTextEditor
              label="Content"
              value={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
            />
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
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0">
          <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Blog Details
                </DialogTitle>
                <p className="text-gray-500 text-sm mt-1">
                  View complete blog information
                </p>
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                ID: {selectedItem?._id?.slice(-8).toUpperCase() || "N/A"}
              </div>
            </div>
          </DialogHeader>

          {selectedItem && (
            <div className="p-6 space-y-6">
              {/* Cover Image */}
              {selectedItem.image && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title & Meta */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                    Title
                  </p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedItem.title || "N/A"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2.5 rounded-full text-blue-600">
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
                      <p className="text-xs text-gray-500 mb-0.5">Author</p>
                      <p className="font-medium text-gray-900">
                        {selectedItem.authorName || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2.5 rounded-full text-purple-600">
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
                </div>
              </div>

              {/* Tags */}
              {selectedItem.tags && selectedItem.tags.length > 0 && (
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
                    {selectedItem.tags.map((tag: string, i: number) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Short Description */}
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
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedItem.shortDescription ||
                      "No description provided."}
                  </p>
                </div>
              </div>

              {/* Content */}
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
                  Content
                </h4>
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                      __html: selectedItem.content || "<p>No content.</p>",
                    }}
                  />
                </div>
                <style jsx global>{`
                  .blog-content {
                    font-size: 0.9375rem;
                    line-height: 1.8;
                    color: #374151;
                    word-break: break-word;
                  }
                  .blog-content h1 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    line-height: 1.3;
                    color: #111827;
                    margin-top: 1.75rem;
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #e5e7eb;
                  }
                  .blog-content h2 {
                    font-size: 1.375rem;
                    font-weight: 600;
                    line-height: 1.35;
                    color: #1f2937;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                  }
                  .blog-content h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    line-height: 1.4;
                    color: #1f2937;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                  }
                  .blog-content p {
                    margin-bottom: 0.875rem;
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
                    text-underline-offset: 3px;
                  }
                  .blog-content s {
                    text-decoration: line-through;
                    color: #9ca3af;
                  }
                  .blog-content ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                  }
                  .blog-content ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                  }
                  .blog-content li {
                    margin-bottom: 0.25rem;
                    padding-left: 0.25rem;
                  }
                  .blog-content li p {
                    margin-bottom: 0.25rem;
                  }
                  .blog-content blockquote {
                    border-left: 4px solid #1677ff;
                    padding: 0.75rem 1rem;
                    margin: 1.25rem 0;
                    background-color: #f0f6ff;
                    border-radius: 0 8px 8px 0;
                    color: #374151;
                    font-style: italic;
                  }
                  .blog-content blockquote p {
                    margin-bottom: 0;
                  }
                  .blog-content code {
                    background-color: #f3f4f6;
                    border: 1px solid #e5e7eb;
                    border-radius: 4px;
                    padding: 2px 6px;
                    font-size: 0.85em;
                    font-family: 'JetBrains Mono', 'Fira Code', monospace;
                    color: #dc2626;
                  }
                  .blog-content pre {
                    background-color: #1e293b;
                    color: #e2e8f0;
                    border-radius: 8px;
                    padding: 1rem 1.25rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                    font-size: 0.85em;
                    line-height: 1.7;
                  }
                  .blog-content pre code {
                    background: none;
                    border: none;
                    padding: 0;
                    color: inherit;
                    font-size: inherit;
                  }
                  .blog-content a {
                    color: #1677ff;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    transition: color 0.15s;
                  }
                  .blog-content a:hover {
                    color: #0f62d9;
                  }
                  .blog-content mark {
                    background-color: #fef08a;
                    padding: 1px 4px;
                    border-radius: 3px;
                  }
                  .blog-content hr {
                    border: none;
                    border-top: 2px solid #e5e7eb;
                    margin: 1.75rem 0;
                  }
                  .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 1rem 0;
                    border: 1px solid #e5e7eb;
                  }
                  .blog-content > *:first-child {
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
        title="Delete Blog"
        description={`Are you sure you want to delete "${selectedItem?.title}"?`}
      />
    </div>
  );
}
