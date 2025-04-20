function loadFilter() {
    const content = document.getElementById("content");
    content.innerHTML = `
      <h2>Filtrar Chistes</h2>
      <select id="filterSelect">
        <option value="programming">Programación</option>
        <option value="misc">Diversos</option>
      </select>
      <button onclick="filterJokes()">Filtrar</button>
      <div id="filterResults"></div>
    `;
  }
  
  function filterJokes() {
    const selectedFilter = document.getElementById("filterSelect").value;
    const resultsDiv = document.getElementById("filterResults");
    resultsDiv.innerHTML = `Filtrando por categoría: ${selectedFilter}`;
    // Aquí agregarás la lógica para filtrar los chistes de la API
  }
  