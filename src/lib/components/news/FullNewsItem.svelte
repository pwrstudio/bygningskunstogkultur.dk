<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import type { News } from "$lib/types/sanity.types"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import { formattedDate } from "$lib/modules/utils"
  import ArrowLeft from "$lib/components/graphics/ArrowLeft.svelte"
  import Share from "$lib/components/share/Share.svelte"

  const dispatch = createEventDispatcher()

  export let news: News

  const close = () => {
    dispatch("close")
  }
</script>

<div class="full-news-item">
  <!-- CLOSE  -->
  <button class="close-extended" aria-label="Close news" on:click={close}>
    <ArrowLeft />
  </button>

  <div class="content">
    <!-- IMAGE  -->
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
      <div class="header-inner">
        <!-- TITLE -->
        <div>
          {news.title}
        </div>
        <!-- PUBLICATION DATE -->
        <div>
          {#if news.publicationDate}
            {@html formattedDate(news.publicationDate)}
          {/if}
        </div>
      </div>
      <Share article={news} />
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
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .full-news-item {
    position: relative;
    min-height: 100%;
    padding-bottom: calc(var(--margin) * 2);
    padding-left: 42px;
    font-family: var(--sans-stack);
    max-width: 80dvw;

    .image {
      mix-blend-mode: unset;
      max-width: 100%;
      max-height: 50dvh;
    }

    .close-extended {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 42px;
      cursor: pointer;
    }

    .header {
      font-size: var(--font-size-small);
      border-top: var(--border-black);
      border-bottom: var(--border-black);
      padding-top: 4px;
      display: flex;
      flex-direction: column;
      margin-bottom: 1em;

      .header-inner {
        margin-bottom: var(--margin-xs);
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      :global(.social) {
        margin-top: 0;
      }
    }
  }
</style>
