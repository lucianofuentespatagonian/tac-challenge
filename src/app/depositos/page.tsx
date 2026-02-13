"use client";

import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { DepositoTable } from "@/components/depositos/DepositoTable";
import { Button } from "@/components/ui/button";
import { useDepositos } from "@/hooks/useDepositos";
import { Plus } from "lucide-react";

export default function DepositosPage() {
  const { depositos, deleteDeposito, isLoading } = useDepositos();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando depósitos...</p>
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
            <h1 className="text-3xl font-bold">Depósitos</h1>
            <p className="text-muted-foreground">
              Gestiona las ubicaciones de almacenamiento
            </p>
          </div>
          <Link href="/depositos/nuevo">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Depósito
            </Button>
          </Link>
        </div>

        <DepositoTable depositos={depositos} onDelete={deleteDeposito} />
      </div>
    </MainLayout>
  );
}
