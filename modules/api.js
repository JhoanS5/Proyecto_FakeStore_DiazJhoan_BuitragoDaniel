import { API_URL } from "./config.js";

// Funcion asincrona para cargar todos los productos desde la API.
export async function loadProductos() {
    try {
        // Hacemos la petición a la API
        const respuesta = await fetch(API_URL);

        // Verificamos que la respuesta sea exitosa
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        // Convertimos la respuesta a JSON
        const productos = await respuesta.json();
        console.log(productos);
        return productos;

    } catch (error) {
        // Si ocurre un error, lo mostramos en consola
        console.error(`Hubo un problema al cargar los productos: ${error.message}`);
    }
}
