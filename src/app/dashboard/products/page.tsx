"use client";
import { useStore } from "@/store/useStore";

export default function ProductsPage() {
  const user = useStore((state) => state.user);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>This is the products page.</p>
    </div>
  );
}