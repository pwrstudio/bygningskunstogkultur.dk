import type { PageLoad } from "./$types"
import { loadData } from "#lib/modules/sanity/index.js"
import { queries } from "#lib/groq/index.js"
import type { News } from "#lib/types/index.js"

export const load: PageLoad = async ({ params }) => {
  const news = await loadData<News>(queries.singleNews, { slug: params.slug })
  return { news }
}
