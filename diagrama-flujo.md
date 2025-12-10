# Diagrama de Flujo - Marketplace de Materiales

## Diagrama Visual de Flujo Principal (Mermaid)

```mermaid
flowchart TD
    A[INICIO - Página Principal] --> B[Búsqueda de Materiales]
    B --> C{Modo de Búsqueda}
    C -->|Por Nombre| D[Resultados]
    C -->|Por Categoría| D
    C -->|Por SKU| D
    D --> E{Filtros y Ordenamiento}
    E --> F[Ver Producto]
    F --> G{Acción}
    G -->|Ver Disponibilidad| H[Disponibilidad por Proveedor]
    G -->|Agregar al Carrito| I[Carrito de Compras]
    G -->|Agregar a Lista| J[Gestión de Listas]
    J --> K{Crear/Editar/Compartir}
    I --> L{Acción en Carrito}
    L -->|Modificar Cantidades| I
    L -->|Eliminar Productos| I
    L -->|Proceder a Checkout| M[Checkout]
    M --> N[Seleccionar Dirección]
    N --> O[Seleccionar Horario]
    O --> P[Revisar Resumen]
    P --> Q[Confirmar Pedido]
    Q --> R[Pedido Confirmado]
    R --> S[Reserva Stock HOLD]
    S --> T[Generar Orden de Envío]
    T --> U[Asignar Operador]
    U --> V[Seguimiento de Pedido]
    V --> W{Ver Seguimiento}
    W -->|Estado Actual| X[Estado del Pedido]
    W -->|Tracking Tiempo Real| Y[Ubicación en Mapa]
    W -->|Timeline| Z[Historial de Eventos]
    X --> AA[Entregado]
    Y --> AA
    Z --> AA
    AA --> AB{¿Excedentes?}
    AB -->|Sí| AC[Gestión de Excedentes]
    AB -->|No| [*]
    AC --> AD{Decisión}
    AD -->|Devolver| AE[Solicitar Devolución]
    AD -->|Vender| AF[Registrar Excedente]
    AE --> AG[Retiro Logístico]
    AF --> AH[Capturar Información]
    AH --> AI[Fotos y Condición]
    AI --> AG
    AG --> AJ[Tracking Retiro]
    AJ --> AK[Recepción en QC]
    AK --> AL{Control Calidad}
    AL -->|Aprobado| AM[Publicar en Marketplace]
    AL -->|Rechazado| AN[Notificar Cliente]
    AM --> AO[Excedente Disponible]
    AE --> AP[Procesar Devolución]
    AP --> AQ[Reembolso/Ajuste]
    AQ --> [*]
    AN --> [*]
    AO --> AR[Compra de Excedente]
    AR --> AS[Venta Completada]
    AS --> [*]
```

## Estados del Pedido (Mermaid)

```mermaid
stateDiagram-v2
    [*] --> Confirmado: Pedido Creado
    Confirmado --> ReservaStock: Bloqueo Automático
    ReservaStock --> EnPreparacion: Stock Verificado
    EnPreparacion --> Asignado: Listo para Retiro
    Asignado --> Retirado: Operador Asignado
    Retirado --> EnRuta: Salida de Bodega
    EnRuta --> Cercano: Aproximándose
    Cercano --> Entregado: Llegada a Destino
    Entregado --> [*]
    
    EnRuta --> Incidencia: Problema Detectado
    Incidencia --> EnRuta: Resuelto
    Incidencia --> Cancelado: No Resoluble
    Cancelado --> [*]
```

## Flujo Principal de Acciones (Texto)

