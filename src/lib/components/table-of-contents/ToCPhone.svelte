<script lang="ts">
  import { fade } from "svelte/transition"
  import { tick } from "svelte"
  import { get } from "lodash-es"
  import { scrollBack } from "$lib/modules/utils"
  import { calculateArticleReadingTime } from "$lib/modules/utils"

  let inTransition = false

  import {
    tableOfContentsOpen,
    tableOfContents,
    menuOpen,
    hash,
    currentArticleSlug,
    currentIssueSlug,
    newsExtended,
  } from "$lib/modules/stores"

  // let vw = window.innerWidth
  // let ih = window.innerHeight

  let vw = 0
  let ih = 0

  let scrollParent: HTMLElement | null = null
  let show = new Array()
  let peek = false

  // $: {
  //   peek = !$menuItemActive && vw < 768
  // }

  $: {
    if (!!$tableOfContents) {
      // console.log($tableOfContents)
      const max = 5
      // const max = Math.min(5, $tableOfContents.length)
      let placed = 0

      // Make the current active index true
      show = $tableOfContents.map(item => {
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
    if ((!$tableOfContentsOpen && scrollParent) || (scrollParent && peek)) {
      // console.log("reset")
      // scrollParent.scrollTop = 0
    }
  }

  const goToArticle = async article => {
    const destination =
      "/" + $currentIssueSlug + "/" + get(article, "slug.current", "")

    scrollBack(scrollParent, 0)
    await tick()
    // console.log(destination)
    // navigate(destination)
  }

  const toggleToC = () => {
    inTransition = true
    tableOfContentsOpen.set(!$tableOfContentsOpen)
    newsExtended.set(false)
    if (vw < 768 && $tableOfContentsOpen && $menuOpen) {
      menuOpen.set(false)
    }
    setTimeout(() => {
      inTransition = false
    }, 200)
  }
</script>

<!-- WINDOW BINDINGS -->
<svelte:window bind:innerWidth={vw} bind:innerHeight={ih} />

{#if $tableOfContents}
  <div
    in:fade
    bind:this={scrollParent}
    class="bar toc"
    class:disabled={inTransition}
    class:open={$tableOfContentsOpen}
    class:peek
    class:parentOpen={$menuOpen}
    class:parentExtended={$newsExtended}
    style="height: {ih + 'px'};"
  >
    <ul class="bar-menu t-o-c">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="bar-menu-item title-item link"
        on:click={e => {
          navigate("/")
        }}
      >
        TILBAGE TIL FORSIDE
      </li>
      {#each $tableOfContents as article, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li
          class="bar-menu-item title-item link"
          class:active={$currentArticleSlug ===
            get(article, "slug.current", "")}
          on:click={e => {
            goToArticle(article)
          }}
        >
          <div class="title-text">
            {`${index + 1}. `}
            {get(article, "title", "")}
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
        class="bar-menu-item title-item link"
        on:click={e => {
          window.location = "/pdf-issue/" + $currentIssueSlug
        }}
      >
        <div class="title-text pdf">Hent udgaven som PDF</div>
      </li>
    </ul>

    {#if vw < 768}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="bar-button" on:click={toggleToC}>
        <h1 class="title indhold">
          <span> INDHOLD </span>
        </h1>
        {#each $tableOfContents as article, index}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <h1
            class="title articleNumber"
            class:active={$hash === get(article, "slug.current", "")}
            on:click={e => {
              // console.log("nav")
              navigate(
                "/" +
                  $currentIssueSlug +
                  "/" +
                  get(article, "slug.current", ""),
              )
            }}
          >
            <span>{index + 1}</span>
          </h1>
        {/each}
      </div>
    {:else}
      <div class="bar-button">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <h1 class="title indhold" on:click={toggleToC}>
          <span> INDHOLD </span>
        </h1>
        <ul class="bullets">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <li
            class="bullet"
            on:click={e => {
              // console.log("nav")
              navigate("/")
            }}
          >
            ⌂
          </li>
          {#each $tableOfContents as article, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
              class="bullet"
              class:active={$currentArticleSlug ===
                get(article, "slug.current", "")}
              class:dots={(!show[index] && index === 1) ||
                (!show[index] && index === show.length - 2)}
              class:hidden={!show[index] &&
                index !== 0 &&
                index !== show.length - 1}
              on:click={e => {
                navigate(
                  "/" +
                    $currentIssueSlug +
                    "/" +
                    get(article, "slug.current", ""),
                )
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
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .toc {
    margin-left: $menu_button_width;
    padding-left: calc(var(--margin) / 2);
    background: var(--grey-solid);
    z-index: 999;
    pointer-events: initial;
    overflow: hidden;
    width: $menu-width;
    transform: translateX((-1 * $menu-width) + $menu_button_width);

    &.disabled {
      pointer-events: none;
    }

    .bar-menu-item {
      &:last-child {
        @include screen-size("small") {
          border-bottom: none;
          padding-bottom: 56px;
        }
      }
    }

    @include screen-size("phone") {
      margin-left: unset;
      padding-left: unset;
      width: 100%;
      transform: translateY(100%) translateY(-2 * $menu_button_width);
      height: auto;
      padding: var(--margin) calc(var(--margin) / 4) 0;
    }

    .bar-button {
      justify-content: start;

      .title-item {
        margin-bottom: var(--title-letter-spacing);

        &:not(.indhold) {
          @include screen-size("phone") {
            display: none;
          }
        }

        &.indhold {
          @include screen-size("phone") {
            text-align: center;
            width: 100%;
          }
        }
      }
    }

    &.open {
      overflow: scroll;
      transform: translateX(0);

      @include screen-size("phone") {
        transform: translateY(0);
      }
    }

    &.parentOpen {
      transform: translateX(0);

      &.open {
        transform: translateX($menu_width - $menu_button_width);
      }

      @include screen-size("phone") {
        &.open {
          transform: translateX(0);
        }

        &.peek {
          transform: translate(
            0,
            calc(100% - var(--menu-items-height) - var(--menu-items-width))
          ) !important;
        }
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
</style>
