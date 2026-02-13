"use client";

import { use } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDepositos } from "@/hooks/useDepositos";
import { ArrowLeft, Pencil } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function DepositoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getDeposito } = useDepositos();
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

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/depositos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{deposito.nombre}</h1>
            <p className="text-muted-foreground">Código: {deposito.codigo}</p>
          </div>
          <Link href={`/depositos/${deposito.id}/editar`}>
            <Button>
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información del Depósito</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{deposito.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Código</p>
                <p className="font-mono">{deposito.codigo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <Badge>{deposito.tipo}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Capacidad Máxima
                </p>
                <p className="font-medium">
                  {deposito.capacidadMaxima
                    ? `${deposito.capacidadMaxima} unidades`
                    : "No especificada"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p>{deposito.ubicacion}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Fecha de Creación
                </p>
                <p>{formatDate(deposito.fechaCreacion)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
