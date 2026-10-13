import type { PageLoad } from "./$types"
import { loadData } from "#lib/modules/sanity/index.js"
import { queries } from "#lib/groq/index.js"
import type { Article } from "#lib/types/index.js"

// Preview of an article that is not (yet) in an issue, opened from the studio's Preview action
export const load: PageLoad = async ({ params }) => {
  const article = await loadData<Article>(queries.singleArticle, {
    slug: params.article,
  })
  return { article }
}
