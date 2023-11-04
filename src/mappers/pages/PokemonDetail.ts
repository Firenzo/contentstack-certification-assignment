import {
  Stack,
  debugLog,
  getContentBlocksWithReferences,
  createReplaceObjects,
} from "../../utils";

const getPokemonInfo = async (pokemonURL) => {
  const pokemonData: any = {};

  try {
    const Query = Stack.ContentType("pokemon").Query();
    const fetchedPokemon = await Query.toJSON()
      .where("url", pokemonURL)
      .includeReference(["types", "evolution_chain"])
      .findOne();
    pokemonData.name = fetchedPokemon.title;
    pokemonData.number = fetchedPokemon.pokemon_number;
    pokemonData.image = fetchedPokemon.image;
    pokemonData.types = fetchedPokemon.types;
    pokemonData.backgroundColor = fetchedPokemon.background_color;
    pokemonData.baseInfo = fetchedPokemon.base_info;
    pokemonData.evolutionChain = fetchedPokemon.evolution_chain[0];

    if (pokemonData.evolutionChain) {
      const evolutionUids = pokemonData.evolutionChain?.evolutions.map(
        (pokemon) => pokemon.uid,
      );

      const currentPokemonIndex = evolutionUids.indexOf(fetchedPokemon.uid);

      const newEvolutions = await Promise.all(
        evolutionUids.map(async (evolutionUid: string, index: number) => {
          if (index === currentPokemonIndex) {
            return fetchedPokemon;
          }
          const evolutionData = await Stack.ContentType("pokemon")
            .Entry(evolutionUid)
            .toJSON()
            .fetch();
          return evolutionData;
        }),
      );

      pokemonData.evolutionChain = newEvolutions;
    } else {
      pokemonData.evolutionChain = [fetchedPokemon];
    }
  } catch (error) {
    console.log(error);
  }

  return pokemonData;
};

export default getPokemonInfo;
