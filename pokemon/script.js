const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('evolution');


document.title = `Detalhes do Pokémon ${pokemonName.toUpperCase()}`;

(async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  ).then(response => response.json());

  const pokemonInfoDiv = document.querySelector('#informacoes');

  const pokemonHeader = document.createElement('h2');
  pokemonHeader.textContent = `Informações sobre o ${pokemonName}`;

  pokemonInfoDiv.appendChild(pokemonHeader);

  const pokemonImage = document.createElement('img');
  pokemonImage.src = response.sprites.front_default;

  pokemonInfoDiv.appendChild(pokemonImage);
})();
