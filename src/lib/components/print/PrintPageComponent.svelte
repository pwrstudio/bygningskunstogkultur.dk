<script lang="ts">
  import type { Page } from "$lib/types/sanity.types"
  import { renderBlockText } from "$lib/modules/sanity"
  import { calculateArticleReadingTime } from "$lib/modules/utils"
  import Footnotes from "$lib/components/issue/Footnotes.svelte"

  export let page: Page
</script>

<div class="print-article">
  <!-- HEADER -->
  <header>
    <div class="top-bar">
      <div>Magasin for Bygningskunst og Kultur</div>
    </div>
    <!-- TITLE -->
    <div class="title">
      {page.title}
    </div>
    <!-- BYLINE -->
    <div class="byline">
      <div class="text">
        <!-- READING TIME -->
        <div class="reading-time">
          <p class="normal">{calculateArticleReadingTime(page)} min</p>
        </div>
      </div>
    </div>
  </header>
  <!-- CONTENT -->
  <div class="content">
    {@html renderBlockText(page.content?.content ?? [])}
  </div>
  <!-- FOOTNOTES -->
  <div class="footnotes">
    <Footnotes article={page} isPrint />
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .print-article {
    @media print {
      page-break-after: always;
    }
  }

  header {
    width: 100%;
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    margin-bottom: 2em;
  }

  :global(.print-article .content div p) {
    font-family: var(--sans-stack);
    font-size: var(--font-size-print) !important;
    line-height: 1.3em;
  }

  :global(.print-article .author p) {
    margin-bottom: 0;
  }

  :global(.print-article .reading-time p) {
    margin-bottom: 0;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  .title {
    margin-top: 0.5em;
    font-size: 48px;
    margin-bottom: 0.5em;
    line-height: normal;
  }

  .footnotes {
    border-top: 1px solid var(--black);
    padding-top: 1em;
    margin-top: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--black);
    margin-bottom: 2em;
  }

  :global(.print-article .footnotes p) {
    font-size: 13px;
  }
</style>
