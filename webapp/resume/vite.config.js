import { defineConfig } from "vite";

import Unocss from "unocss/vite";

import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  server: {
    port: 3001
  },
  preview: {
    port: 8000
  },
  plugins: [
    Unocss(),
    solidPlugin(),
  ],
  build: {
    target: "esnext",
  },
  base: "/resume/",
});
