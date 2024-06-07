<script lang="ts">
  import type { News, Colophon, About } from "$lib/types/sanity.types"
  import { MenuSection } from "$lib/enums"
  import { onMount } from "svelte"

  import { menuActive, newsExtended } from "$lib/modules/stores"

  import MenuNews from "$lib/components/menu/MenuNews.svelte"
  import MenuAbout from "$lib/components/menu/MenuAbout.svelte"
  import MenuColophon from "$lib/components/menu/MenuColophon.svelte"
  import MailingListForm from "$lib/components/menu/MailingListForm.svelte"

  export let news: News[]
  export let about: About
  export let colophon: Colophon
  export let landing: Boolean = false

  let activeMenuSection: MenuSection = MenuSection.News
  let vw: number
  let ih: number

  $: {
    if (landing) {
      menuActive.set(true)
    }
  }

  const toggleMenu = () => {
    menuActive.set(!$menuActive)
    newsExtended.set(false)

    // if (vw < 768 && $tableOfContentsActive && $menuActive) {
    //   tableOfContentsActive.set(false)
    // }

    // if ($menuActive && vw >= 768) {
    //   if (!$menuItemActive) {
    //     menuItemActive.set("news")
    //   }
    // }

    // if (!$menuActive) {
    //   menuItemActive.set(null)
    // }
  }

  // afterUpdate(() => {
  //   if (pvw < 768 && vw >= 768) {
  //     menuActive.set(true)
  //   }
  //   pvw = vw
  // })

  onMount(() => {
    // $activeRoute will change on navigation
    // if ($activeRoute.uri === "/") {
    //   if (vw < 768) {
    //     menuActive.set(false)
    //   }
    // }
    // Switch the menu to off if the vw is mobile size
    // if (landing) {
    //   if (pvw >= 768 && vw < 768) {
    //     menuActive.set(false)
    //   } else if (pvw < 768 && vw >= 768) {
    //     menuActive.set(true)
    //   }
    // }
    // Set previous vw to current vw
    // pvw = vw
  })
</script>

<!-- WINDOW BINDINGS -->
<svelte:window bind:innerWidth={vw} bind:innerHeight={ih} />

<!-- class:peek={!$menuItemActive && vw < 768} -->
<div class="menu" class:open={$menuActive} class:extended={$newsExtended}>
  <!-- CONTENT -->
  <div class="menu-content">
    {#if activeMenuSection == MenuSection.News}
      <MenuNews {news} />
    {:else if activeMenuSection == MenuSection.About}
      <MenuAbout {about} />
    {:else if activeMenuSection == MenuSection.Colophon}
      <MenuColophon {colophon} />
    {/if}
  </div>

  <!-- MENU SIDEBAR -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="menu-side"
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

  <!-- MENU LIST -->
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

  <!-- NEWSLETTER FORM -->
  <div class="newsletter-signup">
    <MailingListForm />
  </div>
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
    line-height: $line-height;
    overflow: hidden; // Ensure no overflow issues
    padding-top: $margin;
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

    &.open {
      transform: translate(-$menu-difference, 0);

      &.peek {
        transform: translate(0, calc(100% - #{$menu_items_height})) !important;
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
    padding: $margin 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    letter-spacing: var(--title-letter-spacing);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: $menu_button_width;
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
