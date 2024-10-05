<script lang="ts">
  import type { Article, News, Page } from "$lib/types/sanity.types"
  import { truncate } from "lodash-es"
  import { toPlainText, urlFor } from "$lib/modules/sanity"
  import { defaultMetadata } from "./defaultMetadata"

  export let post: Article | News | Page | null = null

  let title = (post?.title ? post.title + " | " : "") + defaultMetadata.title

  let description =
    post?.content?.content && Array.isArray(post.content.content)
      ? truncate(toPlainText(post.content.content), {
          length: 260,
          separator: /.? +/,
        })
      : defaultMetadata.description

  let image = post?.mainImage
    ? urlFor(post.mainImage)
        .quality(80)
        .height(627)
        .width(1200)
        .auto("format")
        .url()
    : defaultMetadata.image
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />
  <meta property="twitter:image" content={image} />
  <meta property="og:site_name" content="MAGASIN FOR BYGNINGSKUNST OG KULTUR" />
</svelte:head>
