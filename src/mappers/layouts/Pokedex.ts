import { Stack } from "../../utils";
import getGlobalData from "../global/Global";

const getPokedexLayoutData = async () => {
  const globalData = await getGlobalData();
  const pokedexLayoutData: any = {};

  // Get backButton Data
  try {
    const Query = Stack.ContentType("pages").Query();
    const result = await Query.toJSON().where("title", "Pokédex").findOne();
    pokedexLayoutData.backButtonLabel = result.title;
    pokedexLayoutData.url = result.url;
  } catch (error) {
    console.log(error);
  }

  // Get Footer Text
  pokedexLayoutData.footerText = globalData.footerText;

  return pokedexLayoutData;
};

export default getPokedexLayoutData;
