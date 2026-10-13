import type { Article, Issue, BlockContent, Footnote, Page } from "$lib/types"
import { PageType } from "$lib/enums"
import { format, getYear } from "date-fns"
import { toPlainText } from "$lib/modules/sanity"

export const formattedDate = (start: string, end?: string) => {
  if (!start) return ""

  const startDate = Date.parse(start)

  if (!end) return format(startDate, "dd.MM.yyyy")

  const endDate = Date.parse(end)

  if (format(startDate, "dd.MM.yyyy") == format(endDate, "dd.MM.yyyy")) {
    return format(startDate, "dd.MM.yyyy")
  }

  const startFormat =
    getYear(startDate) == getYear(endDate) ? "dd.MM" : "dd.MM.yyyy"
  const endFormat = "dd.MM.yyyy"

  return format(startDate, startFormat) + " – " + format(endDate, endFormat)
}

export const currentDateAndTime = (): string =>
  format(new Date(), "HH:mm dd.MM.yyyy")

/** The footnote annotations of a block array, in document order */
export function extractFootnotes(content: BlockContent): Footnote[] {
  return content
    .flatMap((block) => (block._type === "block" ? (block.markDefs ?? []) : []))
    .filter((mark): mark is Footnote => mark._type === "footnote")
}

const WORDS_PER_MINUTE = 200 // average reading speed

/** Reading time of the main text in whole minutes */
export function calculateArticleReadingTime(post: Article | Page): number {
  const content = post.content?.content
  if (!content) return 0
  const words = toPlainText(content).split(/\s+/).filter(Boolean).length
  return Math.ceil(words / WORDS_PER_MINUTE)
}

export function mapValue(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/** Splits a block array into its first block and the rest (for "read more") */
export function splitTextBlocks(
  text: BlockContent,
): [BlockContent, BlockContent] {
  return [text.slice(0, 1), text.slice(1)]
}

/** The article after `article` in the issue's table of contents, if any */
export function getNextArticle(issue: Issue, article: Article): Article | null {
  const toc = issue.tableOfContents ?? []
  const index = toc.findIndex((item) => item._id === article._id)
  return index >= 0 && index < toc.length - 1 ? toc[index + 1] : null
}

export function scrollToHash() {
  const target = document.getElementById(window.location.hash.substring(1))
  target?.scrollIntoView({ behavior: "smooth", block: "start" })
}

/** Shortens text to at most `length` characters, cut at a word boundary */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  const cut = text.slice(0, length)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…"
}

/**
 * The site locks body scrolling (app.css) and scrolls inside its columns.
 * The print pages are plain documents, so they scroll the body instead.
 */
export function unlockBodyScroll() {
  document.body.style.overflow = "auto"
  document.body.style.height = "auto"
}

export function getPageType(route: string): PageType {
  switch (route) {
    case "/":
      return PageType.Landing
    case "/[issue]/[article]":
      return PageType.Article
    case "/page/[slug]":
      return PageType.Page
    case "/nyhed/[slug]":
      return PageType.News
    case "/pdf/article/[slug]":
    case "/pdf/issue/[slug]":
    case "/pdf/news/[slug]":
    case "/pdf/page/[slug]":
      return PageType.Pdf
    default:
      return PageType.Error
  }
}
