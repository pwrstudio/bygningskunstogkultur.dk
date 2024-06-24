<script lang="ts">
  import { fade } from "svelte/transition"
  import { calculateArticleReadingTime } from "$lib/modules/utils"
  import type { Article, Issue } from "$lib/types/sanity.types"
  import {
    tableOfContentsOpen,
    menuOpen,
    currentArticleSlug,
    newsExtended,
    activeMenuSection,
  } from "$lib/modules/stores"
  import { goto } from "$app/navigation"

  export let issue: Issue

  let scrollParent: HTMLElement | null = null
  let inTransition = false
  let show: boolean[] = new Array()

  function setNumeralMenuInSideBar(
    toc: Article[] | undefined,
    currentSlug: string | undefined,
    maxNumbers: number = 5,
  ) {
    if (!toc || !currentSlug) return

    let placed = 0

    // Make the current active index true
    show = toc.map(item => item.slug.current === currentSlug)
    placed++ // 1

    let activeIndex = show.indexOf(true)

    let direction = 1 // add

    while (placed < maxNumbers) {
      if (show[activeIndex + direction] === undefined) {
        direction = -1 * direction
      }

      let offset = 1
      while (show[activeIndex + offset * direction] === true) {
        offset++
      }

      if (show[activeIndex + offset * direction] === false) {
        show[activeIndex + offset * direction] = true
      }

      direction = -1 * direction

      placed++
    }
  }

  // Update the numeral mini menu when the current article changes
  $: setNumeralMenuInSideBar(issue.tableOfContents, $currentArticleSlug)

  // Scroll the ToC to top when it is closed
  $: if (
    (!$tableOfContentsOpen && scrollParent) ||
    (scrollParent && !activeMenuSection)
  ) {
    scrollParent.scrollTop = 0
  }

  const goToArticle = async (article: Article) => {
    goto("/" + issue.slug.current + "/" + article.slug.current)
    tableOfContentsOpen.set(false)
    menuOpen.set(false)
  }

  const gotToLandingPage = () => {
    goto("/")
  }

  const toggleToC = () => {
    inTransition = true
    tableOfContentsOpen.set(!$tableOfContentsOpen)
    newsExtended.set(false)
    setTimeout(() => {
      inTransition = false
    }, 200)
  }
</script>

{#if issue.tableOfContents && issue.tableOfContents.length > 0}
  <div
    bind:this={scrollParent}
    in:fade
    class="toc"
    class:disabled={inTransition}
    class:open={$tableOfContentsOpen}
    class:parentOpen={$menuOpen}
    class:parentExtended={$newsExtended}
  >
    <div class="toc-menu">
      <button class="toc-menu-item title-item link" on:click={gotToLandingPage}>
        ← TILBAGE TIL FORSIDE
      </button>
      {#each issue.tableOfContents as article, index}
        <button
          class="toc-menu-item title-item link"
          class:active={$currentArticleSlug === article.slug.current}
          on:click={e => {
            goToArticle(article)
          }}
        >
          <!-- TITLE -->
          <div class="title-text">
            <!-- ARROW MARKER -->
            {#if $currentArticleSlug === article.slug.current}
              <div class="arrow-marker">→</div>
            {/if}
            {`${index + 1}. `}
            {article.title}
          </div>
          <!-- AUTHOR -->
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
      <button
        class="toc-menu-item title-item link"
        on:click={e => {
          goto("/pdf/issue/" + issue.slug.current)
        }}
      >
        <div class="title-text pdf">Hent udgaven som PDF</div>
      </button>
    </div>

    <div class="toc-button">
      <button class="title indhold" on:click={toggleToC}>
        <span>INDHOLD</span>
      </button>
      <div class="bullets">
        <button class="bullet" on:click={gotToLandingPage}>⌂</button>
        {#each issue.tableOfContents as article, index}
          <button
            class="bullet"
            class:active={$currentArticleSlug === article.slug.current}
            class:dots={(!show[index] && index === 1) ||
              (!show[index] && index === show.length - 2)}
            class:hidden={!show[index] &&
              index !== 0 &&
              index !== show.length - 1}
            on:click={_ => {
              goToArticle(article)
            }}
          >
            {(!show[index] && index === 1) ||
            (!show[index] && index === show.length - 2)
              ? "..."
              : index + 1}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .toc {
    z-index: 1000;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: var(--extended-menu-width);
    line-height: var(--line-height);
    overflow: auto;
    padding: var(--margin);
    padding-right: var(--menu-side-width);
    padding-left: calc(var(--menu-difference) + 42px);
    padding-bottom: 32px;
    font-family: var(--sans-stack);
    font-size: var(--font-size-small);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    transition: transform 0.2s ease-out;
    user-select: none;
    transform: translateX(
      calc((-1 * var(--extended-menu-width)) + var(--menu-side-width))
    );
    height: 100vh;

    margin-left: var(--menu-side-width);
    padding-left: calc(var(--margin) / 2);
    background: var(--grey-solid);
    z-index: 999;
    pointer-events: initial;
    overflow: hidden;
    width: var(--menu-width);
    transform: translateX(
      calc((-1 * var(--menu-width)) + var(--menu-side-width))
    );

    @include screen-size("phone") {
      display: none;
    }

    &.disabled {
      pointer-events: none;
    }

    .toc-button {
      justify-content: start;

      .title-item {
        margin-bottom: var(--title-letter-spacing);
      }
    }

    &.open {
      overflow: scroll;
      transform: translateX(0);
    }

    &.parentOpen {
      transform: translateX(0);

      &.open {
        transform: translateX(calc(var(--menu-width) - var(--menu-side-width)));
      }
    }

    &.parentExtended {
      transform: translateX(260px);
    }

    .articleNumber {
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      writing-mode: unset;
      text-orientation: unset;
      line-height: 0;
      height: var(--title-letter-spacing);
      text-align: center;
      position: relative;

      &.active {
        &:after {
          top: 20px;
          left: -5px;
          height: 1.5px;
          width: 10px;
          content: "";
          display: block;
          position: absolute;
          background-color: var(--black);
        }
      }
    }
  }

  .title-text {
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .pdf {
    &:before {
      content: "→";
      display: inline-block;
      margin-right: 10px;
    }
  }

  .toc-button {
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0;
    padding: var(--margin) 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    letter-spacing: var(--title-letter-spacing);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: var(--menu-side-width);
    cursor: pointer;
    line-height: var(--line-height);

    .title {
      cursor: pointer;
      letter-spacing: var(--title-letter-spacing);
    }

    .bullets,
    .bullets .bullet {
      writing-mode: lr;
      text-orientation: unset;
      list-style-type: none;
      margin: 0;
      padding: 0;
      letter-spacing: 0;
      text-align: center;
    }

    .bullets {
      display: flex;
      flex-direction: column;

      .bullet {
        margin-top: 1em;
        margin-bottom: 1em;

        &.hidden {
          display: none;

          &.dots {
            display: inline-block;
          }
        }

        &.active {
          text-decoration: underline;
        }
      }
    }
  }

  .toc-menu-item {
    margin: 0;
    padding: 16px 0 12px;
    border-top: var(--border-black);
    cursor: pointer;
    display: block;
    width: 100%;
    font-size: var(--font-size-small);
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
  }

  .toc-menu {
    padding: 0;
    margin: 0;
    list-style-type: none;
    z-index: 10;
  }
</style>
