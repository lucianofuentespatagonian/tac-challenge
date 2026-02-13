"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Deposito, DepositoFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TIPOS_DEPOSITO } from "@/lib/constants";

interface DepositoFormProps {
  deposito?: Deposito;
  onSubmit: (data: DepositoFormData) => void;
  isEditing?: boolean;
}

export function DepositoForm({
  deposito,
  onSubmit,
  isEditing = false,
}: DepositoFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<DepositoFormData>({
    nombre: deposito?.nombre || "",
    codigo: deposito?.codigo || "",
    ubicacion: deposito?.ubicacion || "",
    capacidadMaxima: deposito?.capacidadMaxima,
    tipo: deposito?.tipo || "deposito",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.codigo.trim()) {
      newErrors.codigo = "El código es requerido";
    }

    if (!formData.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es requerida";
    }

    if (!formData.tipo) {
      newErrors.tipo = "El tipo es requerido";
    }

    if (
      formData.capacidadMaxima !== undefined &&
      formData.capacidadMaxima < 0
    ) {
      newErrors.capacidadMaxima = "La capacidad no puede ser negativa";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    field: keyof DepositoFormData,
    value: string | number | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Editar Depósito" : "Nuevo Depósito"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                placeholder="Depósito Central"
              />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigo">
                Código <span className="text-destructive">*</span>
              </Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => handleChange("codigo", e.target.value)}
                placeholder="DEP-001"
              />
              {errors.codigo && (
                <p className="text-sm text-destructive">{errors.codigo}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion">
              Ubicación <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="ubicacion"
              value={formData.ubicacion}
              onChange={(e) => handleChange("ubicacion", e.target.value)}
              placeholder="Dirección completa del depósito"
              rows={2}
            />
            {errors.ubicacion && (
              <p className="text-sm text-destructive">{errors.ubicacion}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tipo">
                Tipo <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => handleChange("tipo", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_DEPOSITO.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tipo && (
                <p className="text-sm text-destructive">{errors.tipo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacidadMaxima">Capacidad Máxima (opcional)</Label>
              <Input
                id="capacidadMaxima"
                type="number"
                min="0"
                value={formData.capacidadMaxima || ""}
                onChange={(e) =>
                  handleChange(
                    "capacidadMaxima",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                placeholder="Unidades"
              />
              {errors.capacidadMaxima && (
                <p className="text-sm text-destructive">
                  {errors.capacidadMaxima}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? "Guardar Cambios" : "Crear Depósito"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
