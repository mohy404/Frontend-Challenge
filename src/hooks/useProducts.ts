import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Product } from "@/types";

interface UseProductsParams {
  offset?: number;
  limit?: number;
}

export const useProducts = ({
  offset = 0,
  limit = 10,
}: UseProductsParams = {}) => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", offset, limit],
    queryFn: async () => {
      const response = await api.get(
        `/products?offset=${offset}&limit=${limit}`
      );
      return response.data;
    },
  });

  const addProduct = useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const { category, ...productData } = newProduct;
      const response = await api.post("/products", {
        ...productData,
        categoryId: category.id,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const { category, ...productData } = updatedProduct;
      const response = await api.put(`/products/${updatedProduct.id}`, {
        ...productData,
        categoryId: category.id,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
