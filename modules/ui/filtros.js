import { mostrarProductos } from "./mostrarProductos.js";

// Variable global para almacenar todos los productos originales.
let productosGlobal = [];

const filterAllCheckbox = document.getElementById('filter-all');
const categoryCheckboxes = Array.from(document.querySelectorAll('.filters input[type="checkbox"]'));
const searchInput = document.getElementById('searchInput');
const clearBtn = document.querySelector('.clear-btn');
const sortSelect = document.getElementById('sortSelect');

// Inicializa todos los eventos y la configuración para los filtros.
export function inicializarFiltros(productos) {
    productosGlobal = productos;

    categoryCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb === filterAllCheckbox && cb.checked) {
                categoryCheckboxes.forEach(otroCb => {
                    if (otroCb !== cb) otroCb.checked = false;
                });
            } else if (cb !== filterAllCheckbox && cb.checked) {
                filterAllCheckbox.checked = false;
            }
            aplicarFiltros();
        });
    });

    // Escucha el clic en el botón de "Limpiar".
    clearBtn.addEventListener('click', () => {
        searchInput.value = "";
        searchInput.focus();
        aplicarFiltros();
    });

    // Escucha cada vez que el usuario escribe en la barra de búsqueda.
    searchInput.addEventListener('input', () => {
        aplicarFiltros();
    });

    // Escucha los cambios en el menú de ordenamiento.
    sortSelect.addEventListener('change', () => {
        aplicarFiltros();
    });

    // Muestra todos los productos al inicio.
    mostrarProductos(productosGlobal);
}

// Filtra, busca y ordena los productos basándose en las selecciones del usuario.
function aplicarFiltros() {
    // Obtiene las categorías que están seleccionadas.
    const categoriasSeleccionadas = categoryCheckboxes.filter(cb => cb.checked && cb !== filterAllCheckbox).map(cb => cb.value);

    const textoBusqueda = searchInput.value.toLowerCase();

    // Filtra los productos según la categoría y el texto de búsqueda.
    let productosFiltrados = productosGlobal.filter(producto => {
        const categoriaOk = filterAllCheckbox.checked || categoriasSeleccionadas.includes(producto.category);
        const textoOk = producto.title.toLowerCase().includes(textoBusqueda);
        return categoriaOk && textoOk;
    });

    const orden = sortSelect.value;

    // Ordena la lista de productos filtrados.
    if (orden === "Relevancia") {
        productosFiltrados.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    } else if (orden === "precio-asc") {
        productosFiltrados.sort((a, b) => a.price - b.price);
    } else if (orden === "precio-desc") {
        productosFiltrados.sort((a, b) => b.price - a.price);
    } else if (orden === "orden-alfabetico-AZ") {
        productosFiltrados.sort((a, b) => a.title.localeCompare(b.title));
    } else if (orden === "orden-alfabetico-ZA") {
        productosFiltrados.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Muestra los productos que ya están filtrados y ordenados.
    mostrarProductos(productosFiltrados);
}