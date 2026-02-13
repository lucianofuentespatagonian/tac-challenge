"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { MovimientoTable } from "@/components/stock/MovimientoTable";
import { useMovimientos } from "@/hooks/useMovimientos";
import { useProductos } from "@/hooks/useProductos";
import { useDepositos } from "@/hooks/useDepositos";
import { getFromStorage, STORAGE_KEYS } from "@/lib/storage";
import { Usuario } from "@/types";

export default function MovimientosPage() {
  const { movimientos, isLoading: movimientosLoading } = useMovimientos();
  const { productos, isLoading: productosLoading } = useProductos();
  const { depositos, isLoading: depositosLoading } = useDepositos();

  const usuarios = getFromStorage<Usuario[]>(STORAGE_KEYS.USUARIOS) || [];

  const isLoading = movimientosLoading || productosLoading || depositosLoading;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando movimientos...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Historial de Movimientos</h1>
          <p className="text-muted-foreground">
            Registro completo de todas las operaciones de stock
          </p>
        </div>

        <MovimientoTable
          movimientos={movimientos}
          productos={productos}
          depositos={depositos}
          usuarios={usuarios}
        />
      </div>
    </MainLayout>
  );
}
