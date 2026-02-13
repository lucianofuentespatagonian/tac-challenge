"use client";

import { use } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProductos } from "@/hooks/useProductos";
import { ArrowLeft, Pencil } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ProductoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getProducto } = useProductos();
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

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/productos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{producto.nombre}</h1>
            <p className="text-muted-foreground">SKU: {producto.sku}</p>
          </div>
          <Link href={`/productos/${producto.id}/editar`}>
            <Button>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{producto.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-mono">{producto.sku}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Descripción</p>
                <p>{producto.descripcion || "Sin descripción"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categoría</p>
                <Badge>{producto.categoria}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Creación</p>
                <p>{formatDate(producto.fechaCreacion)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información Comercial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Precio de Venta</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(producto.precio)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Costo</p>
                <p className="text-xl font-medium">
                  {formatCurrency(producto.costo)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Margen</p>
                <p className="text-lg">
                  {producto.precio > 0
                    ? `${(
                        ((producto.precio - producto.costo) / producto.precio) *
                        100
                      ).toFixed(1)}%`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock Mínimo</p>
                <p className="text-lg font-medium">{producto.stockMinimo} unidades</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
