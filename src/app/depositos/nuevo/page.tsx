"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { DepositoForm } from "@/components/depositos/DepositoForm";
import { useDepositos } from "@/hooks/useDepositos";
import { DepositoFormData } from "@/types";

export default function NuevoDepositoPage() {
  const router = useRouter();
  const { createDeposito } = useDepositos();

  const handleSubmit = (data: DepositoFormData) => {
    createDeposito(data);
    router.push("/depositos");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Nuevo Depósito</h1>
          <p className="text-muted-foreground">
            Agrega una nueva ubicación de almacenamiento
          </p>
        </div>

        <DepositoForm onSubmit={handleSubmit} />
      </div>
    </MainLayout>
  );
}
