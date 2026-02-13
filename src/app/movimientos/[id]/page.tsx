"use client";

import { use } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMovimientos } from "@/hooks/useMovimientos";
import { useProductos } from "@/hooks/useProductos";
import { useDepositos } from "@/hooks/useDepositos";
import { getFromStorage, STORAGE_KEYS } from "@/lib/storage";
import { Usuario } from "@/types";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function MovimientoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getMovimiento } = useMovimientos();
  const { getProducto } = useProductos();
  const { getDeposito } = useDepositos();

  const movimiento = getMovimiento(id);
  const usuarios = getFromStorage<Usuario[]>(STORAGE_KEYS.USUARIOS) || [];

  if (!movimiento) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Movimiento no encontrado</p>
          <Link href="/movimientos">
            <Button className="mt-4">Volver a Movimientos</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const producto = getProducto(movimiento.productoId);
  const depositoOrigen = movimiento.depositoOrigenId
    ? getDeposito(movimiento.depositoOrigenId)
    : undefined;
  const depositoDestino = movimiento.depositoDestinoId
    ? getDeposito(movimiento.depositoDestinoId)
    : undefined;
  const usuario = usuarios.find((u) => u.id === movimiento.usuarioId);

  const getTipoBadge = (tipo: string) => {
    const variants = {
      entrada: "success",
      salida: "destructive",
      transferencia: "info",
    } as const;

    return variants[tipo as keyof typeof variants] || "outline";
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/movimientos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Detalle del Movimiento</h1>
            <p className="text-muted-foreground">{formatDate(movimiento.fecha)}</p>
          </div>
          <Badge variant={getTipoBadge(movimiento.tipo)} className="text-base px-4 py-1">
            {movimiento.tipo.toUpperCase()}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información del Movimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Producto</p>
                <p className="font-medium">
                  {producto?.nombre || "No encontrado"}
                </p>
                <p className="text-sm text-muted-foreground">
                  SKU: {producto?.sku || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cantidad</p>
                <p className="text-2xl font-bold">{movimiento.cantidad} unidades</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha y Hora</p>
                <p>{formatDate(movimiento.fecha)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Origen y Destino</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {depositoOrigen && (
                <div>
                  <p className="text-sm text-muted-foreground">Depósito Origen</p>
                  <p className="font-medium">{depositoOrigen.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    {depositoOrigen.codigo}
                  </p>
                </div>
              )}
              {depositoDestino && (
                <div>
                  <p className="text-sm text-muted-foreground">Depósito Destino</p>
                  <p className="font-medium">{depositoDestino.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    {depositoDestino.codigo}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Usuario</p>
                <p className="font-medium">{usuario?.nombre || "No encontrado"}</p>
                <p className="text-sm text-muted-foreground">
                  {usuario?.email || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Motivo</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{movimiento.motivo}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
