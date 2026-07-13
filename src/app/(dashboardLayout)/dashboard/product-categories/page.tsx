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
import { useCrud } from "@/hooks/useCrud";

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

export default function ProductCategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { useGetItems, useCreateItem, useUpdateItem, useDeleteItem } = useCrud("product-categories");
  const { data, isLoading } = useGetItems({ page, limit, search });
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });

  const handleNameChange = (value: string) => {
    setFormData((prev: any) => {
      const prevNameSlug = slugify(prev.name || "");
      const currentSlug = prev.slug || "";
      const shouldAutoGenerate = currentSlug === "" || currentSlug === prevNameSlug;
      return {
        ...prev,
        name: value,
        slug: shouldAutoGenerate ? slugify(value) : currentSlug,
      };
    });
  };

  const handleSlugChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, slug: value }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setFormData({ name: "", slug: "" });
      },
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      updateMutation.mutate(
        { id: selectedItem._id, data: formData },
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
    setFormData({ name: item.name || "", slug: item.slug || "" });
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
  const filteredItems = allItems.filter((item: any) => 
    item.name?.toLowerCase().includes(search.toLowerCase()) || 
    item.slug?.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const items = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Product Categories</h1>
      </div>

      <div className="flex justify-between items-center mb-6 py-4">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[#1677ff] hover:bg-[#0f62d9] text-white h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Create Category
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[60px] font-semibold text-gray-700">#</TableHead>
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Slug</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">Products</TableHead>
              <TableHead className="w-[100px] text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">Loading...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">No data found.</TableCell>
              </TableRow>
            ) : (
              items.map((item: any, index: number) => (
                <TableRow key={item._id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-500">{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                  <TableCell className="text-gray-600">{item.slug}</TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full min-w-[24px]">
                      {item.productCount || 0}
                    </span>
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
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Product Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#1677ff] hover:bg-[#0f62d9] text-white" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#1677ff] hover:bg-[#0f62d9] text-white" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0">
          <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">Category Details</DialogTitle>
                <p className="text-gray-500 text-sm mt-1">View complete category information</p>
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                ID: {selectedItem?._id?.slice(-8).toUpperCase() || 'N/A'}
              </div>
            </div>
          </DialogHeader>
          
          {selectedItem && (
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Category Name</p>
                  <h3 className="text-xl font-bold text-gray-900">{selectedItem.name || "N/A"}</h3>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2.5 rounded-full text-blue-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Slug</p>
                      <p className="font-medium text-gray-900 break-all">{selectedItem.slug || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-4 border-t sticky bottom-0 bg-white z-10 flex justify-end">
            <Button variant="outline" onClick={() => setIsViewOpen(false)} className="px-8 border-gray-300 font-medium">
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
        title="Delete Product Category"
        description={`Are you sure you want to delete ${selectedItem?.name}?`}
      />
    </div>
  );
}
