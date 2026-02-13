import { useMemo } from "react";
import { AlertaStock } from "@/types";
import { useStock } from "./useStock";
import { useProductos } from "./useProductos";
import { ALERT_THRESHOLDS } from "@/lib/constants";

export function useStockAlerts() {
  const { stocks } = useStock();
  const { productos } = useProductos();

  const alertas = useMemo(() => {
    const alerts: AlertaStock[] = [];

    // Agrupar stock por producto (sumando todas las cantidades de todos los depósitos)
    const stockPorProducto = new Map<string, number>();

    stocks.forEach((stock) => {
      const current = stockPorProducto.get(stock.productoId) || 0;
      stockPorProducto.set(stock.productoId, current + stock.cantidad);
    });

    // Verificar cada producto contra su stock mínimo
    stockPorProducto.forEach((cantidadTotal, productoId) => {
      const producto = productos.find((p) => p.id === productoId);

      if (!producto || producto.stockMinimo === 0) return;

      const porcentaje = cantidadTotal / producto.stockMinimo;

      // Solo crear alerta si está por debajo del mínimo
      if (porcentaje < ALERT_THRESHOLDS.BAJA) {
        let prioridad: "alta" | "media" | "baja" = "baja";

        if (porcentaje < ALERT_THRESHOLDS.ALTA) {
          prioridad = "alta";
        } else if (porcentaje < ALERT_THRESHOLDS.MEDIA) {
          prioridad = "media";
        }

        alerts.push({
          productoId: producto.id,
          productoNombre: producto.nombre,
          cantidad: cantidadTotal,
          stockMinimo: producto.stockMinimo,
          prioridad,
          porcentaje: Math.round(porcentaje * 100),
        });
      }
    });

    // Ordenar por prioridad (alta primero) y luego por porcentaje (menor primero)
    return alerts.sort((a, b) => {
      const prioridadOrder = { alta: 0, media: 1, baja: 2 };
      const prioridadDiff =
        prioridadOrder[a.prioridad] - prioridadOrder[b.prioridad];

      if (prioridadDiff !== 0) return prioridadDiff;

      return a.porcentaje - b.porcentaje;
    });
  }, [stocks, productos]);

  const alertasPorPrioridad = useMemo(() => {
    return {
      alta: alertas.filter((a) => a.prioridad === "alta").length,
      media: alertas.filter((a) => a.prioridad === "media").length,
      baja: alertas.filter((a) => a.prioridad === "baja").length,
      total: alertas.length,
    };
  }, [alertas]);

  return {
    alertas,
    alertasPorPrioridad,
    tieneAlertas: alertas.length > 0,
  };
}
