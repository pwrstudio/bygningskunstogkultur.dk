import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Article } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const article: Article = await loadData(queries.singleIssue, { slug: params.slug })

    return {
        article
    };
}