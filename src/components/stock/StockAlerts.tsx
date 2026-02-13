"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package } from "lucide-react";
import { useStockAlerts } from "@/hooks/useStockAlerts";

export function StockAlerts() {
  const { alertas, alertasPorPrioridad } = useStockAlerts();

  if (alertas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Alertas de Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No hay productos con stock bajo
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Todos los productos tienen stock suficiente
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPrioridadBadge = (prioridad: "alta" | "media" | "baja") => {
    const variants = {
      alta: "destructive",
      media: "warning",
      baja: "outline",
    } as const;

    return variants[prioridad];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Alertas de Stock ({alertasPorPrioridad.total})
        </CardTitle>
        <div className="flex gap-2 text-sm">
          {alertasPorPrioridad.alta > 0 && (
            <span className="text-destructive">
              {alertasPorPrioridad.alta} críticas
            </span>
          )}
          {alertasPorPrioridad.media > 0 && (
            <span className="text-yellow-600">
              {alertasPorPrioridad.media} medias
            </span>
          )}
          {alertasPorPrioridad.baja > 0 && (
            <span className="text-muted-foreground">
              {alertasPorPrioridad.baja} bajas
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alertas.slice(0, 10).map((alerta) => (
            <div
              key={alerta.productoId}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{alerta.productoNombre}</p>
                <p className="text-sm text-muted-foreground">
                  Stock: {alerta.cantidad} / Mínimo: {alerta.stockMinimo} (
                  {alerta.porcentaje}%)
                </p>
              </div>
              <Badge variant={getPrioridadBadge(alerta.prioridad)}>
                {alerta.prioridad === "alta" && "Crítico"}
                {alerta.prioridad === "media" && "Medio"}
                {alerta.prioridad === "baja" && "Bajo"}
              </Badge>
            </div>
          ))}

          {alertas.length > 10 && (
            <p className="text-sm text-center text-muted-foreground">
              Y {alertas.length - 10} alertas más...
            </p>
          )}

          <Link href="/stock" className="block mt-4">
            <Button variant="outline" className="w-full">
              Ver Todo el Stock
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
