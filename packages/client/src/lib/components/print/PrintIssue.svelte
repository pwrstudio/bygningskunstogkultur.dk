<script lang="ts">
  import type { Colophon, Issue } from "$lib/types"
  import { onMount } from "svelte"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import {
    calculateArticleReadingTime,
    unlockBodyScroll,
  } from "$lib/modules/utils"
  import PrintArticleComponent from "$lib/components/print/PrintArticleComponent.svelte"
  import OutputInfo from "$lib/components/print/OutputInfo.svelte"
  import PrintInfo from "$lib/components/print/PrintInfo.svelte"

  interface Props {
    issue: Issue
    colophon: Colophon
  }

  let { issue, colophon }: Props = $props()

  onMount(unlockBodyScroll)
</script>

<div class="print-container">
  <!-- PRINT INFO -->
  <PrintInfo />
  <!-- COVER -->
  <div class="cover">
    <div class="text">
      <div class="title">Magasin for Bygningskunst og Kultur</div>
      <div class="date">{issue.title}</div>
    </div>
    {#if issue.mainImage?.asset}
      <div class="image">
        <img
          src={urlFor(issue.mainImage.asset)
            .quality(90)
            .width(800)
            .auto("format")
            .url()}
          alt={issue.title}
        />
      </div>
    {/if}
  </div>
  <!-- COLOPHON -->
  <div class="colophon">
    {#if colophon.wideColumn}
      <div class="content">
        {#if colophon.wideColumn.content}
          <div class="paragraph">
            {@html renderBlockText(colophon.wideColumn.content)}
          </div>
        {/if}
        <div class="narrow-cols">
          {#if colophon.firstNarrowColumn?.content}
            <div class="narrow-col">
              {@html renderBlockText(colophon.firstNarrowColumn.content)}
            </div>
          {/if}
          {#if colophon.secondNarrowColumn?.content}
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
  @use "../../styles/variables.scss" as *;

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
