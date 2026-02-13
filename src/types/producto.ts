export interface Producto {
  id: string;
  sku: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  costo: number;
  stockMinimo: number;
  imagen?: string;
  fechaCreacion: string;
}

export interface ProductoFormData {
  sku: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  costo: number;
  stockMinimo: number;
  imagen?: string;
}
