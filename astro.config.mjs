import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import alpinejs from "@astrojs/alpinejs";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://cajasfuertesfabrinsa.com/",
  output: "server",

  integrations: [
    tailwind(),
    react(),
    alpinejs(),
    sitemap(),
    partytown({
      forward: ["dataLayer.push"],
    }),
  ],

  adapter: vercel(),
});