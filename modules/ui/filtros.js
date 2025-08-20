import { mostrarProductos } from "./mostrarProductos.js";

let productosGlobal = []; //Array para guardar los productos que se van a filtrar.

// Captura del DOM
const filterAllCheckbox = document.getElementById('filter-all');
//document... devuelve un NodeList, por esa razón se utiliza Array.from para convertirlo a Array para usar los metodos .map() .filter() .forEach().
const categoryCheckboxes = Array.from(document.querySelectorAll('.filters input[type="checkbox"]')); 
const searchInput = document.getElementById('searchInput');
const clearBtn = document.querySelector('.clear-btn');
const sortSelect = document.getElementById('sortSelect');

export function inicializarFiltros(productos){
    productosGlobal = productos;

    categoryCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb === filterAllCheckbox && cb.checked) {
                // Si "Todos los productos" se marca, desmarcar los demás
                categoryCheckboxes.forEach(otroCb => {
                    if (otroCb !== cb) otroCb.checked = false;
                });
            } else if (cb !== filterAllCheckbox && cb.checked) {
                // Si se marca alguna categoría, desmarcar "Todos los productos"
                filterAllCheckbox.checked = false;
            }
            aplicarFiltros();
        });
    });

    // Listener para el botón de limpiar búsqueda
    clearBtn.addEventListener('click', () => {
        searchInput.value = "";
        searchInput.focus();
        aplicarFiltros();
    });

    // Listener para el input de búsqueda (filtrar mientras se escribe)
    searchInput.addEventListener('input', () => {
        aplicarFiltros();
    });

    // Listener para el select de orden
    sortSelect.addEventListener('change', () => {
        aplicarFiltros();
    });

    // Mostrar todos los productos inicialmente al cargar la página
    mostrarProductos(productosGlobal);
}

function aplicarFiltros(){
    /*
        Filter selecciona solo los checkboxes que estan marcados y que no son el checkbox todos los productos
        Crea un nuevo array con todos los elementos que cumplen una condición que tú defines.

        Map Después de filtrar los checkboxes marcados, map extrae el valor (value) de cada checkbox para 
        obtener un array con las categorías seleccionadas.
        Crea un nuevo array transformando cada elemento del array original según una función que tú defines.
    */
    const categoriasSeleccionadas = categoryCheckboxes.filter(cb => cb.checked && cb !== filterAllCheckbox).map(cb => cb.value);

    const textoBusqueda = searchInput.value.toLowerCase();

    let productosFiltrados = productosGlobal.filter(producto => {
        const categoriaOk = filterAllCheckbox.checked || categoriasSeleccionadas.includes(producto.category);
        const textoOk = producto.title.toLowerCase().includes(textoBusqueda);
        return categoriaOk && textoOk;
    });

    const orden = sortSelect.value;

    if (orden === "Relevancia") {
        productosFiltrados.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    }else if (orden === "precio-asc") {
        productosFiltrados.sort((a, b) => a.price - b.price);
    }else if (orden === "precio-desc") {
        productosFiltrados.sort((a, b) => b.price - a.price);
    }else if (orden === "orden-alfabetico-AZ") {
        productosFiltrados.sort((a, b) => a.title.localeCompare(b.title));
    }else if (orden === "orden-alfabetico-ZA") {
        productosFiltrados.sort((a, b) => b.title.localeCompare(a.title)); // localeCompare compara cadenas de texto para ordenarlas alfabeticamente.
    }

    mostrarProductos(productosFiltrados);
}