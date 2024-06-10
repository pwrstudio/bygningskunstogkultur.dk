<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "$lib/modules/sanity"
  import { calculateArticleReadingTime } from "$lib/modules/utils"

  import Share from "$lib/components/share/Share.svelte"

  export let article: Article
  export let issue: Issue

  const readingTime = calculateArticleReadingTime(article)
</script>

<div class="block meta" in:fade>
  <!-- HEADER -->
  <div class="header">
    <span>Magasin for Bygningskunst og Kultur</span>
    <span class="right">
      {issue.title}
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

      <!-- AUTHOR -->
      {#if article.author}
        <div class="author">
          <p class="normal">{article.author}</p>
        </div>
      {/if}

      <!-- READING TIME -->
      <div class="reading-time">
        <p class="normal">{readingTime} min</p>
      </div>
    </div>

    <!-- SHARING-->
    <Share {article} {issue} />
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

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
    line-height: $line_height_larger;
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
      margin-right: $margin;

      @include screen-size("small") {
        margin-right: 0;
      }
    }

    :global(p) {
      margin: 0;
    }
  }

  .author {
    margin-top: 1em;
  }
</style>
