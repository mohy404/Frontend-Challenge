import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Product } from "@/types";
import { useProductStore } from "@/store/useProductStore";

interface UseProductsParams {
  offset?: number;
  limit?: number;
}

export const useProducts = ({
  offset = 0,
  limit = 10,
}: UseProductsParams = {}) => {
  const queryClient = useQueryClient();
  const { setProducts, setIsLoading, setError } = useProductStore();

  // Fetch products
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", offset, limit],
    queryFn: async () => {
      try {
        const response = await api.get(
          `/products?offset=${offset}&limit=${limit}`
        );
        setProducts(response.data);
        return response.data;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Add product
  const addProduct = useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const response = await api.post("/products", newProduct);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Update product
  const updateProduct = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const response = await api.put(
        `/products/${updatedProduct.id}`,
        updatedProduct
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};