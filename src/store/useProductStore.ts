import { create } from "zustand";
import { Product } from "@/types";
import api from "@/lib/api";

type ProductStore = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  selectedProduct: Product | null;
  currentPage: number;
  itemsPerPage: number;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDetailsModalOpen: boolean;
  isDeleteDialogOpen: boolean;

  // Actions
  setProducts: (products: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (limit: number) => void;
  setAddModalOpen: (isOpen: boolean) => void;
  setEditModalOpen: (isOpen: boolean) => void;
  setDetailsModalOpen: (isOpen: boolean) => void;
  setDeleteDialogOpen: (isOpen: boolean) => void;
  
  // Fetch products
  fetchProducts: () => Promise<void>;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
  currentPage: 0,
  itemsPerPage: 10,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDetailsModalOpen: false,
  isDeleteDialogOpen: false,

  // Setters
  setProducts: (products) => set({ products }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (limit) => set({ itemsPerPage: limit }),
  setAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
  setEditModalOpen: (isOpen) => set({ isEditModalOpen: isOpen }),
  setDetailsModalOpen: (isOpen) => set({ isDetailsModalOpen: isOpen }),
  setDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),

  // Fetch products with pagination
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const { currentPage, itemsPerPage } = get();
      const response = await api.get(
        `/products?offset=${currentPage}&limit=${itemsPerPage}`
      );
      set({ products: response.data });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },
}));