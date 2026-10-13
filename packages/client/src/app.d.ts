// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface Window {
    // Google Analytics (gtag.js) command queue
    dataLayer: unknown[]
    // Setting this to true stops gtag.js from sending hits or writing cookies
    [key: `ga-disable-${string}`]: boolean
  }
}

export {}
