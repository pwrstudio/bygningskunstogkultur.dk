import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Article, Issue } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const issue: Issue = await loadData(queries.singleIssue, { slug: params.issue })

    let article: Article | undefined = undefined

    // If there is no table of contents, return the issue without an article
    if (!issue.tableOfContents) {
        return {
            issue,
            article
        };
    }

    article = issue.tableOfContents.find(article => article.slug.current === params.article)

    return {
        issue,
        article
    };
}