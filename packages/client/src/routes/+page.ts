import type { PageLoad } from "./$types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Issue } from "$lib/types"

export const load: PageLoad = async () => {
  const issues = await loadData<Issue[]>(queries.issues)
  return { issues }
}
