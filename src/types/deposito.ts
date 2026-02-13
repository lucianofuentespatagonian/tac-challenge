export type TipoDeposito = "almacen" | "showroom" | "tienda" | "deposito";

export interface Deposito {
  id: string;
  nombre: string;
  codigo: string;
  ubicacion: string;
  capacidadMaxima?: number;
  tipo: TipoDeposito;
  fechaCreacion: string;
}

export interface DepositoFormData {
  nombre: string;
  codigo: string;
  ubicacion: string;
  capacidadMaxima?: number;
  tipo: TipoDeposito;
}
