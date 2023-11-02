import { defineConfig } from "astro/config";
import { Environment } from "./src/utils/index";
import netlify from "@astrojs/netlify/functions";
const createAstroConfig = () => {
  if (Environment.isProd()) {
    return {
      site: process.env.HOST_URL,
      base: process.env.SITE_PATH,
    };
  }
};

// https://astro.build/config
export default defineConfig({
  ...createAstroConfig(),
  output: "server",
  adapter: netlify(),
});
