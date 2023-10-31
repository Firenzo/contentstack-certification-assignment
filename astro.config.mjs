import { defineConfig } from "astro/config";

const createAstroConfig = () => {
  console.log(`${process.env.NODE_ENV} mpp`);
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
