import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Article, Issue } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const article: Article = await loadData(queries.singleArticle, { slug: params.slug })
    const issue: Issue = await loadData(queries.issueByArticle, { id: article._id })
    return {
        article,
        issue
    };
}