"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Producto, ProductoFormData } from "@/types";
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
import { CATEGORIAS_PRODUCTO } from "@/lib/constants";

interface ProductoFormProps {
  producto?: Producto;
  onSubmit: (data: ProductoFormData) => void;
  isEditing?: boolean;
}

export function ProductoForm({ producto, onSubmit, isEditing = false }: ProductoFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductoFormData>({
    sku: producto?.sku || "",
    nombre: producto?.nombre || "",
    descripcion: producto?.descripcion || "",
    categoria: producto?.categoria || "",
    precio: producto?.precio || 0,
    costo: producto?.costo || 0,
    stockMinimo: producto?.stockMinimo || 0,
    imagen: producto?.imagen || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.sku.trim()) {
      newErrors.sku = "El SKU es requerido";
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.categoria) {
      newErrors.categoria = "La categoría es requerida";
    }

    if (formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }

    if (formData.costo < 0) {
      newErrors.costo = "El costo no puede ser negativo";
    }

    if (formData.stockMinimo < 0) {
      newErrors.stockMinimo = "El stock mínimo no puede ser negativo";
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
    field: keyof ProductoFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo
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
            {isEditing ? "Editar Producto" : "Nuevo Producto"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sku">
                SKU <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                placeholder="PROD-001"
              />
              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                placeholder="Nombre del producto"
              />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              placeholder="Descripción detallada del producto"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoria">
                Categoría <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => handleChange("categoria", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS_PRODUCTO.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoria && (
                <p className="text-sm text-destructive">{errors.categoria}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockMinimo">Stock Mínimo</Label>
              <Input
                id="stockMinimo"
                type="number"
                min="0"
                value={formData.stockMinimo}
                onChange={(e) =>
                  handleChange("stockMinimo", Number(e.target.value))
                }
              />
              {errors.stockMinimo && (
                <p className="text-sm text-destructive">{errors.stockMinimo}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="costo">Costo</Label>
              <Input
                id="costo"
                type="number"
                min="0"
                step="0.01"
                value={formData.costo}
                onChange={(e) => handleChange("costo", Number(e.target.value))}
              />
              {errors.costo && (
                <p className="text-sm text-destructive">{errors.costo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">
                Precio <span className="text-destructive">*</span>
              </Label>
              <Input
                id="precio"
                type="number"
                min="0"
                step="0.01"
                value={formData.precio}
                onChange={(e) => handleChange("precio", Number(e.target.value))}
              />
              {errors.precio && (
                <p className="text-sm text-destructive">{errors.precio}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagen">URL de Imagen (opcional)</Label>
            <Input
              id="imagen"
              value={formData.imagen}
              onChange={(e) => handleChange("imagen", e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
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
              {isEditing ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
