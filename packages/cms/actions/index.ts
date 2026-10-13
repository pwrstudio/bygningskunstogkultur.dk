import { MdPreview } from "react-icons/md"
import type { DocumentActionComponent } from "sanity"

/**
 * The preview deployment of the site: same code as the live site, built with
 * PUBLIC_ENVIRONMENT=preview, so issues in the "preview" editorial state show up.
 */
const PREVIEW_BASE_URL = "https://preview-bygningskunstogkultur.netlify.app"

// Route prefix on the site for each document type
const PATH_PREFIX: Record<string, string> = {
  news: "nyhed/",
  article: "preview-article/",
  page: "page/",
  issue: "",
}

/** "Preview" action in the document menu: opens the published document on the preview site */
export const PreviewAction: DocumentActionComponent = (props) => ({
  label: "Preview",
  icon: MdPreview,
  onHandle: () => {
    if (!props.published) {
      window.alert("This document has not been published yet")
      return
    }

    const slug = (props.published.slug as { current?: string } | undefined)
      ?.current
    if (!slug) {
      window.alert("This document is missing a slug")
      return
    }

    const prefix = PATH_PREFIX[props.type] ?? ""
    window.open(
      `${PREVIEW_BASE_URL}/${prefix}${slug}`,
      "_blank",
      "noopener,noreferrer",
    )
  },
})
