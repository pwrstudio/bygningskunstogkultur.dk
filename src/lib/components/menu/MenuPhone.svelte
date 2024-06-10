<script lang="ts">
  import type { News, Colophon, About } from "$lib/types/sanity.types"
  import { MenuSection } from "$lib/enums"
  import { onMount } from "svelte"

  import {
    menuOpen,
    tableOfContentsOpen,
    newsExtended,
  } from "$lib/modules/stores"

  import MenuNews from "$lib/components/menu/sections/MenuNews.svelte"
  import MenuAbout from "$lib/components/menu/sections/MenuAbout.svelte"
  import MenuColophon from "$lib/components/menu/sections/MenuColophon.svelte"
  import MailingListForm from "$lib/components/menu/MailingListForm.svelte"

  export let news: News[]
  export let about: About
  export let colophon: Colophon
  export let landing: Boolean = false

  let activeMenuSection: MenuSection = MenuSection.News
  let title = "XXX"
  let pvw = 0
  let vw: number
  let ih: number
  let el: HTMLElement

  $: {
    if (landing) {
      if (vw > 768 && !$menuOpen) {
        menuOpen.set(true)
      }
    }
  }

  const toggleMenu = () => {
    menuOpen.set(!$menuOpen)
    newsExtended.set(false)

    if (vw < 768 && $tableOfContentsOpen && $menuOpen) {
      tableOfContentsOpen.set(false)
    }

    // if ($menuOpen && vw >= 768) {
    //   if (!$menuItemActive) {
    //     menuItemActive.set("news")
    //   }
    // }

    // if (!$menuOpen) {
    //   menuItemActive.set(null)
    // }
  }

  // afterUpdate(() => {
  //   if (pvw < 768 && vw >= 768) {
  //     menuOpen.set(true)
  //   }
  //   pvw = vw
  // })

  onMount(() => {
    // $activeRoute will change on navigation
    // if ($activeRoute.uri === "/") {
    //   if (vw < 768) {
    //     menuOpen.set(false)
    //   }
    // }

    // Switch the menu to off if the vw is mobile size
    if (landing) {
      if (pvw >= 768 && vw < 768) {
        menuOpen.set(false)
      } else if (pvw < 768 && vw >= 768) {
        menuOpen.set(true)
      }
    }

    // Set previous vw to current vw
    pvw = vw
  })
</script>

<!-- WINDOW BINDINGS -->
<svelte:window bind:innerWidth={vw} bind:innerHeight={ih} />

<!-- class:peek={!$menuItemActive && vw < 768} -->
<div
  class="menu"
  class:open={$menuOpen}
  class:single={!landing}
  class:extended={$newsExtended}
  style="height: {ih + 'px'};"
