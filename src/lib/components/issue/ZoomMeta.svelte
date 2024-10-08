<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { fade } from "svelte/transition"
  import { renderBlockText, toPlainText } from "$lib/modules/sanity"
  import { splitTextBlocks } from "$lib/modules/utils"

  import Share from "$lib/components/share/Share.svelte"
  import Footnotes from "$lib/components/issue/Footnotes.svelte"

  export let article: Article
  export let issue: Issue | undefined | null

  let extended = false
  const toggleExtended = () => (extended = !extended)

  const TEXT_LIMIT = 400
  let mainTextLength = toPlainText(article.content?.content ?? []).length

  const [shortText, extendedText] = splitTextBlocks(
    article.content?.content ?? []
  )
</script>

<div class="zoom-header-container">
  <div class="block meta" in:fade>
    <!-- HEADER -->
    <div class="header">
      <span>Magasin for Bygningskunst og Kultur</span>
      <span class="right">
        {issue?.title ?? ""}
      </span>
    </div>

    <!-- TITLE -->
    <h1 class="article-title">
      {article.title}
    </h1>

    <!-- BYLINE -->
    <div class="byline">
      <div class="text">
        {@html renderBlockText(article.byline?.content ?? [])}
      </div>

      <!-- SHARING-->
      <Share {article} {issue} />
    </div>
  </div>

  <div class="block main-text" class:extended in:fade>
    {@html renderBlockText(shortText)}
    {#if mainTextLength > TEXT_LIMIT}
      <button
        class="read-more"
        aria-label={extended ? "Read less" : "Read more"}
        on:click={toggleExtended}
      >
        {extended ? "READ LESS" : "READ MORE"}
      </button>
      {#if extended}
        <div class="extended-text" in:fade>
          {@html renderBlockText(extendedText)}
          <!-- FOOTNOTES -->
          <Footnotes {article} />
        </div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .block {
    box-sizing: border-box;
  }

  .zoom-header-container {
    width: calc(100% - 10px);
  }

  .meta {
    width: 50%;
    float: left;

    @include screen-size("small") {
      width: 100%;
    }

    .header {
      padding-top: var(--margin-xs);
      padding-bottom: var(--margin-xs);
      border-top: var(--border-black);

      .right {
        text-align: right;
      }
    }

    .article-title {
      font-family: var(--display-stack);
      font-size: var(--font-size-larger);
      line-height: var(--line-height-larger);
      font-weight: normal;
      margin: 0 0 var(--margin-xs);
    }

    .byline {
      border-bottom: var(--border-black);
      margin-bottom: var(--margin-xs);
      padding-bottom: var(--margin-xs);
      display: flex;
      align-items: flex-end;

      @include screen-size("small") {
        flex-direction: column;
      }

      .text {
        flex-grow: 1;
        margin-right: var(--margin);

        @include screen-size("small") {
          margin-right: 0;
        }
      }

      :global(p) {
        margin: 0;
      }
    }
  }

  .main-text {
    padding-top: 4px !important;
    padding-bottom: var(--margin);
    border-top: var(--border-black);
    width: 50%;
    float: right;

    @include screen-size("small") {
      width: 100%;
      border-top: unset;
      border-bottom: var(--border-black);
    }
  }

  .read-more {
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 1em;
    user-select: none;

    &:hover {
      text-decoration: none;
    }
  }
</style>
