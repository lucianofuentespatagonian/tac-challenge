"use client";

import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductoTable } from "@/components/productos/ProductoTable";
import { Button } from "@/components/ui/button";
import { useProductos } from "@/hooks/useProductos";
import { Plus } from "lucide-react";

export default function ProductosPage() {
  const { productos, deleteProducto, isLoading } = useProductos();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando productos...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Productos</h1>
            <p className="text-muted-foreground">
              Gestiona el catálogo de productos
            </p>
          </div>
          <Link href="/productos/nuevo">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </Link>
        </div>

        <ProductoTable productos={productos} onDelete={deleteProducto} />
      </div>
    </MainLayout>
  );
}
