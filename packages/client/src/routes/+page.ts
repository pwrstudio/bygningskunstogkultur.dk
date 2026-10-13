import type { PageLoad } from "./$types"
import { loadData } from "#lib/modules/sanity/index.js"
import { queries } from "#lib/groq/index.js"
import type { Issue } from "#lib/types/index.js"

export const load: PageLoad = async () => {
  const issues = await loadData<Issue[]>(queries.issues)
  return { issues }
}
