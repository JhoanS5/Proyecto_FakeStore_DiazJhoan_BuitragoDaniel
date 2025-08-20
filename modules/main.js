import { loadProductos } from "./api/api.js";
import { inicializarFiltros } from "./ui/filtros.js";

async function main() {
    const productos = await loadProductos();
    
    inicializarFiltros(productos);
}

main();