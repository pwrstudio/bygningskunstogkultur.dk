import type { LayoutLoad } from "./$types"
import { loadData } from "#lib/modules/sanity/index.js"
import { queries } from "#lib/groq/index.js"
import type { News, About, Colophon } from "#lib/types/index.js"

export const load: LayoutLoad = async () => {
  const [news, colophon, about] = await Promise.all([
    loadData<News[]>(queries.news),
    loadData<Colophon>(queries.colophon),
    loadData<About>(queries.about),
  ])

  return { news, colophon, about }
}
