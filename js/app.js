import { loadSearch } from './search.js';
import { loadFavorites } from './favoritos.js';
import { loadUsuario } from './filtro.js';
import { showMoodSelector } from './mood.js';  // Importa la función
import { setupBuscador } from './buscar.js';


// Hacer funciones accesibles globalmente
window.showMoodSelector = showMoodSelector;
window.loadUsuario = loadUsuario;
window.loadRandomJoke = loadRandomJoke;
window.loadFavorites = loadFavorites;
window.loadSearch = loadSearch;

document.addEventListener("DOMContentLoaded", () => {
  loadRandomJoke(); // Cargar chiste al inicio
  setupBuscador();
});

// Función para cargar un chiste aleatorio
export function loadRandomJoke() {
  const content = document.getElementById("content");
  content.innerHTML = "Cargando un chiste aleatorio...";

  fetch("https://v2.jokeapi.dev/joke/Any?lang=es")
    .then(response => response.json())
    .then(data => {
      let jokeHTML = `
        <div class="card">
          <h2>Chiste Aleatorio:</h2>
      `;

      if (data.type === "single") {
        jokeHTML += `<p>${data.joke}</p>`;
      } else {
        jokeHTML += `
          <p><strong>${data.setup}</strong></p>
          <p>${data.delivery}</p>
        `;
      }

      jokeHTML += `
        <button>Guardar en Favoritos</button>
        <button>Otro chiste 😂</button>
        </div>
      `;

      content.innerHTML = jokeHTML;

      // Lógica para los botones dentro de la tarjeta
      const saveBtn = content.querySelector("button:nth-of-type(1)");
      saveBtn.onclick = () => {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // Evitar duplicados por ID
        const yaExiste = favoritos.some(j => j.id === data.id);
        if (yaExiste) {
          alert("¡Este chiste ya está guardado!");
          return;
        }

        favoritos.push(data);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("Chiste guardado en favoritos 🎉");
      };

      const nextBtn = content.querySelector("button:nth-of-type(2)");
      nextBtn.onclick = loadRandomJoke;
    })
    .catch(err => {
      console.error(err);
      content.innerHTML = "<p>Error al obtener el chiste. Intenta de nuevo.</p>";
    });
}
