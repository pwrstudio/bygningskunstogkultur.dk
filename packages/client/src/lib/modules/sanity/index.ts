/**
 * Sanity: client, image/file url helpers and the Portable Text → HTML renderer.
 */

import { createClient } from "@sanity/client"
import { error } from "@sveltejs/kit"
import { createImageUrlBuilder } from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"
import {
  toHTML,
  type PortableTextHtmlComponents,
  type PortableTextMarkComponentOptions,
} from "@portabletext/to-html"
import { nestLists } from "@portabletext/toolkit"
import type { PortableTextBlock } from "@portabletext/types"
import getVideoId from "get-video-id"
import type {
  BlockContent,
  SimpleBlockContent,
  TextBlock,
  ImageBlock,
  EmbedBlock,
  VideoBlock,
  AudioBlock,
  Footnote,
  PageLink,
} from "#lib/types/index.js"

export const SANITY_PROJECT_ID = "yesqrmft"
export const SANITY_DATASET = "production"

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
  apiVersion: "2024-06-06",
})

// --- Urls -------------------------------------------------------------------

const builder = createImageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source)

/** Narrows an image object to one with an uploaded asset */
export const hasAsset = <T extends { asset?: unknown }>(
  image: T,
): image is T & { asset: NonNullable<T["asset"]> } => Boolean(image.asset)

/**
 * Public CDN url for a file asset, from its reference string.
 * A reference looks like `file-<asset id>-<extension>`.
 */
