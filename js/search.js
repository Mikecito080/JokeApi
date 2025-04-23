export function loadSearch() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="card">
      <h2>🔍 Buscar chistes por categoría</h2>
      <select id="categorySelector">
        <option value="Any">Todas</option>
        <option value="Programming">Programación</option>
        <option value="Misc">Misceláneos</option>
        <option value="Pun">Juegos de palabras</option>
        <option value="Spooky">Terror</option>
        <option value="Christmas">Navidad</option>
        <option value="Dark">Humor negro (+18)</option>
        <option value="Racist">Racistas (+18)</option>
        <option value="Sexist">Sexistas (+18)</option>
      </select>
      <button onclick="getJokeByCategory()">Buscar</button>
      <div id="jokeResult" style="margin-top: 20px;"></div>
    </div>
  `;
}

window.getJokeByCategory = async function () {
  const category = document.getElementById("categorySelector").value;
  const result = document.getElementById("jokeResult");
  result.innerHTML = "Buscando chiste...";

  try {
    const res = await fetch(`https://v2.jokeapi.dev/joke/${category}?lang=es`);
    const data = await res.json();

    if (data.error) {
      result.innerHTML = `<p>No se encontró un chiste. Intenta con otra categoría.</p>`;
      return;
    }

    let jokeHTML = `<h3>Categoría: ${data.category}</h3>`;

    if (data.type === "single") {
      jokeHTML += `<p>${data.joke}</p>`;
    } else {
      jokeHTML += `
        <p><strong>${data.setup}</strong></p>
        <p>${data.delivery}</p>
      `;
    }

    result.innerHTML = jokeHTML;

  } catch (err) {
    console.error(err);
    result.innerHTML = "<p>Error al obtener el chiste. Intenta de nuevo.</p>";
  }
}
