import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto picks adapter-netlify on Netlify, see https://svelte.dev/docs/kit/adapter-auto
    adapter: adapter(),
    alias: {
      // Sanity TypeGen output (generated in packages/cms with `pnpm typegen:sanity`)
      "@sanity-types": "../cms/sanity.types.ts",
    },
  },
}

export default config
