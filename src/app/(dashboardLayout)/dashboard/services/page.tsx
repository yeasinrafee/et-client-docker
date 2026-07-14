"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import ActionMenu from "@/components/Dashboard/Shared/ActionMenu";
import DeleteModal from "@/components/Dashboard/Shared/DeleteModal";
import PaginationControls from "@/components/Dashboard/Shared/PaginationControls";
import SearchBar from "@/components/Dashboard/Shared/SearchBar";
import { useCrud } from "@/hooks/useCrud";

export default function ServicesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { useGetItems, useDeleteItem } = useCrud("services");
  const { data, isLoading } = useGetItems({ page, limit, search });
  const deleteMutation = useDeleteItem();

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDelete = () => {
    if (selectedItem) {
      deleteMutation.mutate(selectedItem._id, {
        onSuccess: () => setIsDeleteOpen(false),
      });
    }
  };

  const openView = (item: any) => { setSelectedItem(item); setIsViewOpen(true); };
  const openEdit = (item: any) => router.push(`/dashboard/services/create?id=${item._id}`);
  const openDelete = (item: any) => { setSelectedItem(item); setIsDeleteOpen(true); };

  const allItems = Array.isArray(data?.data) ? data.data : [];
  const filteredItems = allItems.filter((item: any) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.slug?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems.length / limit);
  const items = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
      </div>

      <div className="flex justify-between items-center mb-6 py-4">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
        <Button
          onClick={() => router.push("/dashboard/services/create")}
          className="bg-[#1677ff] hover:bg-[#0f62d9] text-white h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Service
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="w-[60px] font-semibold text-gray-700">#</TableHead>
              <TableHead className="w-[80px] font-semibold text-gray-700">Image</TableHead>
              <TableHead className="font-semibold text-gray-700">Title</TableHead>
              <TableHead className="font-semibold text-gray-700">Slug</TableHead>
              <TableHead className="font-semibold text-gray-700">Description</TableHead>
              <TableHead className="w-[100px] text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">Loading...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">No data found.</TableCell>
              </TableRow>
            ) : (
              items.map((item: any, index: number) => (
                <TableRow key={item._id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-500">{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                      {item.images && item.images.length > 0 ? (
                        <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-[10px] text-gray-400 font-medium uppercase">No Img</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{item.title}</TableCell>
                  <TableCell className="text-gray-600">{item.slug}</TableCell>
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
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0">
          <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">Service Details</DialogTitle>
                <p className="text-gray-500 text-sm mt-1">View complete service information</p>
              </div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                ID: {selectedItem?._id?.slice(-8).toUpperCase() || "N/A"}
              </div>
            </div>
          </DialogHeader>

          {selectedItem && (
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Title</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedItem.title || "N/A"}</h3>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="bg-blue-100 p-2.5 rounded-full text-blue-600 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Slug</p>
                    <p className="font-medium text-gray-900 break-all">{selectedItem.slug || "N/A"}</p>
                  </div>
                </div>
              </div>

              {selectedItem.images && selectedItem.images.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    Service Images
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedItem.images.map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img src={img} alt={`${selectedItem.title} ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.features && selectedItem.features.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.features.map((f: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-100">{f}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.description && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Short Description</h4>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{selectedItem.description}</p>
                </div>
              )}

              {selectedItem.longDescription && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-base">Long Description</h4>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-line">{selectedItem.longDescription}</p>
                </div>
              )}

              {selectedItem.contentHtml && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-base">Service Content (Rich Text)</h4>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div
                      className="product-content"
                      dangerouslySetInnerHTML={{ __html: selectedItem.contentHtml || "<p>No content provided.</p>" }}
                    />
                  </div>
                  <style jsx global>{`
                    .product-content { font-size: 0.9375rem; line-height: 1.8; color: #374151; word-break: break-word; }
                    .product-content h1 { font-size: 1.75rem; font-weight: 700; color: #111827; margin-top: 1.75rem; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; }
                    .product-content h2 { font-size: 1.375rem; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.5rem; }
                    .product-content h3 { font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-top: 1.25rem; margin-bottom: 0.5rem; }
                    .product-content p { margin-bottom: 0.875rem; }
                    .product-content p:last-child { margin-bottom: 0; }
                    .product-content strong { font-weight: 700; color: #111827; }
                    .product-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
                    .product-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
                    .product-content li { margin-bottom: 0.25rem; padding-left: 0.25rem; }
                    .product-content blockquote { border-left: 4px solid #1677ff; padding: 0.75rem 1rem; margin: 1.25rem 0; background-color: #f0f6ff; border-radius: 0 8px 8px 0; color: #374151; font-style: italic; }
                    .product-content code { background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 4px; padding: 2px 6px; font-size: 0.85em; color: #dc2626; }
                    .product-content pre { background-color: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 1rem 1.25rem; overflow-x: auto; margin: 1rem 0; }
                    .product-content pre code { background: none; border: none; padding: 0; color: inherit; }
                    .product-content a { color: #1677ff; text-decoration: underline; }
                    .product-content > *:first-child { margin-top: 0; }
                    .product-content table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9em; }
                    .product-content th, .product-content td { border: 1px solid #d1d5db; padding: 0.6rem 0.875rem; text-align: left; }
                    .product-content th { background-color: #f3f4f6; font-weight: 600; color: #111827; }
                    .product-content tr:nth-child(even) td { background-color: #f9fafb; }
                  `}</style>
                </div>
              )}

              {selectedItem.seo && (selectedItem.seo.metaTitle || selectedItem.seo.metaDescription || (selectedItem.seo.seoKeywords && selectedItem.seo.seoKeywords.length > 0)) && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-base">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    SEO Settings
                  </h4>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
                    {selectedItem.seo.metaTitle && (
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Meta Title</p>
                        <p className="text-sm font-medium text-gray-800">{selectedItem.seo.metaTitle}</p>
                      </div>
                    )}
                    {selectedItem.seo.metaDescription && (
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Meta Description</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedItem.seo.metaDescription}</p>
                      </div>
                    )}
                    {selectedItem.seo.seoKeywords && selectedItem.seo.seoKeywords.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">SEO Keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedItem.seo.seoKeywords.map((kw: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="bg-white text-gray-600 text-[10px]">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-4 border-t sticky bottom-0 bg-white z-10 flex justify-end">
            <Button variant="outline" onClick={() => setIsViewOpen(false)} className="px-8 border-gray-300 font-medium">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        title="Delete Service"
        description={`Are you sure you want to delete ${selectedItem?.title}?`}
      />
    </div>
  );
}
