let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Guarda el estado actual del carrito en el almacenamiento local del navegador.
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Exporta una función para agregar un producto al carrito. Si el producto ya existe, solo aumenta su cantidad.
export function agregarProducto(producto) {
  const itemExistente = carrito.find(item => item.id === producto.id);
  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarrito();
}

// Exporta una función para eliminar un producto del carrito por su ID.
export function eliminarProducto(productId) {
  carrito = carrito.filter(item => item.id !== productId);
  guardarCarrito();
}

// Exporta una función para vaciar completamente el carrito.
export function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
}

// Exporta una función para aumentar la cantidad de un producto específico.
export function aumentarCantidad(productId) {
  const item = carrito.find(item => item.id === productId);
  if (item) {
    item.cantidad++;
    guardarCarrito();
  }
}

// Exporta una función para disminuir la cantidad de un producto.
export function disminuirCantidad(productId) {
  const item = carrito.find(item => item.id === productId);
  if (item && item.cantidad > 1) {
    item.cantidad--;
    guardarCarrito();
    return true; 
  } else if (item && item.cantidad === 1) {
    return false; 
  }
}

// Exporta una función para obtener el array completo del carrito.
export function obtenerCarrito() {
  return carrito;
}