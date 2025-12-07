// Lógica principal del Marketplace MVP

// Simulación de datos del marketplace
const MarketplaceData = {
    productos: [],
    carrito: [],
    listas: [],
    pedidos: []
};

// Funciones de búsqueda
function buscarProductos(query, filtros = {}) {
    // En producción, esto haría una llamada a la API
    console.log('Buscando productos:', query, filtros);
    return MarketplaceData.productos.filter(producto => {
        const matchQuery = !query || 
            producto.nombre.toLowerCase().includes(query.toLowerCase()) ||
            producto.sku.toLowerCase().includes(query.toLowerCase());
        
        const matchFiltros = (!filtros.tipoStock || producto.tipo === filtros.tipoStock || filtros.tipoStock === 'todos') &&
            (!filtros.condicion || producto.condicion === filtros.condicion || filtros.condicion === 'todas');
        
        return matchQuery && matchFiltros;
    });
}

// Funciones de carrito
function agregarAlCarrito(productoId, cantidad = 1) {
    const producto = MarketplaceData.productos.find(p => p.id === productoId);
    if (!producto) return false;
    
    const itemExistente = MarketplaceData.carrito.find(item => item.productoId === productoId);
    
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        MarketplaceData.carrito.push({
            productoId: productoId,
            cantidad: cantidad,
            precio: producto.precio,
            proveedor: producto.proveedor
        });
    }
    
    return true;
}

function eliminarDelCarrito(productoId) {
    const index = MarketplaceData.carrito.findIndex(item => item.productoId === productoId);
    if (index > -1) {
        MarketplaceData.carrito.splice(index, 1);
        return true;
    }
    return false;
}

// Funciones de listas
function crearLista(nombre) {
    const nuevaLista = {
        id: Date.now(),
        nombre: nombre,
        fechaCreacion: new Date().toISOString(),
        items: []
    };
    
    MarketplaceData.listas.push(nuevaLista);
    return nuevaLista;
}

function agregarALista(listaId, productoId, cantidad = 1) {
    const lista = MarketplaceData.listas.find(l => l.id === listaId);
    if (!lista) return false;
    
    const producto = MarketplaceData.productos.find(p => p.id === productoId);
    if (!producto) return false;
    
    lista.items.push({
        productoId: productoId,
        cantidad: cantidad,
        precio: producto.precio
    });
    
    return true;
}

// Funciones de checkout
function crearPedido(direccion, horario) {
    if (MarketplaceData.carrito.length === 0) {
        return null;
    }
    
    const pedido = {
        id: 'ORD-' + Date.now(),
        fecha: new Date().toISOString(),
        direccion: direccion,
        horario: horario,
        items: [...MarketplaceData.carrito],
        estado: 'confirmado',
        total: calcularTotal()
    };
    
    MarketplaceData.pedidos.push(pedido);
    MarketplaceData.carrito = []; // Limpiar carrito
    
    return pedido;
}

function calcularTotal() {
    const subtotal = MarketplaceData.carrito.reduce((sum, item) => 
        sum + (item.precio * item.cantidad), 0);
    const envio = 5000;
    const impuestos = subtotal * 0.19;
    return subtotal + envio + impuestos;
}

// Funciones de seguimiento
function obtenerEstadoPedido(pedidoId) {
    const pedido = MarketplaceData.pedidos.find(p => p.id === pedidoId);
    if (!pedido) return null;
    
    // Estados posibles: confirmado, en_preparacion, asignado, en_ruta, entregado
    return {
        pedido: pedido,
        estado: pedido.estado,
        timeline: generarTimeline(pedido)
    };
}

function generarTimeline(pedido) {
    const estados = [
        { estado: 'confirmado', tiempo: new Date(pedido.fecha) },
        { estado: 'en_preparacion', tiempo: new Date(new Date(pedido.fecha).getTime() + 15*60000) },
        { estado: 'asignado', tiempo: new Date(new Date(pedido.fecha).getTime() + 45*60000) },
        { estado: 'en_ruta', tiempo: new Date(new Date(pedido.fecha).getTime() + 65*60000) }
    ];
    
    return estados;
}

// Exportar funciones para uso global
window.MarketplaceApp = {
    buscarProductos,
    agregarAlCarrito,
    eliminarDelCarrito,
    crearLista,
    agregarALista,
    crearPedido,
    obtenerEstadoPedido,
    data: MarketplaceData
};

