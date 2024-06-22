<script lang="ts">
  import { page } from "$app/stores"
  import { PageType } from "$lib/enums"
  import type { News, About, Colophon } from "$lib/types/sanity.types"
  import Menu from "$lib/components/menu/Menu.svelte"
  import MenuPhone from "$lib/components/menu/MenuPhone.svelte"
  import ToC from "$lib/components/table-of-contents/ToC.svelte"
  import ToCPhone from "$lib/components/table-of-contents/ToCPhone.svelte"
  import { getPageType } from "$lib/modules/utils"
  import {
    menuOpen,
    tableOfContentsOpen,
    currentIssue,
    windowHeight,
    windowWidth,
    screenSizePhone,
  } from "$lib/modules/stores"

  export let data: {
    about: About
    colophon: Colophon
    news: News[]
  }

  const { colophon, news, about } = data

  // Write window dimensions to reactive stores
  let iH: number
  let iW: number
  $: windowHeight.set(iH)
  $: windowWidth.set(iW)

  $: pageType = getPageType($page.route?.id ?? "")

  // Make sure table of content is closed when navigating to an article
  $: if (pageType === PageType.Article) {
    tableOfContentsOpen.set(false)
  }

  const closeMenu = () => {
    if ($menuOpen) menuOpen.set(false)
  }
</script>

<!-- Listen to changes to window dimensions -->
<svelte:window bind:innerWidth={iW} bind:innerHeight={iH} />

<!-- 
  - Hide both menu and ToC for news and pdf pages
  - Show ToC if currentIssue is set (ie. we are on an issue/article page)   
  - Show mobile menu and Toc component if on phone
-->
{#if ![PageType.News, PageType.Pdf].includes(pageType)}
  {#if $screenSizePhone}
    <MenuPhone {news} {about} {colophon} {pageType} />
  {:else}
    <Menu {news} {about} {colophon} {pageType} />
  {/if}
  {#if $currentIssue}
    {#if $screenSizePhone}
      <ToCPhone issue={$currentIssue} />
    {:else}
      <ToC issue={$currentIssue} />
    {/if}
  {/if}
{/if}

{#if $screenSizePhone && $menuOpen}
  <button class="pseudo" on:click={closeMenu} />
{/if}

<slot />

<style lang="scss">
  @import "../lib/styles/variables.scss";

  .pseudo {
    background: transparent;
    border: 0;
    outline: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
  }
</style>