>
  <!-- DESKTOP MENU -->
  {#if vw > 768}
    <!-- CONTENT -->
    <div class="menu-content" class:extended={$newsExtended} bind:this={el}>
      {#if activeMenuSection == MenuSection.News}
        <MenuNews {news} />
      {:else if activeMenuSection == MenuSection.About}
        <MenuAbout {about} />
      {:else if activeMenuSection == MenuSection.Colophon}
        <MenuColophon {colophon} />
      {/if}
    </div>

    <!-- BUTTON -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="menu-button"
      class:disabled={landing && vw > 768}
      on:click={e => {
        if ($newsExtended) {
          newsExtended.set(false)
        } else if (landing === false && vw > 768) {
          toggleMenu()
        }
      }}
    >
      <h1 class="title">Kort nyt</h1>
      <h1 class="title bottom">Info</h1>
    </div>
  {/if}

  <!-- SHARED -->
  {#if !$newsExtended}
    <!-- class:hidden={$menuItemActive !== null && vw <= 768} -->
    <ul class="menu-list">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="menu-item title"
        id="news"
        class:active={activeMenuSection == MenuSection.News}
        on:click={() => {
          activeMenuSection = MenuSection.News
        }}
      >
        På Instituttet
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="menu-item title"
        id="about"
        class:active={activeMenuSection == MenuSection.About}
        on:click={() => {
          activeMenuSection = MenuSection.About
        }}
      >
        Om magasinet
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="menu-item title"
        id="colophon"
        class:active={activeMenuSection == MenuSection.Colophon}
        on:click={() => {
          activeMenuSection = MenuSection.Colophon
        }}
      >
        Kolofon
      </li>
    </ul>
    {#if vw >= 768}
      <div class="newsletter-signup">
        <MailingListForm />
      </div>
    {/if}
  {/if}

  <!-- MOBILE MENU -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  {#if vw <= 768}
    <!-- CONTENT -->
    <div class="mobile-content">
      <!-- CONTENT -->
      <div class="menu-content" class:extended={$newsExtended} bind:this={el}>
        {#if activeMenuSection == MenuSection.News}
          <MenuNews {news} />
        {:else if activeMenuSection == MenuSection.About}
          <MenuAbout {about} />
        {:else if activeMenuSection == MenuSection.Colophon}
          <MenuColophon {colophon} />
        {/if}
      </div>
      <!-- TITLE -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- on:click|preventDefault={() => {
          menuItemActive.set(null)
        }} -->
      <div class="ticker">
        <div class="title">
          {title}
        </div>
      </div>
    </div>
    <!-- BUTTON -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="menu-button" on:click|preventDefault={toggleMenu}>
      <h1 class="title hamburger">
        <div class="hamburger-cross-icon" class:open={$menuOpen}>
          <span />
          <span />
          <span />
        </div>
      </h1>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .menu {
    z-index: 1000;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
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

    @include screen-size("phone") {
      bottom: 0;
      transform: translateY(calc(100% - var(--menu-side-width)));
      width: 100vw;
      padding: var(--menu-side-width) calc(var(--margin) / 4) 0;
    }

    background: var(--green);

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
      align-items: center;
      height: 100%;
      width: var(--menu-side-width);
      cursor: pointer;

      .title {
        cursor: pointer;
      }

      @include screen-size("phone") {
        padding: 0 calc(var(--margin) / 4);
        width: 100%;
        height: var(--menu-side-width);
        writing-mode: horizontal-tb;
        text-orientation: upright;
        align-items: flex-start;
      }

      .title:not(.title.hamburger) {
        display: inline-block;
        justify-self: flex-start;

        @include screen-size("phone") {
          display: none;
        }

        &.bottom {
          margin-bottom: calc(-1 * var(--title-letter-spacing));
        }
      }
    }

    .menu-item {
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

      &:last-child {
        @include screen-size("small") {
          border-bottom: none;
        }
      }
    }

    .mobile-content {
      max-height: 100%;
      display: flex;
      flex-flow: row;
      margin-right: -1 * var(--margin-xs); // hacky

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

      @include screen-size("phone") {
        transform: translate(0, 0);
      }

      &.single {
        @include screen-size("phone") {
          transform: translate(0, var(--menu-side-width));
        }
      }
    }

    &.extended {
      transform: translate(0, 0);
      padding-left: 42px;
      @include screen-size("phone") {
        padding-left: 12px;
      }
    }
  }

  .menu-button .menu-menu {
    padding: 0;
    margin: 0;
    list-style-type: none;
    z-index: 10;
  }

  .menu:not(.t-o-c) {
    box-shadow: 0px -20px 20px var(--green);
    @include screen-size("phone") {
      box-shadow: unset;
    }
  }

  .hamburger {
    display: none;

    @include screen-size("phone") {
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

  .newsletter-signup {
    margin: 0;
    padding-top: 3px;
    border-top: var(--border-black);
  }

  .menu-content {
    box-sizing: border-box;
    padding-bottom: 0;
    flex-shrink: 1;
    overflow-y: scroll;

    @include screen-size("phone") {
      margin-top: calc(var(--margin) / 4);
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
    box-shadow: 0px -20px 20px var(--green);
    @include screen-size("phone") {
      box-shadow: unset;
    }

    &.hidden {
      display: none;
    }
  }
</style>
