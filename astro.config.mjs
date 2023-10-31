import { defineConfig } from "astro/config";

const createAstroConfig = () => {
  if (process.env.NODE_ENV === "prd") {
    return {
      site: process.env.SITE_URL,
      base: process.env.BASE_URL,
    };
  }
  return {};
};
let astroConfig = createAstroConfig();

// https://astro.build/config
export default defineConfig(astroConfig);
