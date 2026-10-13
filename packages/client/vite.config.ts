import adapter from "@sveltejs/adapter-netlify"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      // Writes the site to build/ and the render function to .netlify/v1/ (see /netlify.toml)
      adapter: adapter(),
    }),
  ],
})
