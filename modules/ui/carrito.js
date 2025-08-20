let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function agregarProducto(producto) {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
}

export function eliminarProducto(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    guardarCarrito();
}

export function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
}

export function aumentarCantidad(productId) {
    const item = carrito.find(item => item.id === productId);
    if (item) {
        item.cantidad++;
        guardarCarrito();
    }
}

export function disminuirCantidad(productId) {
    const item = carrito.find(item => item.id === productId);
    if (item && item.cantidad > 1) {
        item.cantidad--;
        guardarCarrito();
        return true;  // Disminuyó correctamente
    } else if (item && item.cantidad === 1) {
        // No disminuye, cantidad mínima alcanzada
        return false; // Indica que no se pudo disminuir
    }
}

export function obtenerCarrito() {
    return carrito;
}