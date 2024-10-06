<script lang="ts">
  import type { Article, Issue, News, Page } from "$lib/types/sanity.types"
  import { browser } from "$app/environment"
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

  export let article: Article | News | Page
  export let issue: Issue | null = null

  const BASE_URL = "https://bygningskunstogkultur.dk"

  function getUrl(article: Article | News | Page): string {
    switch (article._type) {
      case "news":
        return `${BASE_URL}/nyhed/${article.slug?.current ?? ""}`
      case "article":
        return `${BASE_URL}/${issue?.slug?.current ?? ""}/${article.slug?.current ?? ""}`
      case "page":
        return `${BASE_URL}/page/${article.slug?.current ?? ""}`
      default:
        return BASE_URL
    }
  }

  function getPdfUrl(article: Article | News | Page): string {
    switch (article._type) {
      case "news":
        return `${BASE_URL}/pdf/news/${article.slug?.current ?? ""}`
      case "article":
        return `${BASE_URL}/pdf/article/${article.slug?.current ?? ""}`
      case "page":
        return `${BASE_URL}/pdf/page/${article.slug?.current ?? ""}`
      default:
        return BASE_URL
    }
  }

  // SHARING LINKS
  const PDF_URL = getPdfUrl(article)

  const URL = getUrl(article)

  const LINKEDIN = `https://www.linkedin.com/shareArticle?mini=true&url=${URL}`

  const FACEBOOK = `https://facebook.com/sharer/sharer.php?u=${URL}&t=${article.title}`

  const TWITTER = `http://twitter.com/share?url=${URL}&text=${article.title}`

  const EMAIL = `mailto:?subject=${article.title}&body=${URL}`

  const nativeShare = () => {
    if (navigator?.share) {
      navigator
        .share({
          title: article.title,
          text: article.title,
          url: URL,
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error))
    }
  }

  let copied = false

  const copyLink = () => {
    copy(URL)
    copied = true
  }
</script>

<div class="social">
  <!-- PDF -->
  <a href={PDF_URL} aria-label="Download PDF" target="_blank">
    <Fa icon={faFilePdf} />
  </a>
  <!-- FACEBOOK -->
  <a href={FACEBOOK} aria-label="Share on Facebook" target="_blank">
    <Fa icon={faFacebookSquare} />
  </a>
  <!-- TWITTER / X -->
  <a href={TWITTER} aria-label="Share on Twitter" target="_blank">
    <Fa icon={faTwitterSquare} />
  </a>
  <!-- LINKEDIN -->
  <a href={LINKEDIN} aria-label="Share on LinkedIn" target="_blank">
    <Fa icon={faLinkedin} />
  </a>
  <!-- EMAIL -->
  <a href={EMAIL} aria-label="Share by Email" target="_blank">
    <Fa icon={faEnvelope} />
  </a>
  <!-- COPY URL -->
  <button aria-label="Copy url" class="copy" on:click={copyLink}>
    {#if copied}
      <Fa icon={faCheck} />
    {:else}
      <Fa icon={faLink} />
    {/if}
  </button>
  <!-- NATIVE SHARE -->
  {#if browser && navigator?.share}
    <button aria-label="Share page" class="native" on:click={nativeShare}>
      <Fa icon={faShareAltSquare} />
    </button>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

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
