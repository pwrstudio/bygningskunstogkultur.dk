<script lang="ts">
  import type { Page } from "#lib/types/index.js"
  import { fade } from "svelte/transition"
  import { calculateArticleReadingTime } from "#lib/modules/utils/index.js"

  import Share from "#lib/components/share/Share.svelte"

  interface Props {
    page: Page
  }

  let { page }: Props = $props()

  let readingTime = $derived(calculateArticleReadingTime(page))
</script>

<div class="block meta" in:fade>
  <!-- HEADER -->
  <div class="header">
    <span>Magasin for Bygningskunst og Kultur</span>
  </div>

  <!-- TITLE -->
  <h1 class="article-title">
    {page.title}
  </h1>

  <!-- BYLINE -->
  <div class="byline">
    <div class="text">
      <!-- READING TIME -->
      <div class="reading-time">
        <p class="normal">{readingTime} min</p>
      </div>
    </div>

    <!-- SHARING-->
    <Share article={page} />
  </div>
</div>

<style lang="scss">
  @use "../../styles/variables.scss" as *;

  .header {
    padding-top: var(--margin-xs);
    padding-bottom: var(--margin-xs);
    border-top: var(--border-black);
    font-size: 16px;
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
</style>
