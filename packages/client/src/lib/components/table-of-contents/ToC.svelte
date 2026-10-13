<script lang="ts">
  import { fade } from "svelte/transition"
  import { goto } from "$app/navigation"
  import type { Article, Issue } from "$lib/types"
  import { calculateArticleReadingTime } from "$lib/modules/utils"
  import {
    tableOfContentsOpen,
    menuOpen,
    newsExtended,
    activeMenuSection,
  } from "$lib/modules/stores"

  let { issue, currentSlug }: { issue: Issue; currentSlug?: string } = $props()

  let scrollParent = $state<HTMLElement | null>(null)
  let inTransition = $state(false)

  /**
   * Which article numbers the sidebar shows: the current one plus neighbours,
   * added on alternating sides up to `maxNumbers`. The first and last numbers
   * are always shown; hidden runs collapse to "..." in the markup.
   */
  function visibleNumerals(
    toc: Article[] | undefined,
    slug: string | undefined,
    maxNumbers = 5,
  ): boolean[] {
    if (!toc || !slug) return []
    const show = toc.map((item) => item.slug.current === slug)
    const activeIndex = show.indexOf(true)
    let placed = 1
    let direction = 1
    while (placed < maxNumbers) {
      if (show[activeIndex + direction] === undefined) direction = -direction
      let offset = 1
      while (show[activeIndex + offset * direction] === true) offset++
      if (show[activeIndex + offset * direction] === false) {
        show[activeIndex + offset * direction] = true
      }
      direction = -direction
      placed++
    }
    return show
  }

  const show = $derived(visibleNumerals(issue.tableOfContents, currentSlug))

  // Scroll the list back to the top when the table of contents closes
  $effect(() => {
    if (scrollParent && (!$tableOfContentsOpen || !$activeMenuSection)) {
      scrollParent.scrollTop = 0
    }
  })

  const goToArticle = (article: Article) => {
    goto("/" + issue.slug.current + "/" + article.slug.current)
    tableOfContentsOpen.set(false)
    menuOpen.set(false)
  }

  const goToLandingPage = () => {
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
      <button class="toc-menu-item title-item link" onclick={goToLandingPage}>
        ← TILBAGE TIL FORSIDE
      </button>
      {#each issue.tableOfContents as article, index}
        <button
          class="toc-menu-item title-item link"
          class:active={currentSlug === article.slug.current}
          onclick={(e) => {
            goToArticle(article)
          }}
        >
          <!-- TITLE -->
          <div class="title-text">
            <!-- ARROW MARKER -->
            {#if currentSlug === article.slug.current}
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
        onclick={(e) => {
          goto("/pdf/issue/" + issue.slug.current)
        }}
      >
        <div class="title-text pdf">Hent udgaven som PDF</div>
      </button>
    </div>

    <div class="toc-button">
      <button class="title indhold" onclick={toggleToC}>
        <span>INDHOLD</span>
      </button>
      <div class="bullets">
        <button class="bullet" onclick={goToLandingPage}>⌂</button>
        {#each issue.tableOfContents as article, index}
          <button
            class="bullet"
            class:active={currentSlug === article.slug.current}
            class:dots={(!show[index] && index === 1) ||
              (!show[index] && index === show.length - 2)}
            class:hidden={!show[index] &&
              index !== 0 &&
              index !== show.length - 1}
            onclick={(_) => {
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
  @use "../../styles/variables.scss" as *;

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
    height: 100dvh;

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
      width: 100%;
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
      width: 100%;
    }

    .bullets {
      display: flex;
      flex-direction: column;

      .bullet {
        padding-top: 1em;
        padding-bottom: 1em;
        cursor: pointer;
        font-size: var(--font-size-small);

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
