<script lang="ts">
  import type { Article, Issue, News, Page } from "#lib/types/index.js"
  import { browser } from "$app/env"
  import Fa from "svelte-fa"
  import copy from "copy-to-clipboard"
  import {
    faFacebookSquare,
    faLinkedin,
    faTwitterSquare,
  } from "@fortawesome/free-brands-svg-icons"
  import {
    faEnvelope,
    faShareAltSquare,
    faLink,
    faCheck,
    faFilePdf,
  } from "@fortawesome/free-solid-svg-icons"

  interface Props {
    article: Article | News | Page
    issue?: Issue | null
  }

  let { article, issue = null }: Props = $props()
  const BASE_URL = "https://bygningskunstogkultur.dk"

  // Share links always point at the live site, also from the preview deployment
  function getUrl(post: Article | News | Page): string {
    switch (post._type) {
      case "news":
        return `${BASE_URL}/nyhed/${post.slug.current}`
      case "article":
        return `${BASE_URL}/${issue?.slug.current ?? ""}/${post.slug.current}`
      case "page":
        return `${BASE_URL}/page/${post.slug.current}`
    }
  }

  function getPdfUrl(post: Article | News | Page): string {
    switch (post._type) {
      case "news":
        return `${BASE_URL}/pdf/news/${post.slug.current}`
      case "article":
        return `${BASE_URL}/pdf/article/${post.slug.current}`
      case "page":
        return `${BASE_URL}/pdf/page/${post.slug.current}`
    }
  }

  let url = $derived(getUrl(article))
  let pdfUrl = $derived(getPdfUrl(article))
  let encodedUrl = $derived(encodeURIComponent(url))
  let encodedTitle = $derived(encodeURIComponent(article.title))
  let linkedin = $derived(
    `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`,
  )
  let facebook = $derived(
    `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  )
  let twitter = $derived(
    `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  )
  let email = $derived(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`)

  const nativeShare = () => {
    navigator
      .share({ title: article.title, text: article.title, url })
      .catch(() => {
        // The visitor dismissed the share sheet
      })
  }

  let copied = $state(false)

  const copyLink = () => {
    copy(url)
    copied = true
  }
</script>

<div class="social">
  <!-- PDF -->
  <a href={pdfUrl} aria-label="Download PDF" target="_blank" rel="noopener">
    <Fa icon={faFilePdf} />
  </a>
  <!-- FACEBOOK -->
  <a
    href={facebook}
    aria-label="Share on Facebook"
    target="_blank"
    rel="noopener"
  >
    <Fa icon={faFacebookSquare} />
  </a>
  <!-- TWITTER / X -->
  <a
    href={twitter}
    aria-label="Share on Twitter"
    target="_blank"
    rel="noopener"
  >
    <Fa icon={faTwitterSquare} />
  </a>
  <!-- LINKEDIN -->
  <a
    href={linkedin}
    aria-label="Share on LinkedIn"
    target="_blank"
    rel="noopener"
  >
    <Fa icon={faLinkedin} />
  </a>
  <!-- EMAIL -->
  <a href={email} aria-label="Share by Email">
    <Fa icon={faEnvelope} />
  </a>
  <!-- COPY URL -->
  <button aria-label="Copy url" class="copy" onclick={copyLink}>
    {#if copied}
      <Fa icon={faCheck} />
    {:else}
      <Fa icon={faLink} />
    {/if}
  </button>
  <!-- NATIVE SHARE -->
  {#if browser && "share" in navigator}
    <button aria-label="Share page" class="native" onclick={nativeShare}>
      <Fa icon={faShareAltSquare} />
    </button>
  {/if}
</div>

<style lang="scss">
  @use "../../styles/variables.scss" as *;

  .social {
    white-space: nowrap;
    flex-shrink: 0;

    button {
      cursor: pointer;
    }

    :global(svg) {
      height: 1.1em !important;
    }

    :global(.copy svg) {
      position: relative;
      top: -3px;
      height: 1.2em !important;
    }

    :global(.native svg) {
      height: 1.6em !important;
    }

    @include screen-size("small") {
      width: 100%;
      padding-top: 0.5em;
      border-top: var(--border-black);
      margin-top: 1em;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      :global(svg) {
        padding-inline: 8px;
        height: 1.5em !important;
      }

      :global(.copy svg) {
        height: 1.8em !important;
      }

      :global(.native svg) {
        position: relative;
        top: -3px;
        height: 2.2em !important;
      }
    }
  }
</style>
