"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.number().min(1, "Category ID is required"),
  images: z.string().min(1, "At least one image URL is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function EditProductModal({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}) {
  const { updateProduct } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: product.category.id,
          images: product.images.join(", "),
        }
      : undefined,
  });

  const onSubmit = async (data: ProductFormData) => {
    if (!product) return;
    await updateProduct.mutateAsync({
      id: product.id,
      title: data.title,
      price: data.price,
      description: data.description,
      images: data.images.split(",").map((url) => url.trim()),
      category: {
        id: data.categoryId,
        name: product.category.name,
      },
    });
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="categoryId">Category ID</Label>
            <Input
              id="categoryId"
              type="number"
              {...register("categoryId", { valueAsNumber: true })}
            />
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="images">Image URLs (comma separated)</Label>
            <Input id="images" {...register("images")} />
            {errors.images && (
              <p className="text-sm text-red-500">{errors.images.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
