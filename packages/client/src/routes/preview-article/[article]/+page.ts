import type { PageLoad } from "./$types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Article } from "$lib/types"

// Preview of an article that is not (yet) in an issue, opened from the studio's Preview action
export const load: PageLoad = async ({ params }) => {
  const article = await loadData<Article>(queries.singleArticle, {
    slug: params.article,
  })
  return { article }
}
