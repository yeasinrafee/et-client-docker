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
import ImageUpload from "@/components/Dashboard/Shared/ImageUpload";
import { useCrud } from "@/hooks/useCrud";

export default function IndustriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { useGetItems, useCreateItem, useUpdateItem, useDeleteItem } = useCrud("industries");
  const { data, isLoading } = useGetItems({ page, limit, search });
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({ title: "", description: "", image: null });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, String(value));
        }
      }
    });

    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setFormData({ title: "", description: "", image: null });
      },
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (value instanceof File) {
            data.append(key, value);
          } else {
            data.append(key, String(value));
          }
        }
      });

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
    setFormData({ title: item.title || "", description: item.description || "", image: item.image || null });
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
    item.title?.toLowerCase().includes(search.toLowerCase()) || 
    item.description?.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const items = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Industries</h1>
      </div>

      <div className="flex justify-between items-center mb-6 py-4">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[#1677ff] hover:bg-[#0f62d9] text-white h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Create Industry
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[60px] font-semibold text-gray-700">#</TableHead>
              <TableHead className="w-[80px] font-semibold text-gray-700">Image</TableHead>
              <TableHead className="font-semibold text-gray-700">Title</TableHead>
              <TableHead className="font-semibold text-gray-700">Description</TableHead>
              <TableHead className="w-[100px] text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">Loading...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">No data found.</TableCell>
              </TableRow>
            ) : (
              items.map((item: any, index: number) => (
                <TableRow key={item._id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-500">{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-[10px] text-gray-400 font-medium uppercase">No Img</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{item.title}</TableCell>
                  <TableCell className="truncate max-w-xs text-gray-600">{item.description}</TableCell>
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
            <DialogTitle>Create Industry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <ImageUpload 
              label="Industry Image"
              value={formData.image} 
              onChange={(file) => setFormData({ ...formData, image: file })} 
            />
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
            <DialogTitle>Edit Industry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <ImageUpload 
              label="Industry Image"
              value={formData.image} 
              onChange={(file) => setFormData({ ...formData, image: file })} 
            />
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
                <DialogTitle className="text-2xl font-bold text-gray-900">Industry Details</DialogTitle>
                <p className="text-gray-500 text-sm mt-1">View complete industry information</p>
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
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Industry Title</p>
                  <h3 className="text-xl font-bold text-gray-900">{selectedItem.title || "N/A"}</h3>
                </div>
                
                {selectedItem.image && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 bg-white mt-2 flex items-center justify-center">
                      <img 
                        src={selectedItem.image} 
                        alt={selectedItem.title} 
                        className="max-h-[200px] w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Description
                </h4>
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{selectedItem.description || "No description provided."}</p>
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
        title="Delete Industry"
        description={`Are you sure you want to delete ${selectedItem?.title}?`}
      />
    </div>
  );
}
