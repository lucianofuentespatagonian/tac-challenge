export const APP_NAME = "Sistema de Gestión de Stock";
export const APP_VERSION = "1.0.0";

export const CATEGORIAS_PRODUCTO = [
  "Electrónica",
  "Ropa",
  "Alimentos",
  "Herramientas",
  "Muebles",
  "Juguetes",
  "Deportes",
  "Oficina",
  "Otros",
] as const;

export const TIPOS_DEPOSITO = [
  { value: "almacen", label: "Almacén" },
  { value: "showroom", label: "Showroom" },
  { value: "tienda", label: "Tienda" },
  { value: "deposito", label: "Depósito" },
] as const;

export const TIPOS_MOVIMIENTO = [
  { value: "entrada", label: "Entrada" },
  { value: "salida", label: "Salida" },
  { value: "transferencia", label: "Transferencia" },
] as const;

export const ROLES_USUARIO = [
  { value: "admin", label: "Administrador" },
  { value: "operador", label: "Operador" },
  { value: "visualizador", label: "Visualizador" },
] as const;

export const PAGINATION_LIMIT = 10;

export const DEBOUNCE_DELAY = 300;

// Colores para estados de stock
export const STOCK_COLORS = {
  CRITICO: "#ef4444", // red-500
  BAJO: "#f59e0b", // amber-500
  NORMAL: "#10b981", // green-500
  ALTO: "#3b82f6", // blue-500
} as const;

// Umbrales para prioridades de alertas
export const ALERT_THRESHOLDS = {
  ALTA: 0.25, // < 25% del mínimo
  MEDIA: 0.5, // < 50% del mínimo
  BAJA: 1.0, // < 100% del mínimo (igual o por debajo del mínimo)
} as const;
