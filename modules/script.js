import { loadProductos } from "./api.js";

const searchInput = document.getElementById("searchInput");
const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click", () => {
    searchInput.value = "";        // elimina el texto
    searchInput.focus();           // vuelve a poner el cursor en el input
});

async function main() {
    const productos = await loadProductos();
    //Espacio para futuras funciones.
    //  ......
}

main();