// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Article, Issue } from "#lib/types/index.js"

declare global {
  namespace App {
    // Data the root layout reads from the current page: the article route's
    // load returns these, and the layout renders the table of contents from them
    interface PageData {
      issue?: Issue
      article?: Article
    }
  }

  interface Window {
    // Google Analytics (gtag.js) command queue
    dataLayer: unknown[]
    // Setting this to true stops gtag.js from sending hits or writing cookies
    [key: `ga-disable-${string}`]: boolean
  }
}

export {}
