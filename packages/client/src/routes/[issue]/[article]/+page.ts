import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { loadData } from "#lib/modules/sanity/index.js"
import { queries } from "#lib/groq/index.js"
import type { Issue } from "#lib/types/index.js"

export const load: PageLoad = async ({ params }) => {
  const issue = await loadData<Issue>(queries.singleIssue, {
    slug: params.issue,
  })

  const article = issue.tableOfContents?.find(
    (article) => article.slug.current === params.article,
  )
  if (!article) error(404, "Not found")

  return { issue, article }
}
