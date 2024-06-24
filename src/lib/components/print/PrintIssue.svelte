<script lang="ts">
  import type { Colophon, Issue } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import { has, isArray } from "lodash-es"
  import { calculateArticleReadingTime } from "$lib/modules/utils"
  import PrintArticleComponent from "$lib/components/print/PrintArticleComponent.svelte"
  import OutputInfo from "$lib/components/print/OutputInfo.svelte"

  export let issue: Issue
  export let colophon: Colophon

  onMount(async () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto"
    document.getElementsByTagName("body")[0].style.height = "auto"
  })
</script>

<div class="print-container">
  <!-- PRINT INFO -->
  <div class="print-info">
    <div>Print this page to PDF (CMD + P) to save a copy of this issue.</div>
  </div>
  <!-- COVER -->
  <div class="cover">
    <div class="text">
      <div class="title">Magasin for Bygningskunst og Kultur</div>
      <div class="date">{issue.title}</div>
    </div>
    <div class="image">
      <img
        src={urlFor(issue.mainImage?.asset)
          .quality(90)
          .width(800)
          .auto("format")
          .url()}
        alt={issue.title}
      />
    </div>
  </div>
  <!-- COLOPHON -->
  <div class="colophon">
    {#if colophon.wideColumn}
      <div class="content">
        {#if has(colophon, "wideColumn.content") && isArray(colophon.wideColumn.content)}
          <div class="paragraph">
            {@html renderBlockText(colophon.wideColumn.content)}
          </div>
        {/if}
        <div class="narrow-cols">
          {#if has(colophon, "firstNarrowColumn.content") && isArray(colophon.firstNarrowColumn?.content)}
            <div class="narrow-col">
              {@html renderBlockText(colophon.firstNarrowColumn.content)}
            </div>
          {/if}
          {#if has(colophon, "secondNarrowColumn.content") && isArray(colophon.secondNarrowColumn?.content)}
            <div class="narrow-col">
              {@html renderBlockText(colophon.secondNarrowColumn.content)}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  {#if issue.tableOfContents}
    <!-- ToC -->
    <div class="toc">
      <ol>
        {#each issue.tableOfContents as article, index}
          <li class="bar-menu-item title-item link">
            <div class="title-text">
              {`${index + 1}. `}
              {article.title ?? ""}
            </div>
            {#if article.author}
              <div class="author">
                {article.author}
              </div>
            {/if}
            <div class="reading-time">
              {calculateArticleReadingTime(article) + " min"}
            </div>
          </li>
        {/each}
      </ol>
    </div>
    <!-- Articles -->
    {#each issue.tableOfContents as post}
      <PrintArticleComponent {post} {issue} />
    {/each}
  {/if}
  <!-- OUTPUT INFO -->
  <OutputInfo />
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  @page {
    @bottom-center {
      content: counter(page) "/" counter(pages);
      font-family: var(--sans-stack);
      font-size: var(--font-size-print);
    }
  }

  .print-container {
    padding: 2em;
    font-family: var(--sans-stack);
    font-size: var(--font-size-print);
    @media screen {
      max-width: 900px;
    }
  }

  .print-info {
    background: var(--green);
    padding: 40px;
    height: 30vh;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
    align-items: center;

    @media print {
      display: none;
    }
  }

  .cover {
    display: flex;
    flex-direction: column;
    height: auto;

    @media print {
      height: 100vh;
      page-break-after: always;
    }

    .text {
      .date {
        font-size: 48px;
        line-height: 1em;
      }

      .title {
        font-size: 64px;
        line-height: 1em;
      }
    }

    .image {
      flex: 1; /* This ensures the .image will take the remaining space */
      display: flex; /* To ensure the img inside .image aligns correctly */
      overflow: hidden; /* Ensures no overflow */

      img {
        /* Keeping aspect ratio */
        max-height: 100%;
        max-width: 100%;
        /* To ensure it aligns in the center if there's extra space */
        margin: auto;
      }
    }
  }

  .colophon {
    display: flex;
    flex-direction: column;
    height: auto;
    @media print {
      page-break-after: always;
      height: 100vh;
    }
  }

  .toc {
    display: flex;
    flex-direction: column;
    height: auto;
    padding-top: 1em;
    padding-bottom: 1em;

    ol {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    @media print {
      height: 100vh;
      page-break-after: always;
    }

    .title-text {
      margin-bottom: 1em;
    }

    .author {
      margin-bottom: 1em;
    }
  }

  :global(.print-container .colophon .narrow-col img) {
    display: none;
  }

  :global(.print-container .colophon p) {
    font-size: 16px;
  }

  :global(.print-container .toc li) {
    font-size: 16px;
  }

  :global(.print-container .toc .bar-menu-item) {
    border-top: 1px solid black;
    padding-top: 1em;
    padding-bottom: 1em;
  }
</style>
