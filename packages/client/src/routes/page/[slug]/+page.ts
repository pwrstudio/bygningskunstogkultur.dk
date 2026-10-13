import type { PageLoad } from "./$types"
import { loadData } from "#lib/modules/sanity/index.js"
import { queries } from "#lib/groq/index.js"
import type { Page } from "#lib/types/index.js"

export const load: PageLoad = async ({ params }) => {
  const page = await loadData<Page>(queries.singlePage, { slug: params.slug })
  return { page }
}
