# Reporte Detallado de Estado del Proyecto: Gestión de Insumos

Este documento detalla el estado funcional de cada sección de la aplicación para identificar brechas entre la UI y la lógica de negocio.

## Resumen Ejecutivo
La aplicación es un **MVP Frontend funcional en términos de navegación y visualización**, pero **carece de lógica de negocio real**. Todos los datos son estáticos (hardcoded) y las acciones de creación/edición/borrado son puramente decorativas.

## Detalle por Sección

### 1. Sistema & Seguridad
- **Login / Autenticación:** ❌ **INEXISTENTE.**
  - No existe pantalla de inicio de sesión.
  - No hay protección de rutas (cualquiera entra al dashboard).
  - No hay manejo de sesiones ni roles de usuario.

### 2. Tablero Principal (Dashboard)
- **Botones de Acción:**
  - `[+ Nuevo Ingreso]`: ❌ Visualmente presente, sin evento `onClick` ni redirección. No hace nada.
  - `[+ Nueva Factura]`: ❌ Visualmente presente, no hace nada.
- **KPIs (Tarjetas):** Datos estáticos ($ 4.5M, 1,250 stock, etc.).
- **Gráficos:** Renderizan datos de prueba fijos (`invoiceData` y `stockData` definidos en el componente).
- **Tabla Próximas Entregas:** HTML estático, no es dinámico.

### 3. Stock e Insumos (`/stock`)
- **Tabla:** Muestra un array fijo (`DUMMY_STOCK`).
- **Filtrado:** ✅ Funciona parcialmente (filtra el array local en memoria por nombre/categoría).
- **Botón [+ Nuevo Item]:** ❌ Visual, sin acción. No abre modal ni formulario.
- **Acciones de Fila:** Botón de "..." (menú) existe pero no despliega nada.
- **Estados:** Los badges (Bajo/OK) son lógica visual basada en el mock, no en reglas de negocio reales.

### 4. Cajas Quirúrgicas (`/kits`)
- **Botón [+ Nueva Caja]:** ❌ Sin acción asignada.
- **Listado:** Componente `KitList` renderiza datos estáticos. No se puede entrar al detalle de una caja ni ver su composición.

### 5. Facturación y Cobros (`/invoices`)
- **Tabla:** Array estático (`INVOICES`).
- **Pestañas (Todos/Obras Sociales/Públicos):** ✅ Lógica local funcional para filtrar el array estático.
- **Botón [Exportar]:** ❌ Visual, no genera ningún archivo.
- **Estados:** Colores de badges funcionan visualmente, pero no dependen de fechas reales o lógica de vencimiento automática.

### 6. Logística y Agenda (`/calendar`)
- **Calendario:** Visualización mensual estática (Hardcodeado a "Diciembre 2023").
- **Navegación:** Los botones `<` y `>` (mes anterior/siguiente) no cambian el mes.
- **Eventos:** Array fijo de entregas. No se pueden arrastrar, clickear para ver detalles ni agregar nuevos.
- **Botón [+ Nuevo Evento]:** ❌ Sin acción.

### 7. Clientes (`/clients`)
- **Listado:** Tabla estática.
- **Botón [+ Nuevo Cliente]:** ❌ Sin acción.
- **Edición:** No es posible editar datos de clientes existentes.

### 8. Usuarios (`/users`)
- **Listado:** Tabla estática.
- **Botón [+ Nuevo Usuario]:** ❌ Sin acción.
- **Permisos:** La columna de "Rol" es mero texto, no tiene implicancia en el sistema.

### 9. Configuración (`/settings`)
- **Tema:** ✅ El toggle Claro/Oscuro funciona (persistencia local).
- **Notificaciones:** ❌ Los "switches" son divs estilizados con CSS (`translate-x-5`), no son interactivos (no se pueden apagar/prender).
- **Cuenta:** Inputs `readOnly` con valores quemados ("Juan Pérez"). No hay formulario de edición de perfil.

## Conclusión Técnica para IA
Para convertir este prototipo en un producto real se requiere:
1. **Backend:** Crear API Routes en `app/api/` o un servidor externo.
2. **Base de Datos:** Definir esquema (Prisma/SQL) para: `Products`, `StockMovements`, `Invoices`, `Clients`, `Events`, `Users`.
3. **State Management:** Reemplazar `useState` local y arrays fijos por `useEffect` + `fetch` o React Query para traer datos reales.
4. **Formularios:** Crear formularios reales (React Hook Form) para las acciones de "Nuevo...".
5. **Auth:** Implementar NextAuth.js o similar.
