import type { PageLoad } from "./$types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Colophon, Issue } from "$lib/types"

export const load: PageLoad = async ({ params }) => {
  const [issue, colophon] = await Promise.all([
    loadData<Issue>(queries.singleIssue, { slug: params.slug }),
    loadData<Colophon>(queries.colophon),
  ])
  return { issue, colophon }
}
