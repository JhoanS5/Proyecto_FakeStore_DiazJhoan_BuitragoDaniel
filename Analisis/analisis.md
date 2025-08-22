# Análisis de Proyecto: FakeStore

Este documento detalla las decisiones de diseño y la estructura del proyecto **"FakeStore"**, cubriendo la interfaz de usuario, la gestión de datos y las funcionalidades clave.

---

## 1. Sobre la interfaz (UI/UX)

**Diseño visual:**  
El diseño de la tienda *FakeStore* se presenta con un estilo **minimalista** y una paleta de colores agradables. Se utilizó un **diseño en GRID** para organizar los productos y se empleó el **ícono del carrito** para facilitar al usuario visualizar sus productos seleccionados.

**Experiencia de usuario (UX):**  
La prioridad principal fue la **facilidad de uso** y la rapidez para encontrar productos. Para lograrlo, se implementaron **filtros** y un **buscador eficiente**. El diseño está pensado para la simplicidad en el proceso de compra y para ser **accesible en dispositivos móviles**, garantizando una experiencia fluida desde cualquier dispositivo.

---

## 2. Sobre los wireframes o bocetos

**Herramientas:**  
Para el diseño y prototipado de las pantallas se utilizó la herramienta digital **Figma**.

**Pantallas clave:**  
Las pantallas principales diseñadas fueron:
- Página de productos
- Carrito de compras

**Visualización de bocetos:**  
Se incluye un PDF con los bocetos y wireframes para que se puedan revisar de manera visual:  
[Ver bocetos en PDF](../assets/FakeStore.pdf) <!-- Reemplaza con la ruta real del archivo PDF -->

---

## 3. Sobre la estructura de datos

**Representación de productos:**  
Los productos se consumen a través de una **API**, se transforman en **objetos JSON** y se almacenan en una variable llamada `productos`. Esta variable se pasa a un módulo de visualización que los **renderiza dinámicamente** en el HTML.

**Representación del carrito:**  
El carrito se gestiona con dos módulos:
- `carrito.js`: Maneja la **lógica interna** del carrito (agregar, eliminar productos y calcular el total).  
- `carritoUI.js`: Se encarga de la **parte visual**, actualizando el DOM y mostrando los productos al usuario.

**Almacenamiento de datos:**  
Para asegurar la **persistencia** del carrito (evitando que se pierdan los datos al recargar o salir de la página), se utiliza **localStorage**.

---

## 4. Sobre los filtros y ordenamientos

**Filtros:**  
Se implementaron filtros por categoría:
- Ropa de hombre
- Ropa de mujer
- Joyería
- Electrónica
- Todos los productos

Además, se incluyó un **filtro de búsqueda (Search)** que permite al usuario encontrar productos mediante el **nombre**.

**Criterios de ordenamiento:**  
Los productos se pueden ordenar según varios criterios:
- **Precio:** de menor a mayor y de mayor a menor  
- **Relevancia**  
- **Orden alfabético:** ascendente y descendente

**Justificación de elección:**  
Estos filtros y opciones de ordenamiento se eligieron para:
- Facilitar la búsqueda
- Ahorrar tiempo al usuario
- Permitir la comparación de productos de manera sencilla

---

## 5. Justificación de diseño

**Objetivos del diseño:**  
El principal objetivo fue crear un **diseño atractivo y fácil de usar**, que permitiera a los usuarios comprar de manera sencilla y rápida. Se buscó que la tienda fuera **completamente funcional y accesible** desde cualquier dispositivo: móvil, tableta o portátil.

**Accesibilidad:**  
- Se seleccionaron colores pasteles agradables a la vista.  
- Se diseñaron **botones de tamaño adecuado** para facilitar su uso en dispositivos táctiles.  
- Se mejoró la **interacción general con la interfaz**, asegurando comodidad y claridad en la navegación.