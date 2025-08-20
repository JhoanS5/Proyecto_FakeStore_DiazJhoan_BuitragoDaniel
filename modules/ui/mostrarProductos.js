const contenedor = document.getElementById('products');


export function mostrarProductos(productos){
    contenedor.innerHTML = '';

    if (!productos || productos.length === 0){
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productos.forEach(producto =>{
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
}