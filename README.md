# 📺 TV Shows Finder

Aplicación web que permite buscar series de televisión usando la API de TVMaze, guardarlas como favoritas y mantenerlas almacenadas en el navegador.

---

## 🚀 Funcionalidades

* 🔍 Buscar series por nombre
* ❤️ Añadir y eliminar series de favoritos
* 💾 Guardado de datos con `localStorage`
* 🖼️ Imagen por defecto si la serie no tiene imagen
* ⭐ Mostrar puntuación de cada serie
* 🧹 Eliminar todos los favoritos con un solo clic

---

## 🛠️ Tecnologías utilizadas

* HTML5 (estructura semántica)
* SCSS (Sass), compilado a CSS3
* JavaScript (ES6)
* API pública: TVMaze
* HTML5 (estructura semántica)
* Vite (entorno de desarrollo)
* LocalStorage (persistencia de favoritos)

---

## 📦 Estructura del proyecto
* Configuración basada en Vite (starter kit de Adalab)
* `/src` → estructura de la página
* `/scss` → estilos
* `/js` → lógica de la aplicación
* `/partials` → fragmentos HTML reutilizables


---

## 🔄 Funcionamiento

1. El usuario introduce una búsqueda.
2. Se hace una petición a la API de TVMaze.
3. Se muestran los resultados en pantalla.
4. El usuario puede:

   * Añadir una serie a favoritos
   * Eliminarla individualmente
   * Borrar todos los favoritos
5. Los favoritos se guardan en `localStorage` para persistir entre sesiones.

---

## 💡 Detalles técnicos

* Se utiliza `fetch` para consumir la API.
* Se implementa **delegación de eventos** para manejar clics en elementos dinámicos.
* Se usa `localStorage` para guardar:

  * Favoritos (`favs`)
  * Caché de resultados (`cache`)
* Métodos de arrays utilizados:

  * `find()`
  * `findIndex()`
  * `push()`
  * `some()`
---
## ⚡ Instalación

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Arranca el proyecto en desarrollo: `npm run dev`
   * Para generar una versión para producción: `npm run build`
   * Para previsualizar la versión final: `npm run preview`
---


## ⚠️ Posibles mejoras

* Manejo de errores en la petición a la API
* Mejora de accesibilidad
* Optimización del renderizado


---

## 👩‍💻 Autora

Proyecto realizado como parte de la evaluación del módulo 2 de JavaScript del bootcamp de Adalab (Desarrollo Web Full Stack).

El objetivo era aplicar conocimientos de manipulación del DOM, consumo de APIs, gestión de eventos y persistencia de datos en el navegador mediante localStorage.
