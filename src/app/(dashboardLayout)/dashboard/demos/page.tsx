"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import ActionMenu from "@/components/Dashboard/Shared/ActionMenu";
import DeleteModal from "@/components/Dashboard/Shared/DeleteModal";
import PaginationControls from "@/components/Dashboard/Shared/PaginationControls";
import SearchBar from "@/components/Dashboard/Shared/SearchBar";
import { Badge } from "@/components/ui/badge";
import { useCrud } from "@/hooks/useCrud";

export default function DemosPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { useGetItems, useDeleteItem } = useCrud("demos");
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

  const openEdit = (item: any) => {
    router.push(`/dashboard/demos/create?id=${item._id}`);
  };

  const openCreate = () => {
    router.push("/dashboard/demos/create");
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
    item.slug?.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / limit);
  const items = filteredItems.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Demos</h1>
      </div>

      <div className="flex justify-between items-center mb-6 py-4">
        <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
        <Button onClick={openCreate} className="bg-[#1677ff] hover:bg-[#0f62d9] text-white h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Create Demo
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
              <TableHead className="font-semibold text-gray-700">Categories</TableHead>
              <TableHead className="font-semibold text-gray-700">Demo URL</TableHead>
              <TableHead className="w-[100px] text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">Loading...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">No data found.</TableCell>
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
                  <TableCell className="text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {item.categories?.map((cat: any) => (
                        <Badge key={cat._id} variant="secondary" className="text-[10px] py-0 px-1 bg-blue-50 text-blue-600 border-blue-100">
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.demoUrl ? (
                      <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                        View Demo
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
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

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0">
          <DialogHeader className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">Demo Details</DialogTitle>
                <p className="text-gray-500 text-sm mt-1">View complete demo information</p>
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
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Title</p>
                  <h3 className="text-xl font-bold text-gray-900">{selectedItem.title || "N/A"}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2.5 rounded-full text-blue-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Slug</p>
                      <p className="font-medium text-gray-900 break-all">{selectedItem.slug || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2.5 rounded-full text-purple-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Demo URL</p>
                      {selectedItem.demoUrl ? (
                        <a href={selectedItem.demoUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                          Open Link
                        </a>
                      ) : (
                        <p className="font-medium text-gray-900">N/A</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedItem.images && selectedItem.images.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    Demo Images
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedItem.images.map((img: string, idx: number) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img 
                          src={img} 
                          alt={`${selectedItem.title} ${idx + 1}`} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Section */}
              {selectedItem.categories && selectedItem.categories.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.categories.map((cat: any) => (
                      <Badge key={cat._id} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1">
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags, Technologies & Features View */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.tags.map((t: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-600 uppercase text-[10px] font-bold tracking-wider">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedItem.technologies && selectedItem.technologies.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.technologies.map((t: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-100 font-medium">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedItem.features && selectedItem.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.features.map((f: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-medium">
                          {f}
                        </Badge>
                      ))}
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

              {selectedItem.contentHtml && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Demo Content (Rich Text)
                  </h4>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
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
                    .product-content table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.9em; }
                    .product-content th, .product-content td { border: 1px solid #d1d5db; padding: 0.6rem 0.875rem; text-align: left; }
                    .product-content th { background-color: #f3f4f6; font-weight: 600; color: #111827; }
                    .product-content tr:nth-child(even) td { background-color: #f9fafb; }
                  `}</style>
                </div>
              )}

              {selectedItem.seo && (selectedItem.seo.metaTitle || selectedItem.seo.metaDescription || (selectedItem.seo.seoKeywords && selectedItem.seo.seoKeywords.length > 0)) && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 text-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
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
                            <Badge key={idx} variant="outline" className="bg-white text-gray-600 text-[10px]">
                              {kw}
                            </Badge>
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        title="Delete Demo"
        description={`Are you sure you want to delete ${selectedItem?.title}?`}
      />
    </div>
  );
}
