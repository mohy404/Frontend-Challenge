import { Product } from "@/types";
import { create } from "zustand";

type ProductStore = {
  // Product state
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Search and filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    categoryId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
  };
  setFilters: (filters: ProductStore["filters"]) => void;

  // Pagination state
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (limit: number) => void;

  // Modal states
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDetailsModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  setAddModalOpen: (isOpen: boolean) => void;
  setEditModalOpen: (isOpen: boolean) => void;
  setDetailsModalOpen: (isOpen: boolean) => void;
  setDeleteDialogOpen: (isOpen: boolean) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  // Product state
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // Search and filter state
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  filters: {
    categoryId: null,
    minPrice: null,
    maxPrice: null,
  },
  setFilters: (filters) => set({ filters }),

  // Pagination state
  currentPage: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  itemsPerPage: 10,
  setItemsPerPage: (limit) => set({ itemsPerPage: limit }),

  // Modal states
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDetailsModalOpen: false,
  isDeleteDialogOpen: false,
  setAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
  setEditModalOpen: (isOpen) => set({ isEditModalOpen: isOpen }),
  setDetailsModalOpen: (isOpen) => set({ isDetailsModalOpen: isOpen }),
  setDeleteDialogOpen: (isOpen) => set({ isDeleteDialogOpen: isOpen }),
}));
