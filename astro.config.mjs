import { defineConfig } from "astro/config";
import { Environment } from "./src/utils/index";

const createAstroConfig = () => {
  if (Environment.isProd()) {
    return {
      site: process.env.HOST_URL,
      base: process.env.SITE_PATH,
    };
  }
  return {};
};

// https://astro.build/config
export default defineConfig(createAstroConfig());
