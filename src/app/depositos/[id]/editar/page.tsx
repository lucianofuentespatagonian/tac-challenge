"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { DepositoForm } from "@/components/depositos/DepositoForm";
import { Button } from "@/components/ui/button";
import { useDepositos } from "@/hooks/useDepositos";
import { DepositoFormData } from "@/types";
import { ArrowLeft } from "lucide-react";

export default function EditarDepositoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getDeposito, updateDeposito } = useDepositos();
  const deposito = getDeposito(id);

  if (!deposito) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Depósito no encontrado</p>
          <Link href="/depositos">
            <Button className="mt-4">Volver a Depósitos</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = (data: DepositoFormData) => {
    updateDeposito(id, data);
    router.push(`/depositos/${id}`);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/depositos/${id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Editar Depósito</h1>
            <p className="text-muted-foreground">
              Modifica la información del depósito
            </p>
          </div>
        </div>

        <DepositoForm
          deposito={deposito}
          onSubmit={handleSubmit}
          isEditing={true}
        />
      </div>
    </MainLayout>
  );
}
