import { agregarProducto } from "./carrito.js";
import { renderizarCarrito } from "./carritoUI.js";

const contenedor = document.getElementById('products');

// Función que toma una lista de productos y los lista para luego ser llamada
export function mostrarProductos(productos) {
    contenedor.innerHTML = '';

    if (!productos || productos.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="product-category">${producto.category}</div>
            <img src="${producto.image}" alt="${producto.title}" class="product-image">
            <h3 class="product-title">${producto.title}</h3>
            <p class="product-description">${producto.description.substring(0, 100)}...</p>
            <p class="product-price">$${producto.price.toFixed(2)}</p>
            <p class="product-rating">
                ⭐️ ${producto.rating?.rate ?? 'N/A'} (${producto.rating?.count ?? 0})
            </p>
            <button class="add-to-cart-btn" data-id="${producto.id}">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);
    });

    // Selecciona todos los botones de "Agregar al carrito".
    const botonesAgregar = document.querySelectorAll('.add-to-cart-btn');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = parseInt(e.target.dataset.id);
            const productoAAgregar = productos.find(p => p.id === productoId);

            if (productoAAgregar) {
                agregarProducto(productoAAgregar);
                renderizarCarrito();

                Swal.fire({
                    title: "Producto agregado!",
                    text: `${productoAAgregar.title} ha sido añadido a tu carrito.`,
                    icon: "success",
                    draggable: true
                });
            }
        });
    });
}