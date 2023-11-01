import Contentstack from "contentstack";

export const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: Contentstack.Region.EU,
});

export { debugLog } from "./dev-helpers";
export { Environment, getSiteBaseURL, setRoute } from "./environment";
export { toPokemonNumber, createReplaceObjects } from "./modify-data";
export {
  getFieldsWithArrayValue,
  getReferenceFields,
  hasReferenceFields,
} from "./modify-data-helpers";
