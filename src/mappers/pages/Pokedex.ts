import { Stack } from "../../utils";

const getPokedexPageData = async () => {
  const pokedexPageData: any = {};

  try {
    const pokemonListKey = "pokemon_list";
    const PokedexQuery = Stack.ContentType("pages").Query();
    const pokedexData = await PokedexQuery.where("title", "Pokédex")
      .toJSON()
      .findOne();
    pokedexPageData.pageContent = pokedexData.page_content;
    pokedexPageData.seoData = pokedexData.seo_data;
    pokedexPageData.url = pokedexData.url;

    const pokemonListQuery = Stack.ContentType("pokemon").Query();
    const pokemonListData = await pokemonListQuery
      .ascending("pokemon_number")
      .toJSON()
      .find();

    const pokemonListBlock = pokedexPageData.pageContent.find((item) => {
      return Object.keys(item)[0] === pokemonListKey;
    });

    const newsListIndex = pokedexPageData.pageContent.findIndex(
      (item: Object) => item === pokemonListBlock,
    );

    pokedexPageData.pageContent[newsListIndex][pokemonListKey].pokemonList =
      pokemonListData[0];
  } catch (err) {
    console.log(err);
  }
  return pokedexPageData;
};

export default getPokedexPageData;
