import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Issue } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const issue: Issue = await loadData(queries.singleIssue, { slug: params.slug })

    return {
        issue
    };
}