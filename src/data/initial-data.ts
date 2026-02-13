import { Usuario, Producto, Deposito, Stock, Movimiento } from "@/types";
import { generateId } from "@/lib/utils";

// Usuarios de prueba
export const initialUsuarios: Usuario[] = [
  {
    id: generateId(),
    nombre: "Administrador",
    email: "admin@stock.com",
    password: "admin123",
    rol: "admin",
  },
  {
    id: generateId(),
    nombre: "Operador",
    email: "operador@stock.com",
    password: "oper123",
    rol: "operador",
  },
];

// Productos de ejemplo
export const initialProductos: Producto[] = [
  {
    id: generateId(),
    sku: "ELEC-001",
    nombre: "Laptop Dell XPS 13",
    descripcion: "Laptop ultraportátil con procesador Intel i7",
    categoria: "Electrónica",
    precio: 1200000,
    costo: 900000,
    stockMinimo: 5,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ELEC-002",
    nombre: "Mouse Logitech MX Master 3",
    descripcion: "Mouse inalámbrico ergonómico",
    categoria: "Electrónica",
    precio: 25000,
    costo: 18000,
    stockMinimo: 10,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ELEC-003",
    nombre: "Teclado Mecánico Keychron K2",
    descripcion: "Teclado mecánico compacto RGB",
    categoria: "Electrónica",
    precio: 35000,
    costo: 25000,
    stockMinimo: 8,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ELEC-004",
    nombre: "Monitor LG 27 pulgadas 4K",
    descripcion: "Monitor UHD 4K con HDR",
    categoria: "Electrónica",
    precio: 180000,
    costo: 130000,
    stockMinimo: 3,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "OFIC-001",
    nombre: "Silla Ergonómica Herman Miller",
    descripcion: "Silla de oficina premium con soporte lumbar",
    categoria: "Oficina",
    precio: 250000,
    costo: 180000,
    stockMinimo: 5,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "OFIC-002",
    nombre: "Escritorio Regulable en Altura",
    descripcion: "Escritorio eléctrico ajustable",
    categoria: "Oficina",
    precio: 150000,
    costo: 100000,
    stockMinimo: 3,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "HERR-001",
    nombre: "Taladro Inalámbrico Bosch",
    descripcion: "Taladro/atornillador 18V con 2 baterías",
    categoria: "Herramientas",
    precio: 45000,
    costo: 32000,
    stockMinimo: 6,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "HERR-002",
    nombre: "Kit de Destornilladores",
    descripcion: "Set de 20 destornilladores de precisión",
    categoria: "Herramientas",
    precio: 8000,
    costo: 5000,
    stockMinimo: 15,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "MUEB-001",
    nombre: "Estantería Modular",
    descripcion: "Estantería de madera de 5 niveles",
    categoria: "Muebles",
    precio: 35000,
    costo: 22000,
    stockMinimo: 4,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "MUEB-002",
    nombre: "Mesa de Centro",
    descripcion: "Mesa de centro moderna con vidrio templado",
    categoria: "Muebles",
    precio: 28000,
    costo: 18000,
    stockMinimo: 5,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "DEPO-001",
    nombre: "Balón de Fútbol Adidas",
    descripcion: "Balón profesional talla 5",
    categoria: "Deportes",
    precio: 12000,
    costo: 8000,
    stockMinimo: 20,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "DEPO-002",
    nombre: "Raqueta de Tenis Wilson",
    descripcion: "Raqueta profesional de carbono",
    categoria: "Deportes",
    precio: 55000,
    costo: 38000,
    stockMinimo: 8,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "DEPO-003",
    nombre: "Bicicleta Mountain Bike",
    descripcion: "Bicicleta rodado 29 con 21 cambios",
    categoria: "Deportes",
    precio: 180000,
    costo: 130000,
    stockMinimo: 3,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "JUEG-001",
    nombre: "Juego de Mesa Monopoly",
    descripcion: "Juego clásico de Monopoly edición especial",
    categoria: "Juguetes",
    precio: 15000,
    costo: 10000,
    stockMinimo: 12,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "JUEG-002",
    nombre: "LEGO Star Wars Set",
    descripcion: "Set de construcción LEGO de 1000 piezas",
    categoria: "Juguetes",
    precio: 45000,
    costo: 32000,
    stockMinimo: 8,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ROPA-001",
    nombre: "Remera Deportiva Nike",
    descripcion: "Remera dry-fit para entrenamiento",
    categoria: "Ropa",
    precio: 8000,
    costo: 5000,
    stockMinimo: 25,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ROPA-002",
    nombre: "Zapatillas Running Adidas",
    descripcion: "Zapatillas para running con tecnología Boost",
    categoria: "Ropa",
    precio: 65000,
    costo: 45000,
    stockMinimo: 15,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ROPA-003",
    nombre: "Campera Impermeable",
    descripcion: "Campera outdoor resistente al agua",
    categoria: "Ropa",
    precio: 42000,
    costo: 28000,
    stockMinimo: 10,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ALIM-001",
    nombre: "Cafetera Express",
    descripcion: "Cafetera espresso automática",
    categoria: "Alimentos",
    precio: 95000,
    costo: 68000,
    stockMinimo: 5,
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    sku: "ALIM-002",
    nombre: "Licuadora Profesional",
    descripcion: "Licuadora de alta potencia 1200W",
    categoria: "Alimentos",
    precio: 38000,
    costo: 26000,
    stockMinimo: 8,
    fechaCreacion: new Date().toISOString(),
  },
];

