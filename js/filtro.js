export function loadUsuario() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="info-card">
      <h2>Acerca del Proyecto</h2>
      <p><strong>Nombre del Estudiante:</strong> Maicol Stid Lopez Garcia</p>
      <p><strong>API utilizada:</strong> JokeAPI (<a href="https://jokeapi.dev/" target="_blank">jokeapi.dev</a>)</p>
      <p><strong>GitHub:</strong> <a href="https://github.com/Mikecito080" target="_blank">@Mikecito080</a></p>
      <p><strong>Versión:</strong> V.1.0.0</p>
      <img src="img/stand.jpg" alt="Humor" style="max-width: 200px; margin-top: 10px;">
      <p><strong>Descripción:</strong> Esta app permite visualizar chistes de todo tipo, categorizarlos, guardarlos como favoritos, y explorar contenido aleatorio de la JokeAPI.</p>
    </div>
  `;

  // Agregar sección para los chistes
  const jokesContainer = document.createElement('section');
  jokesContainer.classList.add('jokes-container');
  content.appendChild(jokesContainer);

  // Llamar a la API de JokeAPI y mostrar los chistes
  fetch('https://v2.jokeapi.dev/joke/Any?amount=5') // Traemos 5 chistes de cualquier categoría
    .then(res => res.json())
    .then(data => {
      const jokes = data.jokes;
      jokes.forEach(joke => {
        const jokeCard = document.createElement('div');
        jokeCard.classList.add('joke-card');
        jokeCard.innerHTML = `
          <h3>Chiste:</h3>
          <p><strong>Setup:</strong> ${joke.setup ? joke.setup : 'No tiene setup'}</p>
          <p><strong>Delivery:</strong> ${joke.delivery ? joke.delivery : 'No tiene delivery'}</p>
        `;
        jokesContainer.appendChild(jokeCard);
      });
    })
    .catch(error => {
      jokesContainer.innerHTML = '<p>Error al cargar los chistes. Intenta nuevamente.</p>';
      console.error('Error al obtener chistes:', error);
    });
}
