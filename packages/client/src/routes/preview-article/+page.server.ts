import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

// Previews are only reachable by their slug; the bare path goes to the front page
export const load: PageServerLoad = () => {
  redirect(301, "/")
}
