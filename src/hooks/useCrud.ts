import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FetchOptions {
  page: number;
  limit: number;
  search: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function useCrud<T>(endpoint: string) {
  const queryClient = useQueryClient();
  const url = `${API_BASE_URL}/${endpoint}`;

  const fetchItems = async ({ page, limit, search }: FetchOptions) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { searchTerm: search }),
    });
    const res = await fetch(`${url}?${params}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch data");
    return result;
  };

  const createItem = async (data: any) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create item");
    return result;
  };

  const updateItem = async ({ id, data }: { id: string; data: any }) => {
    const res = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update item");
    return result;
  };

  const deleteItem = async (id: string) => {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete item");
    return result;
  };

  return {
    useGetItems: (options: FetchOptions) =>
      useQuery({
        queryKey: [endpoint, options],
        queryFn: () => fetchItems(options),
      }),

    useCreateItem: () =>
      useMutation({
        mutationFn: createItem,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [endpoint] });
        },
      }),

    useUpdateItem: () =>
      useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [endpoint] });
        },
      }),

    useDeleteItem: () =>
      useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [endpoint] });
        },
      }),
  };
}
