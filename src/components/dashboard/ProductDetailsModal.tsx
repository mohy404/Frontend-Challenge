"use client";

import { Product } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProductDetailsModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Title:</p>
            <p>{product.title}</p>
          </div>
          <div>
            <p className="font-semibold">Price:</p>
            <p>${product.price}</p>
          </div>
          <div>
            <p className="font-semibold">Description:</p>
            <p>{product.description}</p>
          </div>
          <div>
            <p className="font-semibold">Category:</p>
            <p>{product.category.name}</p>
          </div>
          <div>
            <p className="font-semibold">Images:</p>
            <div className="grid grid-cols-2 gap-2">
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product.title} image ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-auto rounded"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
