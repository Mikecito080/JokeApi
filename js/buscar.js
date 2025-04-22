export function setupBuscador() {
    const input = document.getElementById("searchInput");
    const header = document.getElementById("header");
    const content = document.getElementById("content");
  
    input.addEventListener("input", async () => {
      const termino = input.value.toLowerCase().trim();
      limpiarResultadosAnteriores();
  
      if (!termino) return;
  
      const elementos = content.querySelectorAll("p, h2, h3, li");
      let huboCoincidenciaLocal = false;
  
      elementos.forEach(el => {
        if (el.textContent.toLowerCase().includes(termino)) {
          el.style.backgroundColor = "#ffff99";
          huboCoincidenciaLocal = true;
        } else {
          el.style.backgroundColor = "transparent";
        }
      });
  
      if (!huboCoincidenciaLocal) {
        const resultado = await buscarEnAPI(termino);
        mostrarResultadoEnHeader(resultado, header, termino);
      }
    });
  }
  
  // Limpia mensajes de búsqueda anteriores
  function limpiarResultadosAnteriores() {
    const anteriores = document.querySelectorAll(".resultado-busqueda");
    anteriores.forEach(el => el.remove());
  }
  
  
  // Busca en la JokeAPI por palabra clave
  async function buscarEnAPI(termino) {
    try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/Any?contains=${encodeURIComponent(termino)}&amount=1&lang=es`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al buscar en la API:", error);
      return null;
    }
  }
  
  // Muestra el resultado dentro del <header>
  function mostrarResultadoEnHeader(data, header, termino) {
    limpiarResultadosAnteriores(); // Siempre limpiamos antes de mostrar nuevo
  
    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("resultado-busqueda");
    resultadoDiv.style.marginTop = "10px";
    resultadoDiv.style.padding = "10px";
    resultadoDiv.style.background = "#fff";
    resultadoDiv.style.border = "1px solid #ccc";
    resultadoDiv.style.borderRadius = "5px";
    resultadoDiv.style.maxHeight = "150px";
    resultadoDiv.style.overflowY = "auto";
  
    if (data && !data.error) {
      if (data.type === "single") {
        resultadoDiv.innerHTML = `
          <strong>Resultado de la API:</strong>
          <p>${data.joke}</p>
        `;
      } else {
        resultadoDiv.innerHTML = `
          <strong>Resultado de la API:</strong>
          <p><strong>${data.setup}</strong></p>
          <p>${data.delivery}</p>
        `;
      }
  
      // Crear botón para guardar
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Guardar en Favoritos";
      saveBtn.onclick = () => {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const yaExiste = favoritos.some(j => j.id === data.id);
  
        if (yaExiste) {
          alert("¡Este chiste ya está en favoritos!");
          return;
        }
  
        favoritos.push(data);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("Chiste guardado en favoritos 🎉");
      };
  
      resultadoDiv.appendChild(saveBtn);
    } else {
      resultadoDiv.innerHTML = `<p style="color:red;">No se encontraron coincidencias para "${termino}".</p>`;
    }
  
    header.appendChild(resultadoDiv);
  }
  
  
  