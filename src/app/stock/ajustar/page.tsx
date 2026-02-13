"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { MovimientoForm } from "@/components/stock/MovimientoForm";

export default function AjustarStockPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Ajustar Stock</h1>
          <p className="text-muted-foreground">
            Registra movimientos de entrada, salida o transferencia de productos
          </p>
        </div>

        <MovimientoForm />
      </div>
    </MainLayout>
  );
}