```
┌─────────────────────────────────────────────────────────────────┐
│                    INICIO - PÁGINA PRINCIPAL                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   BÚSQUEDA     │
                    │  de Materiales │
                    └────────┬───────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
        ┌───────────┐ ┌──────────┐ ┌──────────┐
        │ Por Nombre│ │Categoría │ │   SKU    │
        └─────┬─────┘ └─────┬────┘ └─────┬────┘
              │             │             │
              └─────────────┴─────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  RESULTADOS    │
                    │  de Búsqueda   │
                    └────────┬───────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
        ┌───────────┐ ┌──────────┐ ┌──────────┐
        │ Filtrar   │ │ Ordenar  │ │ Ver      │
        │ Resultados│ │ Resultado│ │ Producto │
        └───────────┘ └──────────┘ └─────┬────┘
                                          │
                                          ▼
                                 ┌────────────────┐
                                 │  VISTA PRODUCTO│
                                 └────────┬───────┘
                                          │
                          ┌───────────────┼───────────────┐
                          │               │               │
                          ▼               ▼               ▼
                  ┌─────────────┐ ┌──────────┐ ┌──────────────┐
                  │ Ver          │ │ Agregar  │ │ Agregar a    │
                  │ Disponibilidad│ │ al Carrito│ │ Lista        │
                  └─────────────┘ └─────┬────┘ └──────┬───────┘
                                        │             │
                                        │             ▼
                                        │    ┌────────────────┐
                                        │    │ GESTIÓN LISTAS │
                                        │    └────────┬───────┘
                                        │             │
                                        │    ┌────────┼────────┐
                                        │    │        │        │
                                        │    ▼        ▼        ▼
                                        │ ┌──────┐ ┌──────┐ ┌──────┐
                                        │ │Crear │ │Editar│ │Compartir│
                                        │ └──────┘ └──────┘ └──────┘
                                        │
                                        ▼
                                 ┌────────────────┐
                                 │     CARRITO    │
                                 └────────┬───────┘
                                          │
                          ┌───────────────┼───────────────┐
                          │               │               │
                          ▼               ▼               ▼
                  ┌─────────────┐ ┌──────────┐ ┌──────────────┐
                  │ Modificar   │ │ Eliminar │ │ Proceder a   │
                  │ Cantidades  │ │ Productos│ │ Checkout     │
                  └─────────────┘ └──────────┘ └──────┬───────┘
                                                       │
                                                       ▼
                                              ┌────────────────┐
                                              │    CHECKOUT    │
                                              └────────┬───────┘
                                                       │
                          ┌───────────────────────────┼───────────────────────────┐
                          │                           │                           │
                          ▼                           ▼                           ▼
                  ┌───────────────┐         ┌──────────────┐         ┌──────────────┐
                  │ Seleccionar   │         │ Seleccionar  │         │ Revisar      │
                  │ Dirección     │         │ Horario      │         │ Resumen      │
                  └───────┬───────┘         └──────┬───────┘         └──────┬───────┘
                          │                       │                       │
                          └───────────────────────┴───────────────────────┘
                                                       │
                                                       ▼
                                              ┌────────────────┐
                                              │  CONFIRMAR     │
                                              │     PEDIDO     │
                                              └────────┬───────┘
                                                       │
                                                       ▼
                                              ┌────────────────┐
                                              │  PEDIDO        │
                                              │  CONFIRMADO    │
                                              └────────┬───────┘
                                                       │
                          ┌───────────────────────────┼───────────────────────────┐
                          │                           │                           │
                          ▼                           ▼                           ▼
                  ┌───────────────┐         ┌──────────────┐         ┌──────────────┐
                  │ Reserva Stock │         │ Generar      │         │ Asignar      │
                  │ (HOLD)        │         │ Orden Envío  │         │ Operador     │
                  └───────────────┘         └──────┬───────┘         └──────┬───────┘
                                                    │                       │
                                                    └───────────────────────┘
                                                             │
                                                             ▼
                                                    ┌────────────────┐
                                                    │  SEGUIMIENTO   │
                                                    │    PEDIDO      │
                                                    └────────┬───────┘
                                                             │
                          ┌──────────────────────────────────┼──────────────────────────────────┐
                          │                                  │                                  │
                          ▼                                  ▼                                  ▼
                  ┌───────────────┐                 ┌──────────────┐                 ┌──────────────┐
                  │ Ver Estado    │                 │ Ver Tracking  │                 │ Ver Timeline │
                  │ Actual       │                 │ en Tiempo Real│                 │ de Eventos   │
                  └───────┬───────┘                 └──────┬───────┘                 └──────┬───────┘
                          │                                │                                │
                          └────────────────────────────────┴────────────────────────────────┘
                                                             │
                                                             ▼
                                                    ┌────────────────┐
                                                    │   ENTREGADO    │
                                                    └────────────────┘
```

