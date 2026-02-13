# Sistema de Gestión de Stock

Aplicación web completa para gestionar inventario de productos y depósitos, con control de stock en tiempo real, historial de movimientos, alertas automáticas y reportes estadísticos.

## 🚀 Características

- **Gestión de Productos**: CRUD completo con información detallada (SKU, precio, costo, stock mínimo, categorías)
- **Gestión de Depósitos**: Administración de ubicaciones de almacenamiento con diferentes tipos
- **Control de Stock**: Vista en tiempo real del inventario disponible por producto y depósito
- **Movimientos de Stock**:
  - Entradas (compras, devoluciones)
  - Salidas (ventas, productos dañados)
  - Transferencias entre depósitos
- **Alertas Automáticas**: Sistema inteligente que detecta productos con stock bajo
- **Historial Completo**: Registro detallado de todos los movimientos con trazabilidad
- **Reportes y Estadísticas**:
  - Valor total del inventario
  - Top productos por stock
  - Movimientos del último mes
  - KPIs principales
- **Autenticación**: Sistema de login con diferentes roles (Admin, Operador, Visualizador)
- **Persistencia Local**: Todos los datos se guardan en localStorage del navegador

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Formularios**: React Hook Form + Zod
- **Estado**: React Context API
- **Iconos**: Lucide React
- **Persistencia**: localStorage

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd patagonian
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## 👥 Usuarios de Prueba

La aplicación incluye datos de ejemplo y usuarios precargados:

### Administrador
- **Email**: admin@stock.com
- **Contraseña**: admin123
- **Permisos**: Acceso completo a todas las funcionalidades

### Operador
- **Email**: operador@stock.com
- **Contraseña**: oper123
- **Permisos**: Puede crear movimientos y ver reportes

## 🎯 Flujo de Uso

### 1. Inicio de Sesión
- Acceder a `/login`
- Ingresar con uno de los usuarios de prueba
- El sistema redirige al dashboard

### 2. Configuración Inicial
- **Agregar Productos**: Ir a "Productos" → "Nuevo Producto"
- **Agregar Depósitos**: Ir a "Depósitos" → "Nuevo Depósito"

### 3. Gestión de Stock
- **Ver Stock**: Ir a "Stock" para ver el inventario actual
- **Ajustar Stock**:
  - Ir a "Stock" → "Ajustar Stock"
  - Seleccionar tipo de movimiento (Entrada/Salida/Transferencia)
  - Completar el formulario
  - El sistema valida stock disponible automáticamente

### 4. Monitoreo
- **Dashboard**: Vista general con KPIs y alertas
- **Alertas**: El sistema detecta automáticamente productos con stock bajo
- **Movimientos**: Historial completo con filtros y búsqueda
- **Reportes**: Estadísticas y análisis del inventario

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 🧪 Validaciones Implementadas

- **SKU único**: No permite duplicados
- **Código de depósito único**: Validación de unicidad
- **Stock no negativo**: El sistema previene stock negativo
- **Validación de movimientos**:
  - Stock disponible en salidas y transferencias
  - Depósitos diferentes en transferencias
  - Cantidades positivas

## ⚡ Características de UX

- **Búsqueda en tiempo real**: En todas las tablas
- **Loading states**: Spinners durante operaciones
- **Confirmaciones**: Diálogos antes de eliminar
- **Estados visuales**: Badges de colores para estado de stock
- **Responsive**: Funciona en móviles y tablets
- **Navegación intuitiva**: Sidebar con rutas principales

## 📄 Licencia

ISC
