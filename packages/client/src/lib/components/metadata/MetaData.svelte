<script lang="ts">
  import type { Article, News, Page } from "$lib/types"
  import { toPlainText, urlFor } from "$lib/modules/sanity"
  import { truncate } from "$lib/modules/utils"
  import { defaultMetadata } from "./defaultMetadata"

  export let post: Article | News | Page | null = null

  $: title = (post?.title ? post.title + " | " : "") + defaultMetadata.title

  // One line of text: block breaks and empty paragraphs collapse to single spaces
  $: description = post?.content?.content
    ? truncate(
        toPlainText(post.content.content).replace(/\s+/g, " ").trim(),
        260,
      )
    : defaultMetadata.description

  $: mainImage = post && "mainImage" in post ? post.mainImage : undefined

  $: image = mainImage?.asset
    ? urlFor(mainImage).quality(80).height(627).width(1200).auto("format").url()
    : defaultMetadata.image
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={defaultMetadata.title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {#if image}
    <meta property="og:image" content={image} />
    <meta name="twitter:image" content={image} />
  {/if}
</svelte:head>
