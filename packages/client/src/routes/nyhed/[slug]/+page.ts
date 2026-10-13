import type { PageLoad } from "./$types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { News } from "$lib/types"

export const load: PageLoad = async ({ params }) => {
  const news = await loadData<News>(queries.singleNews, { slug: params.slug })
  return { news }
}
