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

export default function ReviewsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { useGetItems, useCreateItem, useUpdateItem, useDeleteItem } = useCrud("reviews");
  const { data, isLoading } = useGetItems({ page, limit, search });
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({ name: "", company: "", review: "", rating: 5, avatar: null });

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
        setFormData({ name: "", company: "", review: "", rating: 5, avatar: null });
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
    setFormData({ 
      name: item.name || "", 
      company: item.company || "", 
      review: item.review || "",
      rating: item.rating || 5,
      avatar: item.avatar || null
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
  const filteredItems = allItems.filter((item: any) => 
    item.name?.toLowerCase().includes(search.toLowerCase()) || 
    item.company?.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const items = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Reviews</h1>
      </div>

      <div className="flex justify-between items-center mb-6 py-4">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
        <Button onClick={() => setIsCreateOpen(true)} className="bg-[#1677ff] hover:bg-[#0f62d9] text-white h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Create Review
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[60px] font-semibold text-gray-700">#</TableHead>
              <TableHead className="w-[80px] font-semibold text-gray-700">Avatar</TableHead>
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Company</TableHead>
              <TableHead className="font-semibold text-gray-700">Rating</TableHead>
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
                  <TableCell>
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-[10px] text-gray-400 font-medium uppercase">No Img</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                  <TableCell className="text-gray-600">{item.company || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-amber-500">
                      <span className="font-medium mr-1 text-gray-900">{item.rating}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
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
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Review</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="review">Review</Label>
              <Input
                id="review"
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                required
              />
            </div>
            <ImageUpload 
              label="Reviewer Avatar"
              value={formData.avatar} 
              onChange={(file) => setFormData({ ...formData, avatar: file })} 
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
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-company">Company</Label>
              <Input
                id="edit-company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-review">Review</Label>
              <Input
                id="edit-review"
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rating">Rating</Label>
              <Input
                id="edit-rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                required
              />
            </div>
            <ImageUpload 
              label="Reviewer Avatar"
              value={formData.avatar} 
              onChange={(file) => setFormData({ ...formData, avatar: file })} 
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
                <DialogTitle className="text-2xl font-bold text-gray-900">Review Details</DialogTitle>
                <p className="text-gray-500 text-sm mt-1">View complete review information</p>
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                ID: {selectedItem?._id?.slice(-8).toUpperCase() || 'N/A'}
              </div>
            </div>
          </DialogHeader>
          
          {selectedItem && (
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {selectedItem.avatar && (
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-white flex-shrink-0">
                        <img 
                          src={selectedItem.avatar} 
                          alt={selectedItem.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Reviewer Name</p>
                      <h3 className="text-xl font-bold text-gray-900">{selectedItem.name || "N/A"}</h3>
                    </div>
                  </div>
                  <div className="flex items-center bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg border border-amber-200">
                    <span className="font-bold mr-1.5">{selectedItem.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < selectedItem.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={i < selectedItem.rating ? "text-amber-500" : "text-amber-200"}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2.5 rounded-full text-indigo-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Company</p>
                      <p className="font-medium text-gray-900 break-words">{selectedItem.company || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Review Content
                </h4>
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap italic break-words">"{selectedItem.review || "No review content provided."}"</p>
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
        title="Delete Review"
        description={`Are you sure you want to delete ${selectedItem?.name}'s review?`}
      />
    </div>
  );
}
