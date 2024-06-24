<script lang="ts">
  import type { Article, Issue, News } from "$lib/types/sanity.types"
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

  export let article: Article | News
  export let issue: Issue | null = null

  console.log("article", article)

  // SHARING LINKS
  const PDF_URL =
    (article._type === "news" ? "/pdf/news/" : "/pdf/article/") +
    article.slug.current

  const URL = issue
    ? "https://bygningskunstogkultur.dk/" +
      issue.slug.current +
      "/" +
      article.slug.current
    : "https://bygningskunstogkultur.dk/nyhed/" + article.slug.current

  const LINKEDIN = "https://www.linkedin.com/shareArticle?mini=true&url=" + URL

  const FACEBOOK =
    "https://facebook.com/sharer/sharer.php?u=" + URL + "&t=" + article.title

  const TWITTER =
    "http://twitter.com/share?url=" + URL + "&text=" + article.title

  const EMAIL = "mailto:?subject=" + article.title + "&body=" + URL

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
  <a href={PDF_URL} aria-label="Download PDF" target="_blank">
    <Fa icon={faFilePdf} />
  </a>
  <a href={FACEBOOK} aria-label="Share on Facebook" target="_blank">
    <Fa icon={faFacebookSquare} />
  </a>
  <a href={TWITTER} aria-label="Share on Twitter" target="_blank">
    <Fa icon={faTwitterSquare} />
  </a>
  <a href={LINKEDIN} aria-label="Share on LinkedIn" target="_blank">
    <Fa icon={faLinkedin} />
  </a>
  <a href={EMAIL} aria-label="Share by Email" target="_blank">
    <Fa icon={faEnvelope} />
  </a>
  <button aria-label="Copy url" class="copy" on:click={copyLink}>
    {#if copied}
      <Fa icon={faCheck} />
    {:else}
      <Fa icon={faLink} />
    {/if}
  </button>
  <!-- Native share dialog if available (mobile) -->
  {#if browser && navigator?.share}
    <button aria-label="Share page" on:click={nativeShare}>
      <Fa icon={faShareAltSquare} />
    </button>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .social {
    white-space: nowrap;
    flex-shrink: 0;

    .copy {
      cursor: pointer;
    }

    :global(svg) {
      height: 1.1em !important;
    }

    @include screen-size("small") {
      :global(svg) {
        padding-inline: 7px;
        height: 1.5em !important;
      }
    }
  }
</style>
