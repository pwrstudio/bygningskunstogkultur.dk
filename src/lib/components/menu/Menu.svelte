<script lang="ts">
  import type { News, Colophon, About } from "$lib/types/sanity.types"
  import { MenuSection, PageType } from "$lib/enums"

  import {
    menuOpen,
    newsExtended,
    windowWidth,
    screenSizePhone,
    activeMenuSection,
  } from "$lib/modules/stores"

  import MenuNews from "$lib/components/menu/sections/MenuNews.svelte"
  import MenuAbout from "$lib/components/menu/sections/MenuAbout.svelte"
  import MenuColophon from "$lib/components/menu/sections/MenuColophon.svelte"
  import MailingListForm from "$lib/components/menu/MailingListForm.svelte"

  export let news: News[]
  export let about: About
  export let colophon: Colophon
  export let pageType: PageType

  let menuContentElement: HTMLDivElement

  // Default to showing news section
  activeMenuSection.set(MenuSection.News)

  $: if (!$screenSizePhone && pageType === PageType.Landing) {
    menuOpen.set(true)
  }

  const changeMenuSection = (section: MenuSection) => {
    activeMenuSection.set(section)
    scrollToTop()
  }

  const handleSidebarClick = () => {
    if ($newsExtended) {
      newsExtended.set(false)
    } else if (pageType !== PageType.Landing && $windowWidth > 768) {
      // Disable closing the menu on landing page
      toggleMenu()
    }
  }

  const scrollToTop = () => {
    menuContentElement.scrollTo(0, 0)
  }

  const toggleMenu = () => {
    menuOpen.set(!$menuOpen)
    newsExtended.set(false)

    if ($menuOpen) {
      activeMenuSection.set(MenuSection.News)
    }
  }
</script>

<div class="menu" class:open={$menuOpen} class:extended={$newsExtended}>
  <!-- CONTENT -->
  <div class="menu-content" bind:this={menuContentElement}>
    {#if $activeMenuSection == MenuSection.News}
      <MenuNews {news} on:scrollToTop={scrollToTop} />
    {:else if $activeMenuSection == MenuSection.About}
      <MenuAbout {about} />
    {:else if $activeMenuSection == MenuSection.Colophon}
      <MenuColophon {colophon} />
    {/if}
  </div>

  <!-- MENU SIDEBAR -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="menu-side"
    class:disabled={pageType === PageType.Landing && $windowWidth > 768}
    on:click={handleSidebarClick}
  >
    <h1 class="title">Kort nyt</h1>
    <h1 class="title bottom">Info</h1>
  </div>

  {#if !$newsExtended}
    <!-- MENU LIST -->
    <ul class="menu-list">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="menu-item title"
        id="news"
        class:active={$activeMenuSection == MenuSection.News}
        on:click={() => {
          changeMenuSection(MenuSection.News)
        }}
      >
        På Instituttet
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="menu-item title"
        id="about"
        class:active={$activeMenuSection == MenuSection.About}
        on:click={() => {
          changeMenuSection(MenuSection.About)
        }}
      >
        Om magasinet
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        class="menu-item title"
        id="colophon"
        class:active={$activeMenuSection == MenuSection.Colophon}
        on:click={() => {
          changeMenuSection(MenuSection.Colophon)
        }}
      >
        Kolofon
      </li>
    </ul>

    <!-- NEWSLETTER FORM -->
    <div class="newsletter-signup">
      <MailingListForm />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .menu {
    z-index: 100000;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: var(--extended-menu-width);
    line-height: var(--line-height);
    overflow: hidden; // Ensure no overflow issues
    padding-top: var(--margin);
    padding-right: var(--menu-side-width);
    padding-left: calc(var(--menu-difference) + 42px);
    padding-bottom: 32px;
    font-family: var(--sans-stack);
    font-size: var(--font-size-small);
    display: flex;
    flex-direction: column; // Set flex direction to column
    transition: transform 0.2s ease-out;
    user-select: none;
    transform: translateX(
      calc((-1 * var(--extended-menu-width)) + var(--menu-side-width))
    );
    background: var(--green);

    @include screen-size("phone") {
      display: none;
    }

    &.open {
      transform: translate(calc(-1 * var(--menu-difference)), 0);
    }

    &.extended {
      transform: translate(0, 0);
      padding-left: 42px;
      @include screen-size("phone") {
        padding-left: 12px;
      }
    }
  }

  .menu-content {
    box-sizing: border-box;
    padding-bottom: 42px;
    flex-grow: 1; // Allow it to take up remaining space
    flex-shrink: 1; // Allow it to shrink if needed
    overflow-y: auto; // Allow vertical scrolling if content overflows

    :global(p.normal) {
      font-size: var(--font-size-small);
      line-height: var(--line-height-small);
    }
  }

  .menu-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: calc(var(--menu-width) - 84px);
    z-index: 10;
    box-shadow: 0px -20px 20px var(--green);
    flex-shrink: 0;

    .menu-item {
      margin: 0;
      padding: 16px 0 12px;
      border-top: var(--border-black);
      cursor: pointer;

      &.active {
        &:before {
          content: "→";
          margin-right: 10px;
          display: inline;
        }
      }
    }

    &.hidden {
      display: none;
    }
  }

  .newsletter-signup {
    margin: 0;
    padding-top: 3px;
    border-top: var(--border-black);
    flex-shrink: 0; // Do not allow it to shrink
  }

  .menu-side {
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
      display: inline-block;
      justify-self: flex-start;

      &.bottom {
        margin-bottom: calc(-1 * var(--title-letter-spacing));
      }
    }
  }
</style>
