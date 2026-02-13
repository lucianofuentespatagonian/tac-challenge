"use client";

import { useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Warehouse, Activity, DollarSign } from "lucide-react";
import { StockAlerts } from "@/components/stock/StockAlerts";
import { useProductos } from "@/hooks/useProductos";
import { useDepositos } from "@/hooks/useDepositos";
import { useStock } from "@/hooks/useStock";
import { useMovimientos } from "@/hooks/useMovimientos";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const { productos } = useProductos();
  const { depositos } = useDepositos();
  const { stocks } = useStock();
  const { movimientos } = useMovimientos();

  const stats = useMemo(() => {
    // Valor total del inventario
    const valorTotal = stocks.reduce((total, stock) => {
      const producto = productos.find((p) => p.id === stock.productoId);
      return total + (producto?.precio || 0) * stock.cantidad;
    }, 0);

    // Movimientos del último mes
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    const movimientosDelMes = movimientos.filter(
      (m) => new Date(m.fecha) >= unMesAtras
    );

    return {
      valorTotal,
      movimientosDelMes: movimientosDelMes.length,
    };
  }, [stocks, productos, movimientos]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido al sistema de gestión de stock
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Productos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productos.length}</div>
              <p className="text-xs text-muted-foreground">
                Productos registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Depósitos</CardTitle>
              <Warehouse className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{depositos.length}</div>
              <p className="text-xs text-muted-foreground">
                Ubicaciones activas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Movimientos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.movimientosDelMes}</div>
              <p className="text-xs text-muted-foreground">
                En el último mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Inventario
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats.valorTotal)}
              </div>
              <p className="text-xs text-muted-foreground">Valor total stock</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <StockAlerts />

          <Card>
            <CardHeader>
              <CardTitle>Inicio Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Acciones rápidas para gestionar tu inventario
              </p>
              <div className="grid gap-2 mt-4">
                <a
                  href="/productos/nuevo"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Agregar Producto
                </a>
                <a
                  href="/depositos/nuevo"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Agregar Depósito
                </a>
                <a
                  href="/stock/ajustar"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Ajustar Stock
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
