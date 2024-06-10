<script lang="ts">
  // # # # # # # # # # # # # #
  //
  //  Share
  //
  // # # # # # # # # # # # # #

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
  import type { Article, Issue } from "$lib/types/sanity.types"

  // *** PROPS
  export let article: Article
  export let issue: Issue

  // SHARING LINKS
  const PDF_URL = "/pdf-article/" + article.slug.current

  const URL =
    "https://bygningskunstogkultur.dk/" +
    issue.slug.current +
    "/" +
    article.slug.current

  const LINKEDIN = "https://www.linkedin.com/shareArticle?mini=true&url=" + URL

  const FACEBOOK =
    "https://facebook.com/sharer/sharer.php?u=" + URL + "&t=" + article.title

  const TWITTER =
    "http://twitter.com/share?url=" + URL + "&text=" + article.title

  const EMAIL = "mailto:?subject=" + article.title + "&body=" + URL

  const nativeShare = () => {
    // if (navigator?.share) {
    //   navigator
    //     .share({
    //       title: article.title,
    //       text: article.title,
    //       url: URL,
    //     })
    //     .then(() => console.log("Successful share"))
    //     .catch(error => console.log("Error sharing", error))
    // }
  }

  let copied = false

  const copyLink = () => {
    copy(URL)
    copied = true
  }
</script>

<div class="social">
  <a href={PDF_URL} target="_blank">
    <Fa icon={faFilePdf} />
  </a>
  <a href={FACEBOOK} target="_blank">
    <Fa icon={faFacebookSquare} />
  </a>
  <a href={TWITTER} target="_blank">
    <Fa icon={faTwitterSquare} />
  </a>
  <a href={LINKEDIN} target="_blank">
    <Fa icon={faLinkedin} />
  </a>
  <a href={EMAIL} target="_blank">
    <Fa icon={faEnvelope} />
  </a>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <span class="copy" on:click={copyLink}>
    {#if copied}
      <Fa icon={faCheck} />
    {:else}
      <Fa icon={faLink} />
    {/if}
  </span>
  <!-- Native share dialog if available (mobile) -->
  <!-- {#if navigator?.share} -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- <span on:click={nativeShare} target="_blank">
      <Fa icon={faShareAltSquare} />
    </span>
  {/if} -->
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
      height: 1.3em !important;
    }

    :global(.copy svg) {
      height: 1.1em !important;
    }

    @include screen-size("small") {
      :global(a) {
        margin-left: 5px;
      }
      :global(svg) {
        height: 1.3em !important;
      }
    }
  }
</style>
