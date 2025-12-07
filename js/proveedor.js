// Lógica para el panel de proveedor - Gestión de inventario

// Simulación de datos del proveedor
const ProveedorData = {
    proveedorId: 'PROV-001',
    nombre: 'Materiales ABC',
    sucursales: [
        { id: 'centro', nombre: 'Sucursal Centro', leadTime: 2 },
        { id: 'norte', nombre: 'Sucursal Norte', leadTime: 4 },
        { id: 'sur', nombre: 'Sucursal Sur', leadTime: 3 }
    ],
    inventario: [],
    movimientos: [],
    excedentes: [],
    alertas: []
};

// Funciones de gestión de inventario
function obtenerInventarioPorSucursal(sucursalId = null) {
    // En producción, esto haría una llamada a la API
    return ProveedorData.inventario.filter(item => 
        !sucursalId || item.sucursalId === sucursalId
    );
}

function actualizarStock(sku, sucursalId, nuevaCantidad, motivo = 'Ajuste manual') {
    // En producción, esto haría una llamada a la API
    const item = ProveedorData.inventario.find(i => 
        i.sku === sku && i.sucursalId === sucursalId
    );
    
    if (item) {
        const cantidadAnterior = item.stock;
        item.stock = nuevaCantidad;
        
        // Registrar movimiento
        registrarMovimiento({
            tipo: cantidadAnterior < nuevaCantidad ? 'entrada' : 'ajuste',
            sku: sku,
            sucursalId: sucursalId,
            cantidad: nuevaCantidad - cantidadAnterior,
            motivo: motivo,
            fecha: new Date().toISOString()
        });
        
        // Verificar alertas
        verificarAlertas(item);
        
        return true;
    }
    
    return false;
}

function registrarMovimiento(movimiento) {
    movimiento.id = Date.now();
    movimiento.usuario = 'Usuario Actual'; // En producción, obtener del contexto
    ProveedorData.movimientos.unshift(movimiento);
    
    // Mantener solo los últimos 100 movimientos
    if (ProveedorData.movimientos.length > 100) {
        ProveedorData.movimientos = ProveedorData.movimientos.slice(0, 100);
    }
}

function verificarAlertas(item) {
    // Verificar umbral mínimo
    if (item.stock < item.umbralMin) {
        crearAlerta({
            tipo: 'danger',
            sku: item.sku,
            mensaje: `Stock bajo el umbral mínimo (${item.stock}/${item.umbralMin} unidades)`,
            fecha: new Date().toISOString()
        });
    }
    // Verificar umbral máximo
    else if (item.stock > item.umbralMax) {
        crearAlerta({
            tipo: 'warning',
            sku: item.sku,
            mensaje: `Stock excede el umbral máximo (${item.stock}/${item.umbralMax} unidades)`,
            fecha: new Date().toISOString()
        });
    }
}

function crearAlerta(alerta) {
    alerta.id = Date.now();
    ProveedorData.alertas.unshift(alerta);
    
    // Mantener solo las últimas 50 alertas
    if (ProveedorData.alertas.length > 50) {
        ProveedorData.alertas = ProveedorData.alertas.slice(0, 50);
    }
}

// Funciones de gestión de excedentes
function aprobarExcedente(excedenteId) {
    const excedente = ProveedorData.excedentes.find(e => e.id === excedenteId);
    if (!excedente) return false;
    
    // En producción, esto enviaría el excedente a control de calidad
    excedente.estado = 'pendiente_qc';
    
    return true;
}

function rechazarExcedente(excedenteId) {
    const excedente = ProveedorData.excedentes.find(e => e.id === excedenteId);
    if (!excedente) return false;
    
    excedente.estado = 'rechazado';
    
    return true;
}

// Funciones de sincronización
function sincronizarStock() {
    // En producción, esto haría una llamada a la API del marketplace
    // para sincronizar el stock declarado con el stock real
    console.log('Sincronizando stock...');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Stock sincronizado correctamente' });
        }, 1000);
    });
}

function ejecutarReconciliacion() {
    // En producción, esto compararía el stock declarado con el stock transado
    console.log('Ejecutando reconciliación...');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                diferencias: [
                    { sku: 'CEM-PORT-50', declarado: 150, transado: 145, diferencia: -5 },
                    { sku: 'LAD-FIS-1000', declarado: 80, transado: 82, diferencia: 2 }
                ]
            });
        }, 1000);
    });
}

// Funciones de HOLD (reserva temporal)
function obtenerStockEnHold(sku, sucursalId) {
    // En producción, esto consultaría las reservas activas
    return ProveedorData.inventario
        .filter(item => item.sku === sku && item.sucursalId === sucursalId)
        .reduce((sum, item) => sum + (item.hold || 0), 0);
}

function liberarHold(pedidoId) {
    // En producción, esto liberaría el stock reservado para un pedido
    console.log('Liberando HOLD para pedido:', pedidoId);
    return true;
}

// Exportar funciones para uso global
window.ProveedorApp = {
    obtenerInventarioPorSucursal,
    actualizarStock,
    registrarMovimiento,
    verificarAlertas,
    crearAlerta,
    aprobarExcedente,
    rechazarExcedente,
    sincronizarStock,
    ejecutarReconciliacion,
    obtenerStockEnHold,
    liberarHold,
    data: ProveedorData
};

