window.mostrarChistesAleatorios = () => {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Limpiamos el contenido anterior
  
    const jokesContainer = document.createElement('section');
    jokesContainer.classList.add('jokes-container');
    content.appendChild(jokesContainer);
  
    fetch('https://v2.jokeapi.dev/joke/Any?amount=5')
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
  };
  