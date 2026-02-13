"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductoForm } from "@/components/productos/ProductoForm";
import { Button } from "@/components/ui/button";
import { useProductos } from "@/hooks/useProductos";
import { ProductoFormData } from "@/types";
import { ArrowLeft } from "lucide-react";

export default function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getProducto, updateProducto } = useProductos();
  const producto = getProducto(id);

  if (!producto) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Producto no encontrado</p>
          <Link href="/productos">
            <Button className="mt-4">Volver a Productos</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = (data: ProductoFormData) => {
    updateProducto(id, data);
    router.push(`/productos/${id}`);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/productos/${id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Editar Producto</h1>
            <p className="text-muted-foreground">
              Modifica la información del producto
            </p>
          </div>
        </div>

        <ProductoForm
          producto={producto}
          onSubmit={handleSubmit}
          isEditing={true}
        />
      </div>
    </MainLayout>
  );
}
