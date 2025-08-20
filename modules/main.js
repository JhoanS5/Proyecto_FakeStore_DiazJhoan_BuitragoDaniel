import { loadProductos } from "./api/api.js";
import { inicializarFiltros } from "./ui/filtros.js";
import { inicializarCarritoUI } from "./ui/carritoUI.js";

async function main() {
    const productos = await loadProductos();
    inicializarFiltros(productos);
    inicializarCarritoUI();
}

main();