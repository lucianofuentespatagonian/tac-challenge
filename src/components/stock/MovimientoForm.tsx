"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MovimientoFormData, TipoMovimiento } from "@/types";
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
import { useProductos } from "@/hooks/useProductos";
import { useDepositos } from "@/hooks/useDepositos";
import { useStock } from "@/hooks/useStock";
import { TIPOS_MOVIMIENTO } from "@/lib/constants";

export function MovimientoForm() {
  const router = useRouter();
  const { productos } = useProductos();
  const { depositos } = useDepositos();
  const { ajustarStock, getStockByProductoDeposito } = useStock();

  const [formData, setFormData] = useState<MovimientoFormData>({
    tipo: "entrada",
    productoId: "",
    depositoOrigenId: "",
    depositoDestinoId: "",
    cantidad: 0,
    motivo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.productoId) {
      newErrors.productoId = "Debe seleccionar un producto";
    }

    if (formData.cantidad <= 0) {
      newErrors.cantidad = "La cantidad debe ser mayor a 0";
    }

    if (!formData.motivo.trim()) {
      newErrors.motivo = "El motivo es requerido";
    }

    if (formData.tipo === "entrada" && !formData.depositoDestinoId) {
      newErrors.depositoDestinoId = "Debe seleccionar un depósito destino";
    }

    if (formData.tipo === "salida" && !formData.depositoOrigenId) {
      newErrors.depositoOrigenId = "Debe seleccionar un depósito origen";
    }

    if (formData.tipo === "transferencia") {
      if (!formData.depositoOrigenId) {
        newErrors.depositoOrigenId = "Debe seleccionar un depósito origen";
      }
      if (!formData.depositoDestinoId) {
        newErrors.depositoDestinoId = "Debe seleccionar un depósito destino";
      }
      if (
        formData.depositoOrigenId &&
        formData.depositoDestinoId &&
        formData.depositoOrigenId === formData.depositoDestinoId
      ) {
        newErrors.depositoDestinoId =
          "El depósito destino debe ser diferente al origen";
      }
    }

    // Validar stock disponible para salidas y transferencias
    if (
      (formData.tipo === "salida" || formData.tipo === "transferencia") &&
      formData.productoId &&
      formData.depositoOrigenId
    ) {
      const stock = getStockByProductoDeposito(
        formData.productoId,
        formData.depositoOrigenId
      );

      if (!stock || stock.cantidad < formData.cantidad) {
        newErrors.cantidad = `Stock insuficiente. Disponible: ${
          stock?.cantidad || 0
        }`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      ajustarStock(formData);
      router.push("/stock");
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error ? error.message : "Error al ajustar stock",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof MovimientoFormData,
    value: string | number
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

  const handleTipoChange = (tipo: string) => {
    setFormData((prev) => ({
      ...prev,
      tipo: tipo as TipoMovimiento,
      depositoOrigenId: "",
      depositoDestinoId: "",
    }));
    setErrors({});
  };

  const stockDisponible =
    formData.productoId && formData.depositoOrigenId
      ? getStockByProductoDeposito(formData.productoId, formData.depositoOrigenId)
          ?.cantidad || 0
      : null;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Movimiento de Stock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {errors.submit && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tipo">
              Tipo de Movimiento <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.tipo} onValueChange={handleTipoChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_MOVIMIENTO.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productoId">
              Producto <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.productoId}
              onValueChange={(value) => handleChange("productoId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar producto" />
              </SelectTrigger>
              <SelectContent>
                {productos.map((producto) => (
                  <SelectItem key={producto.id} value={producto.id}>
                    {producto.nombre} ({producto.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.productoId && (
              <p className="text-sm text-destructive">{errors.productoId}</p>
            )}
          </div>

          {(formData.tipo === "salida" || formData.tipo === "transferencia") && (
            <div className="space-y-2">
              <Label htmlFor="depositoOrigenId">
                Depósito Origen <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.depositoOrigenId}
                onValueChange={(value) =>
                  handleChange("depositoOrigenId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar depósito origen" />
                </SelectTrigger>
                <SelectContent>
                  {depositos.map((deposito) => (
                    <SelectItem key={deposito.id} value={deposito.id}>
                      {deposito.nombre} ({deposito.codigo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.depositoOrigenId && (
                <p className="text-sm text-destructive">
                  {errors.depositoOrigenId}
                </p>
              )}
              {stockDisponible !== null && (
                <p className="text-sm text-muted-foreground">
                  Stock disponible: {stockDisponible} unidades
                </p>
              )}
            </div>
          )}

          {(formData.tipo === "entrada" || formData.tipo === "transferencia") && (
            <div className="space-y-2">
              <Label htmlFor="depositoDestinoId">
                Depósito Destino <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.depositoDestinoId}
                onValueChange={(value) =>
                  handleChange("depositoDestinoId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar depósito destino" />
                </SelectTrigger>
                <SelectContent>
                  {depositos.map((deposito) => (
                    <SelectItem key={deposito.id} value={deposito.id}>
                      {deposito.nombre} ({deposito.codigo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.depositoDestinoId && (
                <p className="text-sm text-destructive">
                  {errors.depositoDestinoId}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="cantidad">
              Cantidad <span className="text-destructive">*</span>
            </Label>
            <Input
              id="cantidad"
              type="number"
              min="1"
              value={formData.cantidad || ""}
              onChange={(e) => handleChange("cantidad", Number(e.target.value))}
            />
            {errors.cantidad && (
              <p className="text-sm text-destructive">{errors.cantidad}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo">
              Motivo <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="motivo"
              value={formData.motivo}
              onChange={(e) => handleChange("motivo", e.target.value)}
              placeholder="Describa el motivo del movimiento"
              rows={3}
            />
            {errors.motivo && (
              <p className="text-sm text-destructive">{errors.motivo}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : "Registrar Movimiento"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
