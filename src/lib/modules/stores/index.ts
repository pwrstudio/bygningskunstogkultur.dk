import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Issue } from '$lib/types/sanity.types'

// UI state
export const menuOpen = writable(false)
export const tableOfContentsOpen = writable(false)
export const newsExtended = writable(false)

// Data
export const currentIssue: Writable<Issue | undefined> = writable(undefined)
export const currentArticleSlug: Writable<string | undefined> = writable(undefined)

export const extendedPost = writable({})


