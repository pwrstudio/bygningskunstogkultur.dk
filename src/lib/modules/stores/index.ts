import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Issue } from '$lib/types/sanity.types'

// UI
export const menuActive = writable(false)
export const newsExtended = writable(false)
export const tableOfContentsActive = writable(false)

// Data
export const currentIssue: Writable<Issue | undefined> = writable(undefined)
export const currentArticleSlug: Writable<string | undefined> = writable(undefined)

export const extendedPost = writable({})


