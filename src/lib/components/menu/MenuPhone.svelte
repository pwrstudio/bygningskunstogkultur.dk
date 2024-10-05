<script lang="ts">
  import type { News, Colophon, About } from "$lib/types/sanity.types"
  import { MenuSection, PageType } from "$lib/enums"
  import {
    menuOpen,
    tableOfContentsOpen,
    newsExtended,
    activeMenuSection,
  } from "$lib/modules/stores"

  import MenuNews from "$lib/components/menu/sections/MenuNews.svelte"
  import MenuAbout from "$lib/components/menu/sections/MenuAbout.svelte"
  import MenuColophon from "$lib/components/menu/sections/MenuColophon.svelte"

  export let news: News[]
  export let about: About
  export let colophon: Colophon
  export let pageType: PageType

  let menuContentElement: HTMLDivElement

  // Menu should be closed on landing page on phone
  $: if (pageType === PageType.Landing) {
    menuOpen.set(false)
  }

  const scrollToTop = () => {
    menuContentElement.scrollTo(0, 0)
  }

  const toggleMenu = () => {
    menuOpen.set(!$menuOpen)
    // Reset menu
    newsExtended.set(false)
    activeMenuSection.set(MenuSection.None)

    if ($tableOfContentsOpen && $menuOpen) {
      tableOfContentsOpen.set(false)
    }
  }
</script>

<div
  class="menu"
  class:open={$menuOpen}
  class:peek={!$activeMenuSection}
  class:single={pageType !== PageType.Landing}
  class:extended={$newsExtended}
>
  <!-- SHARED -->
  {#if $activeMenuSection === MenuSection.None && !$newsExtended}
    <div class="menu-list">
      <button
        class="menu-item title"
        on:click={() => {
          activeMenuSection.set(MenuSection.News)
        }}
      >
        På Instituttet
      </button>
      <button
        class="menu-item title"
        on:click={() => {
          activeMenuSection.set(MenuSection.About)
        }}
      >
        Om magasinet
      </button>
      <button
        class="menu-item title"
        on:click={() => {
          activeMenuSection.set(MenuSection.Colophon)
        }}
      >
        Kolofon
      </button>
    </div>
  {/if}

  <!-- MOBILE MENU -->
  <!-- CONTENT -->
  <div class="mobile-content">
    <!-- CONTENT -->
    <div
      class="menu-content"
      class:extended={$newsExtended}
      bind:this={menuContentElement}
    >
      {#if $activeMenuSection == MenuSection.News}
        <MenuNews {news} on:scrollToTop={scrollToTop} />
      {:else if $activeMenuSection == MenuSection.About}
        <MenuAbout {about} />
      {:else if $activeMenuSection == MenuSection.Colophon}
        <MenuColophon {colophon} />
      {/if}
    </div>
    <!-- TITLE -->
    <div class="ticker">
      <div class="title">
        {$activeMenuSection}
      </div>
    </div>
  </div>
  <!-- HAMBURGER / CLOSE-->
  <button class="menu-button" on:click={toggleMenu}>
    <h1 class="title hamburger">
      <div class="hamburger-cross-icon" class:open={$menuOpen}>
        <span />
        <span />
        <span />
      </div>
    </h1>
  </button>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .menu {
    z-index: 1000;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    height: 100dvh;
    line-height: var(--line-height);
    overflow: auto;
    padding-right: var(--menu-side-width);
    padding-left: calc(var(--menu-difference) + 42px);
    font-family: var(--sans-stack);
    font-size: var(--font-size-small);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    transition: transform 0.2s ease-out;
    user-select: none;

    top: 0;
    transform: translateY(calc(100dvh - var(--menu-side-width)));
    width: 100dvw;
    padding: var(--menu-side-width) calc(var(--margin) / 4) 0;

    background: var(--green);

    button {
      font-family: var(--sans-stack);
      font-size: var(--font-size-small);
      color: var(--black);
    }

    :global(p.normal) {
      font-size: var(--font-size-small);
      line-height: var(--line-height-small);
    }

    .menu-button {
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
      height: 100%;
      cursor: pointer;

      padding: 0 calc(var(--margin) / 4);
      width: 100%;
      height: var(--menu-side-width);
      writing-mode: horizontal-tb;
      text-orientation: upright;
      align-items: flex-start;

      .title {
        cursor: pointer;
      }

      .title:not(.title.hamburger) {
        display: none;
      }
    }

    .menu-item {
      margin: 0;
      padding: 16px 0 12px;
      border-top: var(--border-black);
      cursor: pointer;
      display: block;
      width: 100%;

      &.active {
        &:before {
          content: "→";
          margin-right: 10px;
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }

    .mobile-content {
      max-height: 100%;
      display: flex;
      flex-flow: row;
      margin-right: calc(-1 * var(--margin-xs)); // hacky

      .ticker {
        min-width: var(--margin);
        position: relative;

        .title {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, 0);
          display: block;
          margin: 0 auto;
          padding: var(--margin) 0;
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: var(--title-letter-spacing);
        }
      }
    }

    &.open {
      transform: translate(-var(--menu-difference), 0);

      &.peek {
        transform: translate(
          0,
          calc(100% - var(--menu-items-height))
        ) !important;
      }

      transform: translate(0, 0);

      &.single {
        transform: translate(0, var(--menu-side-width));
      }
    }

    &.extended {
      transform: translate(0, 0);
      padding-left: 12px;
    }
  }

  .menu-button .menu-menu {
    padding: 0;
    margin: 0;
    list-style-type: none;
    z-index: 10;
  }

  .hamburger {
    width: 100%;
    color: inherit;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-align: right;
    display: inline-block;

    &:hover {
      color: var(--grey-solid);
    }

    &:active {
      color: var(--grey-solid);
    }

    .hamburger-cross-icon {
      width: 32px;
      margin-top: 2px;
      position: relative;
      float: right;
      transform: rotate(0deg);

      span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: var(--black);
        opacity: 1;
        left: 0;
        transform: rotate(0deg);

        &:nth-child(1) {
          top: 0px;
          transform-origin: left center;
        }

        &:nth-child(2) {
          top: 9px;
          transform-origin: left center;
        }

        &:nth-child(3) {
          top: 18px;
          transform-origin: left center;
        }
      }

      &.open {
        transform: translateX(8px);

        span:nth-child(1) {
          transform: rotate(45deg);
        }

        span:nth-child(2) {
          width: 0%;
          opacity: 0;
        }

        span:nth-child(3) {
          transform: rotate(-45deg);
          top: 22px;
          left: 0;
        }
      }
    }
  }

  .menu-content {
    box-sizing: border-box;
    padding-bottom: 0;
    flex-shrink: 1;
    overflow-y: scroll;
    margin-top: calc(var(--margin) / 4);

    .image {
      max-width: 100%;
      mix-blend-mode: multiply;
      max-height: 260px;
    }

    .news-item {
      position: relative;
      min-height: 100dvh;
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

    &.extended {
      .image {
        mix-blend-mode: unset;
        max-height: 500px;
        width: 100%;
        object-fit: cover;
      }

      .share {
        float: right;
        padding-left: 10px;
      }

      .news-item {
        padding-left: 42px;

        .close-extended {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 42px;
          cursor: pointer;
        }
      }
    }
  }

  .menu-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    z-index: 10;
    box-shadow: unset;

    &.hidden {
      display: none;
    }
  }
</style>
