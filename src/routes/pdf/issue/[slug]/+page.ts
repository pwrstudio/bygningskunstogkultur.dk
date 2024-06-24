import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Colophon, Issue } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const issue: Issue = await loadData(queries.singleIssue, { slug: params.slug })
    const colophon: Colophon = await loadData(queries.colophon, {})

    return {
        issue,
        colophon
    };
}