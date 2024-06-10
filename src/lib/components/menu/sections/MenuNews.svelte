<script lang="ts">
  import type { News } from "$lib/types/sanity.types"
  export let news = [] as News[]

  import { renderBlockText, urlFor } from "$lib/modules/sanity"
  import { formattedDate } from "$lib/modules/utils"
  import { isArray, has } from "lodash-es"

  import ArrowRight from "$lib/components/graphics/ArrowRight.svelte"
  import ArrowLeft from "$lib/components/graphics/ArrowLeft.svelte"
  import Share from "$lib/components/share/Share.svelte"

  let el: HTMLElement
  let vh: number
  let vw: number

  const closeExtendedNews = () => {
    let targetNewsItem = $extendedPost.slug.current
    extendedPost.set({})
    newsExtended.set(false)
    window.setTimeout(() => {
      let targetNewsItemEl = document.querySelector(`#${targetNewsItem}`)
      if (targetNewsItemEl) {
        targetNewsItemEl.scrollIntoView({
          block: "start",
        })
      }
    }, 200)
  }

  import {
    tableOfContentsOpen,
    newsExtended,
    extendedPost,
  } from "$lib/modules/stores"
</script>

<svelte:window bind:innerHeight={vh} bind:innerWidth={vw} />

<div class:extended={$newsExtended} bind:this={el}>
  <!-- LOGO -->
  {#if $newsExtended}
    <div class="news-item">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="close-extended" on:click={closeExtendedNews}>
        <ArrowLeft />
      </div>
      <div class="content">
        {#if $extendedPost.mainImage?.asset}
          <img
            class="image"
            alt={$extendedPost.title}
            src={urlFor($extendedPost.mainImage.asset)
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
            {$extendedPost.title}
          </span>
          <!-- PUBLICATION DATE -->
          <span>
            {#if $extendedPost.publicationDate}
              {@html formattedDate($extendedPost.publicationDate)}
            {/if}
          </span>
        </div>
        <!-- SHARE -->
        <div class="share">
          <!-- SHARING
          <Share /> -->
        </div>
        <!-- CONTENT -->
        {#if has($extendedPost, "extendedContent.content") && isArray($extendedPost.extendedContent.content)}
          <div class="paragraph">
            {@html renderBlockText($extendedPost.extendedContent.content)}
          </div>
        {:else if has($extendedPost, "content.content") && isArray($extendedPost.content.content)}
          <div class="paragraph">
            {@html renderBlockText($extendedPost.content.content)}
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="kadk-logo">
      <img alt="logo" src="/img/logo.svg" />
    </div>
    {#each news as item}
      <div class="news-item" id={item.slug.current}>
        <div
          class="content"
          style="min-height: {vw >= 768 ? vh - 200 + 'px' : 'auto'}"
        >
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
            on:click={e => {
              extendedPost.set(item)
              tableOfContentsOpen.set(false)
              newsExtended.set(true)
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
    // background: red;
    cursor: pointer;
  }

  .image {
    max-width: 100%;
    mix-blend-mode: multiply;
    max-height: 260px;
  }

  .news-item {
    position: relative;
    min-height: 100%;
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
