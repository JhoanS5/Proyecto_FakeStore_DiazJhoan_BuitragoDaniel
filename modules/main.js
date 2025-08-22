import { loadProductos } from "./api/api.js";
import { inicializarFiltros } from "./ui/filtros.js";
import { inicializarCarritoUI } from "./ui/carritoUI.js";
import './ui/responsive.js';

/**
 * Función principal que orquesta el inicio de la aplicación.
 * Es 'async' porque necesita esperar a que los productos se carguen.
 */
async function main() {
    const productos = await loadProductos();
    inicializarFiltros(productos);
    inicializarCarritoUI();
}

main();