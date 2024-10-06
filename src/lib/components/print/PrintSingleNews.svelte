<script lang="ts">
  import type { News } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import { formattedDate } from "$lib/modules/utils"
  import OutputInfo from "$lib/components/print/OutputInfo.svelte"
  import PrintInfo from "$lib/components/print/PrintInfo.svelte"

  export let news: News

  onMount(async () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto"
    document.getElementsByTagName("body")[0].style.height = "auto"
  })
</script>

<div class="print-container">
  <!-- PRINT INFO -->
  <PrintInfo />
  <div class="content">
    {#if news.mainImage?.asset}
      <img
        class="image"
        alt={news.title}
        src={urlFor(news.mainImage.asset)
          .width(900)
          .quality(90)
          .saturation(-100)
          .auto("format")
          .url()}
      />
    {/if}
    <!-- HEADER -->
    <div class="header">
      <!-- TITLE -->
      <span>
        {news.title}
      </span>
      <!-- PUBLICATION DATE -->
      <span>
        {#if news.publicationDate}
          {@html formattedDate(news.publicationDate)}
        {/if}
      </span>
    </div>
    <!-- CONTENT -->
    {#if news.extendedContent?.content}
      <div class="paragraph">
        {@html renderBlockText(news.extendedContent.content)}
      </div>
    {:else if news.content?.content}
      <div class="paragraph">
        {@html renderBlockText(news.content?.content ?? [])}
      </div>
    {/if}
  </div>
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

  .image {
    mix-blend-mode: unset;
    max-width: 100%;
    max-height: 60vh;
  }

  .content {
    margin-bottom: 1em;
  }

  .header {
    margin-top: 1em;
    border-bottom: 1px solid var(--black);
    padding-top: 1em;
    padding-bottom: 1em;
    border-top: 1px solid var(--black);
    margin-bottom: 1em;
  }
</style>