## Estados del Pedido

```
PEDIDO CONFIRMADO
    │
    ▼
RESERVA DE STOCK (HOLD)
    │
    ▼
EN PREPARACIÓN
    │
    ▼
ASIGNADO A OPERADOR
    │
    ▼
RETIRADO DE BODEGA
    │
    ▼
EN RUTA
    │
    ▼
CERCANO A DESTINO
    │
    ▼
ENTREGADO
    │
    ▼
¿EXCEDENTES?
    │
    ├─→ SÍ → GESTIÓN DE EXCEDENTES
    │         │
    │         ├─→ DEVOLVER → RETIRO → REEMBOLSO
    │         │
    │         └─→ VENDER → REGISTRO → RETIRO → QC → PUBLICAR
    │
    └─→ NO → FIN
```

## Flujo de Excedentes (Mermaid)

```mermaid
flowchart TD
    A[Pedido Entregado] --> B{¿Hay Excedentes?}
    B -->|No| C[Fin del Proceso]
    B -->|Sí| D{Decisión del Cliente}
    D -->|Devolver| E[Solicitar Devolución]
    D -->|Vender| F[Registrar Excedente]
    
    F --> G[Capturar Información]
    G --> H[SKU, Cantidad, Porcentaje]
    H --> I[Condición y Fotos]
    I --> J[Ubicación y Referencia]
    J --> K[Calcular Precio Sugerido]
    K --> L[Solicitar Retiro Logístico]
    
    E --> L
    L --> M[Generar Orden de Retiro]
    M --> N[Asignar Operador]
    N --> O[Tracking de Retiro]
    O --> P[Recepción en QC]
    
    P --> Q{Control de Calidad}
    Q -->|Aprobado| R[Publicar en Marketplace]
    Q -->|Rechazado| S[Notificar Cliente]
    
    R --> T[Excedente Disponible]
    T --> U[Compra de Excedente]
    U --> V[Venta Completada]
    
    E --> W[Procesar Devolución]
    W --> X[Reembolso/Ajuste Inventario]
    X --> Y[Fin]
    
    S --> Y
    V --> Y
```

## Acciones Principales por Módulo

### Módulo de Búsqueda
- Buscar por nombre/categoría/SKU
- Filtrar resultados (nuevo/excedente, condición, ubicación)
- Ordenar por relevancia/precio/distancia

### Módulo de Producto
- Ver especificaciones técnicas
- Ver disponibilidad por proveedor
- Ver ubicación geolocalizada
- Agregar al carrito
- Agregar a lista

### Módulo de Carrito
- Modificar cantidades
- Eliminar productos
- Ver totales
- Proceder a checkout

### Módulo de Listas
- Crear lista
- Editar lista
- Compartir lista
- Convertir a cotización

### Módulo de Checkout
- Seleccionar dirección
- Seleccionar horario
- Revisar resumen
- Confirmar pedido

### Módulo de Seguimiento
- Ver estado actual
- Ver tracking en tiempo real
- Ver timeline de eventos
- Recibir notificaciones

### Módulo de Excedentes (RF-EC-29, RF-EC-30, RF-EC-31, RF-EC-32)
- Detectar excedentes después de entrega
- Solicitar devolución o venta
- Registrar excedente con fotos y condición
- Solicitar retiro logístico
- Seguimiento de retiro
- Control de calidad (QC)
- Publicación en marketplace secundario
- Procesar reembolso por devolución

