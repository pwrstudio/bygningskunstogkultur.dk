import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Issue } from '$lib/types/sanity.types'

// UI state
export const menuOpen = writable(false)
export const tableOfContentsOpen = writable(false)
export const newsExtended = writable(false)

// Window dimensions
export const windowWidth: Writable<number> = writable(0)
export const windowHeight: Writable<number> = writable(0)

// Used in the table of contents to show active article
export const currentArticleSlug: Writable<string | undefined> = writable(undefined)
// Used to pass data into the table of contents
export const currentIssue: Writable<Issue | undefined> = writable(undefined)