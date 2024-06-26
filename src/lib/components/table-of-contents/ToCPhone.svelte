<script lang="ts">
  import { onMount } from "svelte"
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { fade } from "svelte/transition"
  import { calculateArticleReadingTime } from "$lib/modules/utils"
  import {
    tableOfContentsOpen,
    menuOpen,
    currentArticleSlug,
    newsExtended,
    activeMenuSection,
  } from "$lib/modules/stores"
  import { goto } from "$app/navigation"

  export let issue: Issue

  let loaded = false
  let inTransition = false
  let scrollParent: HTMLElement | null = null

  // Scroll the ToC to top when it is closed
  $: if (
    (!$tableOfContentsOpen && scrollParent) ||
    (scrollParent && !activeMenuSection)
  ) {
    scrollParent.scrollTop = 0
  }

  const goToArticle = async (article: Article) => {
    await goto("/" + issue.slug.current + "/" + article.slug.current)
    tableOfContentsOpen.set(false)
  }

  const gotToLandingPage = () => {
    goto("/")
  }

  const toggleToC = () => {
    inTransition = true
    tableOfContentsOpen.set(!$tableOfContentsOpen)
    newsExtended.set(false)
    if ($tableOfContentsOpen && $menuOpen) {
      menuOpen.set(false)
    }
    setTimeout(() => {
      inTransition = false
    }, 200)
  }

  onMount(async () => {
    // Loading delay to avoid flickering
    await new Promise(resolve => setTimeout(resolve, 100))
    loaded = true
  })
</script>

{#if issue.tableOfContents && issue.tableOfContents.length > 0}
  <div
    in:fade
    bind:this={scrollParent}
    class="bar toc"
    class:loaded
    class:disabled={inTransition}
    class:open={$tableOfContentsOpen}
    class:peek={$menuOpen && !$activeMenuSection}
    class:parentOpen={$menuOpen && $activeMenuSection}
  >
    <!-- ToC TOGGLE -->
    <button class="toc-button" on:click={toggleToC}>INDHOLD</button>
    <div class="toc-menu">
      <!-- BACK BUTTON -->
      <button class="toc-menu-item title-item link" on:click={gotToLandingPage}>
        ← TILBAGE TIL FORSIDE
      </button>
      {#each issue.tableOfContents as article, index}
        <!-- MENU ITEMS -->
        <button
          class="toc-menu-item title-item link"
          class:active={$currentArticleSlug === article.slug.current}
          on:click={() => goToArticle(article)}
        >
          <div class="title-text">
            <!-- ARROW MARKER -->
            {#if $currentArticleSlug === article.slug.current}
              <div class="arrow-marker">→</div>
            {/if}
            {`${index + 1}. `}
            {article.title}
          </div>
          {#if article.author}
            <div class="author">
              {article.author}
            </div>
          {/if}
          <div class="reading-time">
            {calculateArticleReadingTime(article) + " min"}
          </div>
        </button>
      {/each}
      <!-- PDF BUTTON -->
      <button
        class="toc-menu-item title-item link"
        on:click={() => goto("/pdf/issue/" + issue.slug.current)}
      >
        <div class="title-text pdf">Hent udgaven som PDF</div>
      </button>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .toc {
    user-select: none;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    font-family: var(--sans-stack);
    font-size: var(--font-size-small);
    line-height: var(--line-height);
    height: calc(100dvh - var(--menu-side-width));
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--grey-solid);
    pointer-events: initial;
    overflow: hidden;
    transition:
      opacity 0.3s ease-out,
      transform 0.2s ease-out;
    z-index: 999;
    transform: translateY(calc(100% - var(--menu-side-width)));

    opacity: 0;
    &.loaded {
      opacity: 1;
    }

    button {
      font-family: var(--sans-stack);
      font-size: var(--font-size-small);
      color: var(--black);
    }

    &.disabled {
      pointer-events: none;
    }

    &.open {
      transform: translateY(0);
      overflow-y: auto;
    }

    &.peek {
      transform: translateY(calc(100% - var(--menu-items-height)));
    }

    &.parentOpen {
      transform: translateY(0);
    }

    .toc-button {
      box-sizing: border-box;
      letter-spacing: var(--title-letter-spacing);
      display: flex;
      justify-content: space-between;
      cursor: pointer;

      padding: 0 calc(var(--margin) / 4);
      width: 100%;
      height: var(--menu-side-width);
      writing-mode: horizontal-tb;
      align-items: flex-start;
      padding-bottom: 30px;
      line-height: var(--menu-side-width);

      .title {
        cursor: pointer;
      }

      .title-item {
        margin-bottom: var(--title-letter-spacing);

        &.indhold {
          text-align: center;
          width: 100%;
        }
      }
    }

    .toc-menu {
      margin: 0;
      list-style-type: none;
      z-index: 10;
      padding: 0 calc(var(--margin) / 4);

      .toc-menu-item {
        margin: 0;
        padding: 16px 0 12px;
        border-top: var(--border-black);
        cursor: pointer;
        display: block;
        width: 100%;
        line-height: var(--line-height);

        .arrow-marker {
          display: none;
        }

        &.active {
          .arrow-marker {
            margin-right: 10px;
            display: inline-block;
          }
        }

        .title-text {
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        &:last-child {
          border-bottom: none;
          padding-bottom: 56px;
        }
      }
    }
  }
</style>
