export function loadFavorites() {
  const content = document.getElementById("content");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  content.innerHTML = `<h2>Chistes Favoritos</h2>`;

  if (favoritos.length === 0) {
    content.innerHTML += `<p>No hay chistes favoritos aún.</p>`;
    return;
  }

  favoritos.forEach((joke, index) => {
    let jokeHTML = `<div class="joke-fav">`;

    if (joke.type === "single") {
      jokeHTML += `<p>${joke.joke}</p>`;
    } else {
      jokeHTML += `<p><strong>${joke.setup}</strong></p><p>${joke.delivery}</p>`;
    }

    // Botón para eliminar
    jokeHTML += `<button onclick="removeFavorite(${index})">Eliminar</button>`;
    jokeHTML += `</div>`;

    content.innerHTML += jokeHTML;
  });
}

// Eliminar favorito
export function removeFavorite(index) {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.splice(index, 1);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  loadFavorites(); // Recargar la vista
}

// Hacer accesible la función desde el HTML
window.removeFavorite = removeFavorite;
