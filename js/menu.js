// El archivo js/menu.js está integrado en app.js por simplicidad
// Si deseas tenerlo separado, asegúrate de que sea algo como lo siguiente
// menu.js
import { loadRandomJoke } from './app.js';

// Ahora puedes usar loadRandomJoke en cualquier parte de menu.js


export function loadMenu() {
    const menu = document.getElementById("menu");
    menu.innerHTML = `
      <button onclick="loadRandomJoke()">Chistes</button>
      <button onclick="loadSearch()">Buscar</button>
      <button onclick="loadFilter()">Filtrar</button>
      <button onclick="loadFavorites()">Favoritos</button>
    `;
  }
  