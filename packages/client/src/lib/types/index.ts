/**
 * Types for the content the site renders.
 *
 * The base types are generated from the studio schema (packages/cms/sanity.types.ts,
 * regenerate with `pnpm typegen:sanity` at the repo root). The GROQ queries in
 * $lib/groq dereference some fields, so a few shapes below describe query results
 * rather than raw documents.
 */

import type {
  Article as ArticleDocument,
  Issue as IssueDocument,
  ContentEditor,
  SimpleEditor,
} from "@sanity-types"

export type {
  About,
  AudioBlock,
  Colophon,
  ContentEditor,
  EmbedBlock,
  News,
  Page,
  SimpleEditor,
  Slug,
  VideoBlock,
} from "@sanity-types"

export type Article = ArticleDocument

/** An issue as the site loads it: the table of contents is dereferenced to full articles */
export type Issue = Omit<IssueDocument, "tableOfContents"> & {
  tableOfContents?: Article[]
}

/** The blocks of a content editor field (text, images, video, audio, embeds) */
export type BlockContent = NonNullable<ContentEditor["content"]>

/** The blocks of a simple editor field (text only) */
export type SimpleBlockContent = NonNullable<SimpleEditor["content"]>

export type TextBlock = Extract<BlockContent[number], { _type: "block" }>
export type ImageBlock = Extract<BlockContent[number], { _type: "image" }>

type MarkDef = NonNullable<TextBlock["markDefs"]>[number]

export type Footnote = Extract<MarkDef, { _type: "footnote" }>

/** Page link annotation. `slug` is resolved by the query (resolvePageLinks in $lib/groq). */
export type PageLink = Extract<MarkDef, { _type: "pageLink" }> & {
  slug?: string | null
}

export type Slide = NonNullable<ArticleDocument["slideshow"]>[number]
