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
export { toDateString } from "./datetime";
export {
  hexToHSL,
  getHSLValues,
  defineHoverColor,
  defineTextColor,
  defineTypeBgColor,
  increaseLightness,
} from "./style-helpers";
export {
  getFieldsWithArrayValue,
  getReferenceFields,
  hasReferenceFields,
  getContentBlocksWithReferences,
} from "./modify-data-helpers";
