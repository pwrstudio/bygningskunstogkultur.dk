<script lang="ts">
  import type { Snippet } from "svelte"
  import { page } from "$app/state"
  import type { LayoutData } from "./$types"
  import { PageType } from "#lib/enums/index.js"
  import Menu from "#lib/components/menu/Menu.svelte"
  import MenuPhone from "#lib/components/menu/MenuPhone.svelte"
  import ToC from "#lib/components/table-of-contents/ToC.svelte"
  import ToCPhone from "#lib/components/table-of-contents/ToCPhone.svelte"
  import ConsentBanner from "#lib/components/consent/ConsentBanner.svelte"
  import { getPageType } from "#lib/modules/utils/index.js"
  import {
    menuOpen,
    tableOfContentsOpen,
    windowHeight,
    windowWidth,
    screenSizePhone,
  } from "#lib/modules/stores/index.js"

  let { data, children }: { data: LayoutData; children?: Snippet } = $props()
  const { colophon, news, about } = $derived(data)

  // Window dimensions, mirrored into stores for the components that lay out by them
  let innerWidth = $state(0)
  let innerHeight = $state(0)
  $effect(() => {
    windowWidth.set(innerWidth)
  })
  $effect(() => {
    windowHeight.set(innerHeight)
  })

  const NoMenuPages = [PageType.News, PageType.Pdf, PageType.Error]
  const pageType = $derived(getPageType(page.route?.id ?? ""))

  // The issue and article of the current page, if any (see App.PageData)
  const issue = $derived(page.data.issue)

  const currentSlug = $derived(page.data.article?.slug.current)

  // Close the table of contents when navigating to an article
  $effect(() => {
    if (pageType === PageType.Article) tableOfContentsOpen.set(false)
  })

  const closeMenu = () => {
    if ($menuOpen) menuOpen.set(false)
  }
</script>

<!-- Listen to changes to window dimensions -->
<svelte:window bind:innerWidth bind:innerHeight />

<!-- 
  - Hide both menu and ToC for news and pdf pages
  - Show ToC when the page belongs to an issue (ie. we are on an article page)
  - Show mobile menu and Toc component if on phone
-->
{#if !NoMenuPages.includes(pageType)}
  {#if $screenSizePhone}
    <MenuPhone {news} {about} {colophon} {pageType} />
  {:else}
    <Menu {news} {about} {colophon} {pageType} />
  {/if}
  {#if issue}
    {#if $screenSizePhone}
      <ToCPhone {issue} {currentSlug} />
    {:else}
      <ToC {issue} {currentSlug} />
    {/if}
  {/if}
{/if}

{#if $screenSizePhone && $menuOpen}
  <button class="pseudo" aria-label="Close menu" onclick={closeMenu}></button>
{/if}

{@render children?.()}

<!-- Keep the cookie banner off the print pages -->
{#if pageType !== PageType.Pdf}
  <ConsentBanner />
{/if}

<style lang="scss">
  @use "../lib/styles/variables.scss" as *;

  .pseudo {
    background: transparent;
    border: 0;
    outline: none;
    position: fixed;
    width: 100dvw;
    height: 100dvh;
    z-index: 10;
    top: 0;
    left: 0;
  }
</style>
