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
      let jokeHTML = `<h2>Chiste Aleatorio:</h2>`;

      if (data.type === "single") {
        jokeHTML += `<p>${data.joke}</p>`;
      } else {
        jokeHTML += `
          <p><strong>${data.setup}</strong></p>
          <p>${data.delivery}</p>
        `;
      }

      content.innerHTML = jokeHTML;

      // Botón "Guardar en Favoritos"
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Guardar en Favoritos";
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
      content.appendChild(saveBtn);

      // Botón "Otro chiste"
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Otro chiste 😂";
      nextBtn.onclick = loadRandomJoke;
      content.appendChild(nextBtn);
    })
    .catch(err => {
      console.error(err);
      content.innerHTML = "<p>Error al obtener el chiste. Intenta de nuevo.</p>";
    });
}
