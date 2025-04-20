
import { loadFilter, filterJokes } from './filtro.js';
window.loadRandomJoke = loadRandomJoke;
document.addEventListener("DOMContentLoaded", () => {
    loadRandomJoke();  // Cargar chiste al inicio
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
      })
      .catch(err => {
        console.error(err);
        content.innerHTML = "<p>Error al obtener el chiste. Intenta de nuevo.</p>";
      });
  }
  
  
  import { loadSearch } from "./search.js";
  
  // Asignamos las funciones al global window para que sean accesibles desde el HTML
  window.loadSearch = loadSearch;
  
  // Cargar el chiste aleatorio por defecto
  loadRandomJoke();
  