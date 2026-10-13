import { error, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Issue } from "$lib/types"

// An issue has no page of its own: it opens on its first article
export const load: PageServerLoad = async ({ params }) => {
  const issue = await loadData<Issue>(queries.singleIssue, {
    slug: params.issue,
  })

  const firstArticle = issue.tableOfContents?.[0]
  if (!firstArticle) error(404, "Not found")

  // Temporary redirect: the first article changes when the table of contents is edited
  redirect(302, `/${params.issue}/${firstArticle.slug.current}`)
}
