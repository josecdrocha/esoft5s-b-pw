(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get('evolution');

  if (pokemonName) {
    document.title += ` ${pokemonName.toUpperCase()}`;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();

      const sprites = Object.values(data.sprites).filter(sprite => typeof sprite === 'string');

      let currentSpriteIndex = 0;

      const pokemonImgElement = document.getElementById('pokemon-img');
      const infoElement = document.getElementById('informacoes');

      if (pokemonImgElement && infoElement) {
        pokemonImgElement.addEventListener('click', () => {
          currentSpriteIndex = (currentSpriteIndex + 1) % sprites.length;
          pokemonImgElement.src = sprites[currentSpriteIndex];
        });

        infoElement.textContent = `Informações sobre o ${pokemonName}`;
        pokemonImgElement.src = sprites[currentSpriteIndex];
      } else {
        console.error('Elementos de imagem ou informação não encontrados.');
      }
    } catch (error) {
      console.error('Erro ao buscar informações do Pokémon:', error);
    }
  } else {
    console.error('Nome do Pokémon não especificado nos parâmetros da URL.');
  }
})();
