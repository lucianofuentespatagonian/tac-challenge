"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductoForm } from "@/components/productos/ProductoForm";
import { useProductos } from "@/hooks/useProductos";
import { ProductoFormData } from "@/types";

export default function NuevoProductoPage() {
  const router = useRouter();
  const { createProducto } = useProductos();

  const handleSubmit = (data: ProductoFormData) => {
    createProducto(data);
    router.push("/productos");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Nuevo Producto</h1>
          <p className="text-muted-foreground">
            Agrega un nuevo producto al catálogo
          </p>
        </div>

        <ProductoForm onSubmit={handleSubmit} />
      </div>
    </MainLayout>
  );
}