export const fileUrl = (ref: string | undefined): string => {
  const match = ref ? /^file-(.+)-([a-z0-9]+)$/i.exec(ref) : null
  if (!match) return ""
  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${match[1]}.${match[2]}`
}

// --- Plain text ---------------------------------------------------------------

/** Plain text of a block array: text blocks joined by blank lines, other blocks skipped. */
export const toPlainText = (
  blocks: ReadonlyArray<BlockContent[number] | SimpleBlockContent[number]>,
): string =>
  blocks
    .map((block) =>
      block._type === "block" && block.children
        ? block.children.map((child) => child.text ?? "").join("")
        : "",
    )
    .join("\n\n")

// --- HTML ---------------------------------------------------------------------

const escape = (value: string) =>
  value.replace(
    /[&<>"]/g,
    (c) => `&${{ "&": "amp", "<": "lt", ">": "gt", '"': "quot" }[c]};`,
  )

const escapeText = (text: string) =>
  text.replace(/[&<>]/g, (c) => `&${{ "&": "amp", "<": "lt", ">": "gt" }[c]};`)

/** Serialises an attribute object to ` key="value"` pairs; `true` renders a bare attribute. */
const attributes = (
  attrs: Record<string, string | number | boolean | undefined | null>,
) =>
  Object.entries(attrs)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== false,
    )
    .map(([key, value]) =>
      value === true ? ` ${key}` : ` ${key}="${escape(String(value))}"`,
    )
    .join("")

/** Caption and attribution figcaptions shared by image, video, audio and embed blocks. */
const figcaptions = (block: {
  caption?: { content?: SimpleBlockContent | BlockContent }
  attribution?: string
}) => {
  let html = ""
  if (block.caption?.content) {
    html += `<figcaption class="caption">${escapeText(toPlainText(block.caption.content))}</figcaption>`
  }
  if (block.attribution !== undefined) {
    html += `<figcaption class="credits">${escapeText(block.attribution)}</figcaption>`
  }
  return html
}

const iframe = (attrs: Record<string, string | number | boolean | undefined>) =>
  `<iframe${attributes(attrs)}></iframe>`

const embedHtml = (block: EmbedBlock) => {
  const url = block.url ?? ""

  if (url.includes("youtube")) {
    const id = getVideoId(url).id
    if (!id) return ""
    return `<figure class="youtube"><div class="embed-container">${iframe({
      width: 720,
      height: 480,
      src: `https://www.youtube.com/embed/${id}`,
      frameborder: "no",
      allow:
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: true,
    })}</div>${figcaptions(block)}</figure>`
  }

  if (url.includes("vimeo")) {
    const id = getVideoId(url).id
    if (!id) return ""
    return `<figure class="vimeo"><div class="embed-container">${iframe({
      width: 720,
      height: 480,
      src: `https://player.vimeo.com/video/${id}`,
      frameborder: "no",
      allow: "autoplay; fullscreen",
      allowfullscreen: true,
    })}</div>${figcaptions(block)}</figure>`
  }

  if (url.includes("soundcloud")) {
    return `<figure class="soundcloud"><div class="soundcloud-container">${iframe(
      {
        width: "100%",
        height: 300,
        src: `https://w.soundcloud.com/player/?url=${url}&color=%23fffff`,
        frameborder: "no",
        scrolling: "no",
        allow: "autoplay",
      },
    )}</div>${figcaptions(block)}</figure>`
  }

  return ""
}

const components: Partial<PortableTextHtmlComponents> = {
  // Text nodes: escape markup characters only (no &nbsp; for runs of spaces)
  escapeHTML: escapeText,
  hardBreak: () => "<br>",

  // Text blocks keep their style as a class so the stylesheet can target e.g. p.normal, p.h1, p.note
  block: ({ value, children }) => {
    const style = value.style ?? "normal"
    if (style === "blockquote") return `<blockquote>${children}</blockquote>`
    if (style === "h2" || style === "h3" || style === "h4") {
      return `<${style}>${children}</${style}>`
    }
    return `<p class="${style}">${children}</p>`
  },

  marks: {
    link: ({
      value,
      children,
    }: PortableTextMarkComponentOptions<{ _type: "link"; href?: string }>) =>
      `<a${attributes({ target: "_blank", rel: "noreferrer", href: value?.href })}>${children}</a>`,
    pageLink: ({
      value,
      children,
    }: PortableTextMarkComponentOptions<PageLink>) =>
      `<a href="/page/${escape(value?.slug ?? "")}">${children}</a>`,
    // The footnote number is a CSS counter on the empty link; the list of notes is rendered separately
    footnote: ({
      value,
      children,
    }: PortableTextMarkComponentOptions<Footnote>) =>
      `<span>${children}<a class="footnote-link" id="link-${value?._key}" href="#note-${value?._key}"></a></span>`,
  },

  types: {
    image: ({ value }: { value: ImageBlock }) => {
      if (!value.asset) return ""
      const src = urlFor(value.asset)
        .width(800)
        .quality(90)
        .auto("format")
        .url()
      return `<figure class="image"><img${attributes({ src })}>${figcaptions(value)}</figure>`
    },

    embedBlock: ({ value }: { value: EmbedBlock }) => embedHtml(value),

    videoBlock: ({ value }: { value: VideoBlock }) => {
      const src = fileUrl(value.videoFile?.asset?._ref)
      if (!src) return ""
      const poster = value.posterImage?.asset
        ? urlFor(value.posterImage).width(640).quality(90).auto("format").url()
        : ""
      const video = `<video${attributes({ src, controls: true, loop: true, autoplay: value.autoPlay, poster })}></video>`
      return `<figure class="video">${video}${figcaptions(value)}</figure>`
    },

    audioBlock: ({ value }: { value: AudioBlock }) => {
      const src = fileUrl(value.audioFile?.asset?._ref)
      if (!src) return ""
      return `<figure class="audio"><audio${attributes({ src, controls: true })}></audio></figure>`
    },
  },
}

/**
 * Renders a block array (content editor or simple editor) to an HTML string.
 *
 * When the result has more than one top-level node (a list counts as one) it is
 * wrapped in a div, as the previous renderer did; some styles rely on that
 * wrapper, e.g. `.content div p` on the print pages.
 */
export const renderBlockText = (
  blocks:
    | ReadonlyArray<BlockContent[number] | SimpleBlockContent[number]>
    | undefined,
): string => {
  if (!blocks || blocks.length === 0) return ""
  const nodes = blocks as unknown as PortableTextBlock[]
  const html = toHTML(nodes, { components, onMissingComponent: false })
  return nestLists(nodes, "html").length > 1 ? `<div>${html}</div>` : html
}

// --- Loading ------------------------------------------------------------------

/**
 * Runs a GROQ query. A query for a single document that finds nothing (null)
 * becomes a 404; any other failure is reported as a 502 so it is not mistaken
 * for a missing page.
 */
export const loadData = async <T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> => {
  let result: T | null
  try {
    result = await client.fetch<T | null>(query, params)
  } catch (err) {
    console.error("Sanity query failed", err)
    error(502, "Could not load content")
  }
  if (result === null) error(404, "Not found")
  return result
}
