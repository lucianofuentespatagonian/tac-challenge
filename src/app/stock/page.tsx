"use client";

import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { StockTable } from "@/components/stock/StockTable";
import { Button } from "@/components/ui/button";
import { useStock } from "@/hooks/useStock";
import { useProductos } from "@/hooks/useProductos";
import { useDepositos } from "@/hooks/useDepositos";
import { Plus } from "lucide-react";

export default function StockPage() {
  const { stocks, isLoading: stockLoading } = useStock();
  const { productos, isLoading: productosLoading } = useProductos();
  const { depositos, isLoading: depositosLoading } = useDepositos();

  const isLoading = stockLoading || productosLoading || depositosLoading;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando stock...</p>
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
            <h1 className="text-3xl font-bold">Stock</h1>
            <p className="text-muted-foreground">
              Vista general del inventario disponible
            </p>
          </div>
          <Link href="/stock/ajustar">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajustar Stock
            </Button>
          </Link>
        </div>

        <StockTable
          stocks={stocks}
          productos={productos}
          depositos={depositos}
        />
      </div>
    </MainLayout>
  );
}
