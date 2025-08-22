import { API_URL } from "../config/config.js";

// Funcion asincrona para cargar todos los productos desde la API.
export async function loadProductos() {
    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const productos = await respuesta.json();
    
        return productos;

    } catch (error) {
        console.error(`Hubo un problema al cargar los productos: ${error.message}`);
    }
}