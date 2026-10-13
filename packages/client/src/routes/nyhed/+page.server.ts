import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

// A news item is read in the menu or on its own page; the bare path goes to the front page
export const load: PageServerLoad = () => {
  redirect(301, "/")
}
