import { writable, derived } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import type { Issue } from '$lib/types/sanity.types'
import type { MenuSection } from '$lib/enums'

// UI state
export const menuOpen: Writable<boolean> = writable(false)
export const tableOfContentsOpen: Writable<boolean> = writable(false)
export const newsExtended: Writable<boolean> = writable(false)
export const activeMenuSection: Writable<MenuSection | undefined> = writable(undefined)

// Window dimensions
export const windowWidth: Writable<number> = writable(0)
export const windowHeight: Writable<number> = writable(0)
export const screenSizePhone: Readable<boolean> = derived(windowWidth, $windowWidth => $windowWidth <= 768)

// Used in the table of contents to show active article
export const currentArticleSlug: Writable<string | undefined> = writable(undefined)
// Used to pass data into the table of contents
export const currentIssue: Writable<Issue | undefined> = writable(undefined)