import { Producto } from "./producto";
import { Deposito } from "./deposito";

export interface Stock {
  id: string;
  productoId: string;
  depositoId: string;
  cantidad: number;
  fechaActualizacion: string;
}

export interface StockConDetalle extends Stock {
  producto: Producto;
  deposito: Deposito;
}

export type PrioridadAlerta = "alta" | "media" | "baja";

export interface AlertaStock {
  productoId: string;
  productoNombre: string;
  cantidad: number;
  stockMinimo: number;
  prioridad: PrioridadAlerta;
  porcentaje: number;
}
