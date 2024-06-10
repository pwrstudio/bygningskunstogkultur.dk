<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { renderBlockText } from "$lib/modules/sanity"
  import { getNextArticle } from "$lib/modules/utils"
  import { get } from "lodash-es"

  import { menuActive } from "$lib/modules/stores"

  // import MetaData from "./MetaData.svelte"
  import Slideshow from "$lib/components/issue/SlideShow.svelte"
  import Meta from "$lib/components/issue/Meta.svelte"
  import ZoomMeta from "$lib/components/issue/ZoomMeta.svelte"
  import ArrowDown from "$lib/components/graphics/ArrowDown.svelte"
  import Footnotes from "$lib/components/issue/Footnotes.svelte"

  export let article: Article
  export let issue: Issue

  const nextArticle: Article | null = getNextArticle(issue, article)

  const closeMenu = () => {
    menuActive.set(false)
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={closeMenu} class="article" id={article.slug?.current ?? ""}>
  <div
    class="col"
    class:zoomableSlideshowLayout={article.zoomableSlideshowLayout}
  >
    {#if article.zoomableSlideshowLayout}
      <!-- ZOOM-META -->
      <ZoomMeta {article} {issue} />

      <div class="block full">
        <Slideshow zoomable slides={get(article, "slideshow", [])} />
      </div>
    {:else}
      <!-- META -->
      <Meta {article} {issue} />

      <div class="block full mobile">
        {#if !get(article, "zoomableSlideshowLayout", false)}
          <div
            class="col slideshow-mobile"
            class:slideshow={get(article, "slideshow", [])}
          >
            {#if get(article, "slideshow", [])}
              <Slideshow mobile slides={article.slideshow ?? []} />
            {/if}
          </div>
        {/if}
      </div>

      <div class="block main">
        {@html renderBlockText(get(article, "content.content", []))}
      </div>

      <!-- FOOTNOTES -->
      <Footnotes {article} />
    {/if}

    {#if nextArticle}
      <a
        href={nextArticle.slug.current}
        class="block link next"
        class:full={article.zoomableSlideshowLayout}
        data-sveltekit-preload-data
      >
        <h2 class="title next">
          Næste: {nextArticle.title}
        </h2>
        <div class="graphic">
          <ArrowDown />
        </div>
      </a>
    {/if}
  </div>

  {#if !article.zoomableSlideshowLayout}
    <div
      class="col slideshow-regular"
      class:slideshow={article.slideshow ?? false}
    >
      {#if article.slideshow}
        <Slideshow slides={article.slideshow ?? []} />
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .slideshow-mobile {
    display: none;

    @include screen-size("phone") {
      display: block;
    }
  }

  .slideshow-regular {
    display: block;

    @include screen-size("phone") {
      display: none;
    }
  }

  .article {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-family: var(--sans-stack);
    display: flex;
    flex-flow: row nowrap;
    scroll-snap-align: start;
    padding-left: calc(var(--menu-side-width) * 2);

    @include screen-size("phone") {
      height: calc(100vh - #{$menu_button_width});
      flex-flow: column nowrap;
      height: auto;
      overflow-y: auto;
    }

    .col {
      box-sizing: border-box;
      width: 50%;
      padding: var(--margin) calc(var(--margin) / 4);
      height: 100vh;
      overflow-y: scroll;
      scroll-behavior: smooth;

      @include screen-size("phone") {
        width: 100%;
      }

      &.zoomableSlideshowLayout {
        padding: $margin 0;
        width: 100%;
        display: flex;
        flex-flow: row wrap;

        :global(.block) {
          padding: 0 calc(var(--margin) / 4);
        }

        .block {
          width: 50%;
          box-sizing: border-box;

          @include screen-size("phone") {
            width: 100%;
          }

          &.full {
            width: 100%;
          }

          &.main {
            padding-left: var(--margin-xs);

            .content {
              padding-top: 6px;
              border-top: var(--border-black);
            }
          }
        }
      }

      .block {
        &.main {
          margin-bottom: $margin;
        }

        &.link {
          text-align: center;
        }

        &.next {
          display: block;

          @include screen-size("phone") {
            display: none;
          }
        }
      }

      &.slideshow {
        overflow-y: hidden;
      }
    }

    .title {
      margin-top: 0;
    }
  }

  .article:last-child {
    margin-bottom: $menu_button_width * 2;
    padding-bottom: 100px;
  }
</style>
