import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Issue } from "$lib/types/sanity.types"
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const issue: Issue = await loadData(queries.singleIssue, { slug: params.issue })

    // If there is no table of contents, return the issue without an article
    if (!issue.tableOfContents || issue.tableOfContents.length === 0) {
        // 404 here
        return
    }

    // Redirect to the first article in the issue
    const firstArticleSlug = issue.tableOfContents[0].slug.current
    redirect(301, `/${params.issue}/${firstArticleSlug}`);
}