// Depósitos de ejemplo
export const initialDepositos: Deposito[] = [
  {
    id: generateId(),
    nombre: "Depósito Central",
    codigo: "DEP-001",
    ubicacion: "Av. Principal 1234, CABA",
    capacidadMaxima: 10000,
    tipo: "almacen",
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Showroom Palermo",
    codigo: "SHOW-001",
    ubicacion: "Palermo Soho, CABA",
    capacidadMaxima: 500,
    tipo: "showroom",
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Tienda Belgrano",
    codigo: "TIENDA-001",
    ubicacion: "Cabildo 2500, CABA",
    capacidadMaxima: 800,
    tipo: "tienda",
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Depósito Zona Norte",
    codigo: "DEP-002",
    ubicacion: "San Isidro, Buenos Aires",
    capacidadMaxima: 5000,
    tipo: "deposito",
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Tienda Unicenter",
    codigo: "TIENDA-002",
    ubicacion: "Shopping Unicenter, Martínez",
    capacidadMaxima: 600,
    tipo: "tienda",
    fechaCreacion: new Date().toISOString(),
  },
];

// Stock inicial
export function generateInitialStock(): Stock[] {
  const stock: Stock[] = [];

  // Generar stock para cada producto en cada depósito
  initialProductos.forEach((producto) => {
    initialDepositos.forEach((deposito, index) => {
      // Variar las cantidades según el tipo de depósito
      let cantidad = 0;

      if (deposito.tipo === "almacen") {
        // Almacenes tienen más stock
        cantidad = Math.floor(Math.random() * 50) + 30;
      } else if (deposito.tipo === "tienda") {
        // Tiendas tienen menos stock
        cantidad = Math.floor(Math.random() * 15) + 5;
      } else if (deposito.tipo === "showroom") {
        // Showrooms tienen stock mínimo
        cantidad = Math.floor(Math.random() * 8) + 2;
      } else {
        // Depósitos regulares
        cantidad = Math.floor(Math.random() * 30) + 15;
      }

      // Algunas veces crear productos con stock bajo para mostrar alertas
      if (Math.random() < 0.15) {
        cantidad = Math.floor(producto.stockMinimo * 0.3);
      }

      stock.push({
        id: generateId(),
        productoId: producto.id,
        depositoId: deposito.id,
        cantidad,
        fechaActualizacion: new Date().toISOString(),
      });
    });
  });

  return stock;
}

// Movimientos históricos
export function generateInitialMovimientos(adminId: string): Movimiento[] {
  const movimientos: Movimiento[] = [];
  const now = new Date();

  // Generar movimientos de los últimos 30 días
  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const fecha = new Date(now);
    fecha.setDate(fecha.getDate() - daysAgo);

    const producto =
      initialProductos[Math.floor(Math.random() * initialProductos.length)];
    const deposito1 =
      initialDepositos[Math.floor(Math.random() * initialDepositos.length)];
    const deposito2 =
      initialDepositos[Math.floor(Math.random() * initialDepositos.length)];

    const tipos: ("entrada" | "salida" | "transferencia")[] = [
      "entrada",
      "salida",
      "transferencia",
    ];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];

    const cantidad = Math.floor(Math.random() * 20) + 1;

    const motivos = {
      entrada: [
        "Reposición de stock",
        "Compra a proveedor",
        "Devolución de cliente",
        "Ajuste de inventario",
      ],
      salida: [
        "Venta",
        "Producto dañado",
        "Transferencia a cliente",
        "Muestra para evento",
      ],
      transferencia: [
        "Reubicación de stock",
        "Necesidad en sucursal",
        "Balanceo de inventario",
        "Pedido interno",
      ],
    };

    const motivosArray = motivos[tipo];
    const motivo = motivosArray[Math.floor(Math.random() * motivosArray.length)];

    movimientos.push({
      id: generateId(),
      tipo,
      productoId: producto.id,
      depositoOrigenId: tipo === "salida" || tipo === "transferencia" ? deposito1.id : undefined,
      depositoDestinoId: tipo === "entrada" || tipo === "transferencia" ? (tipo === "transferencia" ? deposito2.id : deposito1.id) : undefined,
      cantidad,
      motivo,
      usuarioId: adminId,
      fecha: fecha.toISOString(),
    });
  }

  // Ordenar por fecha descendente
  return movimientos.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
}
