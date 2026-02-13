"use client";

import { useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { useProductos } from "@/hooks/useProductos";
import { useDepositos } from "@/hooks/useDepositos";
import { useStock } from "@/hooks/useStock";
import { useMovimientos } from "@/hooks/useMovimientos";
import { useStockAlerts } from "@/hooks/useStockAlerts";
import { formatCurrency } from "@/lib/utils";

export default function ReportesPage() {
  const { productos } = useProductos();
  const { depositos } = useDepositos();
  const { stocks } = useStock();
  const { movimientos } = useMovimientos();
  const { alertasPorPrioridad } = useStockAlerts();

  const stats = useMemo(() => {
    // Calcular valor total del inventario
    const valorTotal = stocks.reduce((total, stock) => {
      const producto = productos.find((p) => p.id === stock.productoId);
      return total + (producto?.precio || 0) * stock.cantidad;
    }, 0);

    // Productos con más stock (top 10)
    const stockPorProducto = new Map<string, number>();
    stocks.forEach((stock) => {
      const current = stockPorProducto.get(stock.productoId) || 0;
      stockPorProducto.set(stock.productoId, current + stock.cantidad);
    });

    const productosConStock = Array.from(stockPorProducto.entries())
      .map(([productoId, cantidad]) => {
        const producto = productos.find((p) => p.id === productoId);
        return { producto, cantidad };
      })
      .filter((item) => item.producto);

    const topProductos = [...productosConStock]
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 10);

    const bottomProductos = [...productosConStock]
      .sort((a, b) => a.cantidad - b.cantidad)
      .slice(0, 10);

    // Movimientos del último mes
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    const movimientosDelMes = movimientos.filter(
      (m) => new Date(m.fecha) >= unMesAtras
    );

    // Contar por tipo
    const movimientosPorTipo = {
      entrada: movimientosDelMes.filter((m) => m.tipo === "entrada").length,
      salida: movimientosDelMes.filter((m) => m.tipo === "salida").length,
      transferencia: movimientosDelMes.filter((m) => m.tipo === "transferencia")
        .length,
    };

    return {
      valorTotal,
      topProductos,
      bottomProductos,
      movimientosDelMes: movimientosDelMes.length,
      movimientosPorTipo,
    };
  }, [stocks, productos, movimientos]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground">
            Análisis general del inventario y movimientos
          </p>
        </div>

        {/* KPIs Principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Movimientos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.movimientosDelMes}
              </div>
              <p className="text-xs text-muted-foreground">Último mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {alertasPorPrioridad.total}
              </div>
              <p className="text-xs text-muted-foreground">
                {alertasPorPrioridad.alta} críticas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Movimientos por Tipo */}
        <Card>
          <CardHeader>
            <CardTitle>Movimientos del Último Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Entradas</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.movimientosPorTipo.entrada}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Salidas</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.movimientosPorTipo.salida}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Transferencias</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.movimientosPorTipo.transferencia}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Productos con Más Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Productos con Más Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topProductos.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay datos disponibles
                  </p>
                ) : (
                  stats.topProductos.map((item, index) => (
                    <div key={item.producto?.id} className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground w-6">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {item.producto?.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.producto?.sku}
                        </p>
                      </div>
                      <span className="font-bold">{item.cantidad}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Productos con Menos Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Productos con Menos Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.bottomProductos.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay datos disponibles
                  </p>
                ) : (
                  stats.bottomProductos.map((item, index) => (
                    <div key={item.producto?.id} className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground w-6">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {item.producto?.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.producto?.sku}
                        </p>
                      </div>
                      <span className="font-bold text-destructive">
                        {item.cantidad}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
