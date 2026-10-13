import { writable, derived } from "svelte/store"
import type { Writable, Readable } from "svelte/store"
import { MenuSection } from "$lib/enums"

// UI state
export const menuOpen: Writable<boolean> = writable(false)
export const tableOfContentsOpen: Writable<boolean> = writable(false)
export const newsExtended: Writable<boolean> = writable(false)
export const activeMenuSection: Writable<MenuSection> = writable(
  MenuSection.None,
)

// Window dimensions
export const windowWidth: Writable<number> = writable(0)
export const windowHeight: Writable<number> = writable(0)
// An unknown width (0, before the first measurement and during SSR) counts as desktop
export const screenSizePhone: Readable<boolean> = derived(
  windowWidth,
  ($windowWidth) => $windowWidth > 0 && $windowWidth <= 768,
)
