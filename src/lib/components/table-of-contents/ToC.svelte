<script lang="ts">
  import { fade } from "svelte/transition"
  import { tick } from "svelte"
  import { scrollBack } from "$lib/modules/utils"
  import { calculateArticleReadingTime } from "$lib/modules/utils"
  import type { Article, Issue } from "$lib/types/sanity.types"

  export let issue: Issue

  import {
    tableOfContentsActive,
    menuActive,
    currentArticleSlug,
    newsExtended,
  } from "$lib/modules/stores"
  import { goto } from "$app/navigation"

  // let vw = window.innerWidth
  // let ih = window.innerHeight

  let inTransition = false
  let vw = 0
  let ih = 0

  let scrollParent: HTMLElement | null = null
  let show = new Array()
  let peek = false

  // $: {
  //   peek = !$menuItemActive && vw < 768
  // }

  $: {
    if (issue.tableOfContents) {
      const max = 5
      // const max = Math.min(5, $tableOfContents.length)
      let placed = 0

      // Make the current active index true
      show = issue.tableOfContents.map(item => {
        return item.slug.current === $currentArticleSlug
      }) // e.g. [false, false, true, false, false]
      placed++ // 1

      let activeIndex = show.indexOf(true)

      let direction = 1 // add

      while (placed < max) {
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

        // You're done, kiddo
        placed++
      }
    }
  }

  $: {
    if ((!$tableOfContentsActive && scrollParent) || (scrollParent && peek)) {
      console.log("reset")
      scrollParent.scrollTop = 0
    }
  }

  const goToArticle = async (article: Article) => {
    const destination = "/" + issue.slug.current + "/" + article.slug.current
    if (scrollParent) {
      scrollBack(scrollParent, 0)
    }
    await tick()
    console.log(destination)
    goto(destination)
  }

  const goToLandingPage = () => {
    goto("/")
  }

  const toggleToC = () => {
    inTransition = true
    tableOfContentsActive.set(!$tableOfContentsActive)
    newsExtended.set(false)
    if (vw < 768 && $tableOfContentsActive && $menuActive) {
      menuActive.set(false)
    }
    setTimeout(() => {
      inTransition = false
    }, 200)
  }
</script>

<!-- WINDOW BINDINGS -->
<svelte:window bind:innerWidth={vw} bind:innerHeight={ih} />

{#if issue.tableOfContents && issue.tableOfContents.length > 0}
  <div
    in:fade
    bind:this={scrollParent}
    class="toc"
    class:disabled={inTransition}
    class:open={$tableOfContentsActive}
    class:peek
    class:parentOpen={$menuActive}
    class:parentExtended={$newsExtended}
  >
    <ul class="toc-menu t-o-c">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li class="toc-menu-item title-item link" on:click={goToLandingPage}>
        TILBAGE TIL FORSIDE
      </li>
      {#each issue.tableOfContents as article, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li
          class="toc-menu-item title-item link"
          class:active={$currentArticleSlug === article.slug.current}
          on:click={e => {
            goToArticle(article)
          }}
        >
          <div class="title-text">
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
        </li>
      {/each}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="toc-menu-item title-item link"
        on:click={e => {
          goto("/pdf-issue/" + issue.slug.current)
        }}
      >
        <div class="title-text pdf">Hent udgaven som PDF</div>
      </li>
    </ul>

    <div class="toc-button">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <h1 class="title indhold" on:click={toggleToC}>
        <span>INDHOLD</span>
      </h1>
      <ul class="bullets">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li class="bullet" on:click={goToLandingPage}>⌂</li>
        {#each issue.tableOfContents as article, index}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <li
            class="bullet"
            class:active={$currentArticleSlug === article.slug.current}
            class:dots={(!show[index] && index === 1) ||
              (!show[index] && index === show.length - 2)}
            class:hidden={!show[index] &&
              index !== 0 &&
              index !== show.length - 1}
            on:click={e => {
              const destination =
                "/" + issue.slug.current + "/" + article.slug.current
              goto(destination)
            }}
          >
            {(!show[index] && index === 1) ||
            (!show[index] && index === show.length - 2)
              ? "..."
              : index + 1}
          </li>
        {/each}
      </ul>
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
      .bullet {
        margin-bottom: var(--title-letter-spacing);

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
      display: inline-block;
      content: "→";
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

    @include screen-size("phone") {
      padding: 0 calc(var(--margin) / 4);
      width: 100%;
      height: var(--menu-side-width);
      writing-mode: horizontal-tb;
      text-orientation: upright;
      align-items: flex-start;
    }

    .title {
      cursor: pointer;
    }
  }

  .toc-menu-item {
    margin: 0;
    padding: 16px 0 12px;
    border-top: var(--border-black);
    cursor: pointer;

    &.active {
      &:before {
        content: "→";
        margin-right: 10px;
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
