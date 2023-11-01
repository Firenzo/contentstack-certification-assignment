import { Stack } from "../../utils";
import globalData from "../global/Global";

const pokedexLayoutData: any = {};

// Get backButton Data
try {
  const Query = Stack.ContentType("pages").Query();
  const result = await Query.toJSON().where("title", "Pokédex").find();
  pokedexLayoutData.backButtonLabel = result[0][0].title;
  pokedexLayoutData.url = result[0][0].url;
} catch (error) {
  console.log(error);
}

// Get Footer Text
pokedexLayoutData.footerText = globalData.footerText;

export default pokedexLayoutData;
