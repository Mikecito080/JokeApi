function loadJokes() {
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Chistes de Programación</h2>";
  
    const jokes = [
      { id: 1, joke: "¿Por qué los programadores odian la naturaleza? Porque tiene demasiados bugs." },
      { id: 2, joke: "¿Por qué las vacas no usan el código? Porque no saben programar." }
    ];
  
    jokes.forEach(joke => {
      content.innerHTML += `<p>${joke.joke}</p>`;
    });
  }
  