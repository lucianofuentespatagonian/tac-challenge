import { Producto } from "./producto";
import { Deposito } from "./deposito";
import { Usuario } from "./usuario";

export type TipoMovimiento = "entrada" | "salida" | "transferencia";

export interface Movimiento {
  id: string;
  tipo: TipoMovimiento;
  productoId: string;
  depositoOrigenId?: string;
  depositoDestinoId?: string;
  cantidad: number;
  motivo: string;
  usuarioId: string;
  fecha: string;
}

export interface MovimientoConDetalle extends Movimiento {
  producto: Producto;
  depositoOrigen?: Deposito;
  depositoDestino?: Deposito;
  usuario: Usuario;
}

export interface MovimientoFormData {
  tipo: TipoMovimiento;
  productoId: string;
  depositoOrigenId?: string;
  depositoDestinoId?: string;
  cantidad: number;
  motivo: string;
}
