export function loadUsuario() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Acerca del Proyecto</h2>
    <p><strong>Nombre del Estudiante:</strong> Maicol Stid Lopez Garcia</p>
    <p><strong>API utilizada:</strong> JokeAPI (<a href="https://jokeapi.dev/" target="_blank">jokeapi.dev</a>)</p>
    <p><strong>GitHub:</strong> <a href="https://github.com/Mikecito080" target="_blank">@Mikecito080</a></p>
    <p><strong>Versión:</strong> V.1.0.0</p>
    <img src="https://i.imgur.com/ZPOeY3F.png" alt="Humor" style="max-width: 300px; margin-top: 10px;">
    <p><strong>Descripción:</strong> Esta app permite visualizar chistes de todo tipo, categorizarlos, guardarlos como favoritos, y explorar contenido aleatorio de la JokeAPI.</p>
  `;
}

  