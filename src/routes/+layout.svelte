<script lang="ts">
  import { page } from "$app/stores"
  import { PageType } from "$lib/enums"
  import type { News, About, Colophon } from "$lib/types/sanity.types"
  import Menu from "$lib/components/menu/Menu.svelte"
  import ToC from "$lib/components/table-of-contents/ToC.svelte"
  import { getPageType } from "$lib/modules/utils"
  import {
    menuOpen,
    currentIssue,
    windowHeight,
    windowWidth,
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
  // $: console.log("$windowWidth", $windowWidth)
  // $: console.log("$windowHeight", $windowHeight)

  $: pageType = getPageType($page.route?.id ?? "")

  const closeMenu = () => {
    if ($menuOpen) menuOpen.set(false)
  }
</script>

{#if ![PageType.News, PageType.Pdf].includes(pageType)}
  <Menu {news} {about} {colophon} {pageType} />
  {#if $currentIssue}
    <ToC issue={$currentIssue} />
  {/if}
{/if}

<svelte:window bind:innerWidth={iH} bind:innerHeight={iW} />

{#if $windowWidth < 768 && $menuOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="pseudo" on:click={closeMenu} />
{/if}

<slot />

<style lang="scss">
  @import "../lib/styles/variables.scss";

  .pseudo {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
  }
</style>
