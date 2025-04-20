// El archivo js/menu.js está integrado en app.js por simplicidad
// Si deseas tenerlo separado, asegúrate de que sea algo como lo siguiente

function loadMenu() {
    const menu = document.getElementById("menu");
    menu.innerHTML = `
      <button onclick="loadJokes()">Chistes</button>
      <button onclick="CargarBuscar()">Buscar</button>
      <button onclick="CargarFiltro()">Filtrar</button>
      <button onclick="loadFavorites()">Favoritos</button>
    `;
  }
  