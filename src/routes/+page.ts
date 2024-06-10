import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Issue } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const issues: Issue[] = await loadData(queries.issues, {})

    return {
        issues,
    };
}