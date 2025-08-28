import { obtenerCarrito, eliminarProducto, vaciarCarrito, aumentarCantidad, disminuirCantidad, guardarCompraHistorial, obtenerHistorial } from "./carrito.js";

const carritoDesplegable = document.querySelector('.carrito-desplegable');
const carritoItemsContainer = document.querySelector('.carrito-items');
const carritoTotalContainer = document.querySelector('.carrito-total');

// Función para renderizar el historial de compras
function renderizarHistorial() {
  const historial = obtenerHistorial();
  const contenedorHistorial = document.getElementById('historial-compras');
  if (!contenedorHistorial) return;

  if (historial.length === 0) {
    contenedorHistorial.innerHTML = '<p>No hay compras anteriores.</p>';
  } else {
    contenedorHistorial.innerHTML = historial.map(compra => {
      const fecha = new Date(compra.fecha).toLocaleString();
      const productosHTML = compra.productos.map(p => `
        <li>${p.title} x${p.cantidad} - $${(p.price * p.cantidad).toFixed(2)}</li>
      `).join('');
      return `
        <div class="compra">
          <strong>Fecha:</strong> ${fecha}
          <ul>${productosHTML}</ul>
          <hr>
        </div>
      `;
    }).join('');
  }
}

// Función principal que se encarga de dibujar (renderizar) el contenido del carrito en la página.
export function renderizarCarrito() {
  const productosEnCarrito = obtenerCarrito();
  carritoItemsContainer.innerHTML = '';

  let total = 0;

  if (productosEnCarrito.length === 0) {
    carritoItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    carritoTotalContainer.innerHTML = '<span>Total:</span><span>$0.00</span>';
  } else {
    productosEnCarrito.forEach(producto => {
      const tituloAcortado = producto.title.length > 25 ? `${producto.title.substring(0, 22)}...` : producto.title;

      const itemHTML = `
        <div class="carrito-item">
          <img src="${producto.image}" alt="${producto.title}">
          <div class="item-details">
            <p class="item-title">${tituloAcortado}</p>
            <p>$${producto.price.toFixed(2)}</p>
            <div class="quantity-control">
              <span class="minus-btn" data-id="${producto.id}">−</span>
              <span>${producto.cantidad}</span>
              <span class="plus-btn" data-id="${producto.id}">+</span>
            </div>
          </div>
          <button class="btn-eliminar" data-id="${producto.id}">
            <img src="./assets/img/eliminar.png" alt="Eliminar producto" class="icono-eliminar">
          </button>
        </div>
      `;
      carritoItemsContainer.innerHTML += itemHTML;
      total += producto.price * producto.cantidad;
    });

    carritoTotalContainer.innerHTML = `
      <span>Total:</span>
      <span>$${total.toFixed(2)}</span>

      <button id="verHistorial" type="button">Ver compras anteriores</button>
      <div id="historial-compras" class="contenedor-historial" style="display:none; max-height: 300px; overflow-y: auto; margin-top: 1rem;"></div>
    `;
  }

  document.querySelectorAll('.btn-eliminar').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation(); // Evita que otros eventos se disparen y se cierre el carrito.
      const productId = parseInt(e.currentTarget.dataset.id);

      // Usa SweetAlert para confirmar la eliminación del producto.
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, ¡eliminar!",
        cancelButtonText: "No, ¡cancelar!",
        confirmButtonColor: "#20be0bff",
        cancelButtonColor: "#d33",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarProducto(productId);
          renderizarCarrito();
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado del carrito.",
            icon: "success"
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El producto está a salvo :)",
            icon: "error"
          });
        }
      });
    });
  });

  // Configura los eventos para los botones de aumentar cantidad.
  document.querySelectorAll('.plus-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(e.currentTarget.dataset.id);
      aumentarCantidad(productId);
      renderizarCarrito();
    });
  });

  // Configura los eventos para los botones de disminuir cantidad.
  document.querySelectorAll('.minus-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(e.currentTarget.dataset.id);
      const pudoDisminuir = disminuirCantidad(productId);
      if (!pudoDisminuir) {
        Swal.fire({
          icon: 'warning',
          title: 'Cantidad mínima',
          text: 'No puedes disminuir más, la cantidad mínima es 1.',
        });
      }
      renderizarCarrito();
    });
  });
}

// Función que inicializa los eventos principales de la interfaz del carrito.
export function inicializarCarritoUI() {
  const carritoBtn = document.querySelector('.cart');
  const btnFinalizar = document.querySelector('.btn-finalizar');
  const btnVerHistorial = document.getElementById('verHistorial');
  const contenedorHistorial = document.getElementById('historial-compras');

  if (btnVerHistorial && contenedorHistorial) {
    btnVerHistorial.addEventListener('click', () => {
      if (contenedorHistorial.style.display === 'none' || contenedorHistorial.style.display === '') {
        renderizarHistorial();
        contenedorHistorial.style.display = 'block';
        btnVerHistorial.textContent = 'Ocultar compras anteriores';
      } else {
        contenedorHistorial.style.display = 'none';
        btnVerHistorial.textContent = 'Ver compras anteriores';
      }
    });
  }

  if (carritoBtn && carritoDesplegable && btnFinalizar) {
    carritoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      carritoDesplegable.classList.toggle('visible');
      renderizarCarrito();
    });

    document.addEventListener('click', (e) => {
      const clickDentroCarrito = carritoDesplegable.contains(e.target) || carritoBtn.contains(e.target);
      const clickDentroSweetAlert = e.target.closest('.swal2-container') !== null;

      if (!clickDentroCarrito && !clickDentroSweetAlert) {
        carritoDesplegable.classList.remove('visible');
      }
    });

    btnFinalizar.addEventListener('click', (e) => {
      e.stopPropagation();

      const productosEnCarrito = obtenerCarrito();

      if (productosEnCarrito.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Carrito vacío',
          text: 'No hay productos para comprar.',
        });
        return;
      }

      guardarCompraHistorial(productosEnCarrito);
      
      vaciarCarrito();
      renderizarCarrito();
      Swal.fire({
        title: "¡Compra exitosa!",
        text: "¡Gracias por tu compra! Tu pedido está en camino.",
        icon: "success"
      });
    });

  } else {
    console.error("Error: Elementos del carrito no encontrados en el HTML.");
  }
}