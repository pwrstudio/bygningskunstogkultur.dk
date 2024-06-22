<script lang="ts">
  import type { News } from "$lib/types/sanity.types"
  import { tick, createEventDispatcher } from "svelte"
  import { renderBlockText, urlFor } from "$lib/modules/sanity"
  import { formattedDate } from "$lib/modules/utils"
  import {
    tableOfContentsOpen,
    newsExtended,
    windowWidth,
  } from "$lib/modules/stores"
  import ArrowRight from "$lib/components/graphics/ArrowRight.svelte"
  import FullNewsItem from "$lib/components/news/FullNewsItem.svelte"

  const dispatch = createEventDispatcher()

  export let news = [] as News[]

  let extendedPost: News | null = null

  const openExtendedPost = (item: News) => {
    extendedPost = item
    tableOfContentsOpen.set(false)
    newsExtended.set(true)
    dispatch("scrollToTop")
  }

  const closeExtendedPost = async () => {
    if (!extendedPost) return

    let targetNewsItem = extendedPost.slug.current

    newsExtended.set(false)
    extendedPost = null

    // Let the DOM update before scrolling
    await tick()
    let targetNewsItemEl = document.querySelector(`#${targetNewsItem}`)
    if (targetNewsItemEl) {
      targetNewsItemEl.scrollIntoView({
        block: "start",
      })
    }
  }
</script>

<div class:extended={$newsExtended}>
  <!-- EXTENDED POST -->
  {#if $newsExtended && extendedPost}
    <FullNewsItem news={extendedPost} on:close={closeExtendedPost} />
  {:else}
    <!-- LOGO -->
    <div class="kadk-logo">
      <img alt="logo" src="/img/logo.svg" />
    </div>
    {#each news as item}
      <div class="news-item" id={item.slug.current}>
        <div class="content">
          <!-- IMAGE -->
          {#if item.mainImage?.asset}
            <img
              class="image"
              alt={item.title}
              src={urlFor(item.mainImage.asset)
                .width(400)
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
              {item.title}
            </span>
            <!-- PUBLICATION DATE -->
            <span>
              {#if item.publicationDate}
                {@html formattedDate(item.publicationDate)}
              {/if}
            </span>
          </div>
          <!-- CONTENT -->
          {#if item.content?.content}
            <div class="paragraph">
              {@html renderBlockText(item.content.content)}
            </div>
          {/if}
          <!-- READ-MORE -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="read-more"
            on:click={_ => {
              openExtendedPost(item)
            }}
          >
            <ArrowRight />
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @import "../../../styles/variables.scss";

  .kadk-logo {
    width: 100%;
    margin-bottom: var(--margin-xs);
    img {
      display: block;
      width: 100%;
    }
  }

  .read-more {
    width: 20px;
    height: 42px;
    cursor: pointer;
  }

  .image {
    max-width: 100%;
    mix-blend-mode: multiply;
    max-height: 260px;
  }

  .news-item {
    position: relative;
    min-height: 80dvh;
    padding-bottom: calc(var(--margin) * 2);

    .content {
      background: var(--green);
    }

    .header {
      font-size: var(--font-size-small);
      border-top: var(--border-black);
      border-bottom: var(--border-black);
      padding-top: 4px;
      margin-bottom: var(--margin-xs);
    }
  }
</style>
