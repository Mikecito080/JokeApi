export function showMoodSelector() {
    const content = document.getElementById("content");
    content.innerHTML = `
      <h2>Selecciona tu estado de ánimo</h2>
      <select id="mood">
        <option value="Programming">Normal</option>
        <option value="Misc">Feliz</option>
        <option value="Pun">Triste</option>
        <option value="Spooky">Sorprendeme</option>
      </select>
      <button id="moodButton">Dame un chiste según mi estado de ánimo</button>
      <div id="moodResult"></div>
    `;
  
    // Agregamos el evento luego de insertar el HTML
    document.getElementById("moodButton").addEventListener("click", jokeByMood);
  }
  
  export function jokeByMood() {
    const mood = document.getElementById("mood").value;
    const content = document.getElementById("moodResult");
  
    if (!content) {
      console.error("El contenedor 'moodResult' no existe.");
      return;
    }
  
    content.innerHTML = "Cargando chiste...";
  
    fetch(`https://v2.jokeapi.dev/joke/${mood}?lang=es`)
      .then(response => response.json())
      .then(data => {
        let jokeHTML = `<h3>Chiste (${mood})</h3>`;
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
  