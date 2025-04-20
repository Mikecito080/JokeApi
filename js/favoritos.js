function saveFavorite(joke) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(joke);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
  
  function removeFavorite(jokeId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(joke => joke.id !== jokeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  function loadFavorites() {
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Favoritos</h2>";
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
      content.innerHTML += "<p>No tienes chistes favoritos.</p>";
    } else {
      favorites.forEach(fav => {
        content.innerHTML += `<p>${fav.joke}</p><button onclick="removeFavorite(${fav.id})">Eliminar</button>`;
      });
    }
  }
  