"use client";


import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import ProductDetailsModal from "./ProductDetailsModal";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";

export default function ProductsTable() {
  const {
    selectedProduct,
    setSelectedProduct,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    isAddModalOpen,
    isEditModalOpen,
    isDetailsModalOpen,
    isDeleteDialogOpen,
    setAddModalOpen,
    setEditModalOpen,
    setDetailsModalOpen,
    setDeleteDialogOpen,
  } = useProductStore();

  const { products, isLoading, deleteProduct } = useProducts({
    offset: currentPage * itemsPerPage,
    limit: itemsPerPage,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!Array.isArray(products)) {
    return <div>No products found.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🛒</span> Product Management
        </h2>
        <Button onClick={() => setAddModalOpen(true)}>Add Product</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Image</th>
              <th className="px-4 py-2 border-b text-left">Title</th>
              <th className="px-4 py-2 border-b text-left">Price</th>
              <th className="px-4 py-2 border-b text-left">Category</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border-b">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex flex-col">
                    <span>{product.title}</span>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex flex-col">
                    <span>${product.price}</span>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex flex-col">
                    <span>{product.category.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedProduct(product);
                        setDetailsModalOpen(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedProduct(product);
                        setEditModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedProduct(product);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={!products || products.length < itemsPerPage}
        >
          Next
        </Button>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={selectedProduct}
      />
      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        product={selectedProduct}
      />
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          if (selectedProduct) {
            deleteProduct.mutate(selectedProduct.id);
            setDeleteDialogOpen(false);
          }
        }}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
      />
    </div>
  );
}
