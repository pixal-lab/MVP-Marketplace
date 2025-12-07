# Marketplace de Materiales de Construcción - MVP Conceptual

## Descripción
MVP conceptual de un marketplace especializado en materiales de construcción y remodelamiento, enfocado en mostrar el flujo principal de usuario sin registros, formularios complejos ni subidas de archivos.

## Arquitectura del MVP

### Tres Ejes Principales

1. **Inventario**: Catálogo de productos con stock geolocalizado, soporte para materiales nuevos y excedentes
2. **Experiencia de Compra**: Búsqueda, listas de materiales, carrito y checkout simplificado
3. **Logística**: Seguimiento de pedidos y entregas

## Flujo Principal de Usuario

1. **Búsqueda** → Usuario busca materiales por nombre, categoría o SKU
2. **Exploración** → Visualiza productos con disponibilidad por proveedor y ubicación
3. **Selección** → Agrega productos al carrito o crea lista de materiales
4. **Checkout** → Selecciona dirección, horario de entrega y confirma pedido
5. **Seguimiento** → Monitorea el estado del pedido en tiempo real

## Estructura del Proyecto

```
Marketplace/
├── index.html          # Página principal - Búsqueda
├── producto.html       # Vista de producto
├── carrito.html        # Carrito de compras
├── lista-materiales.html # Gestión de listas
├── checkout.html       # Proceso de checkout
├── seguimiento.html    # Seguimiento de pedido
├── js/
│   ├── app.js         # Lógica principal
│   ├── inventario.js  # Gestión de inventario
│   └── logistica.js   # Gestión logística
└── diagrama-flujo.md  # Diagrama de acciones principales
```

## Características del MVP

- ✅ Búsqueda avanzada con filtros
- ✅ Visualización de productos con disponibilidad geolocalizada
- ✅ Carrito de compras con cantidades fraccionables
- ✅ Listas de materiales (crear, guardar, compartir)
- ✅ Checkout simplificado
- ✅ Seguimiento de pedidos en tiempo real
- ❌ Sin registros de usuario
- ❌ Sin formularios complejos
- ❌ Sin subida de archivos

