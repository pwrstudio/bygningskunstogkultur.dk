import type { PageLoad } from "./$types"
import { loadData } from "#lib/modules/sanity/index.js"
import { queries } from "#lib/groq/index.js"
import type { Article, Issue } from "#lib/types/index.js"

export const load: PageLoad = async ({ params }) => {
  const article = await loadData<Article>(queries.singleArticle, {
    slug: params.slug,
  })
  const issue = await loadData<Issue>(queries.issueByArticle, {
    id: article._id,
  })
  return { article, issue }
}
