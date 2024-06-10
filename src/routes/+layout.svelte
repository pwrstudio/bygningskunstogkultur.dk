<script lang="ts">
  import { page } from "$app/stores"
  import { PageType } from "$lib/enums"
  import type { News, About, Colophon } from "$lib/types/sanity.types"
  import Menu from "$lib/components/menu/Menu.svelte"
  import ToC from "$lib/components/table-of-contents/ToC.svelte"

  import { menuActive, currentIssue } from "$lib/modules/stores"

  export let data: {
    about: About
    colophon: Colophon
    news: News[]
  }

  const { colophon, news, about } = data

  let vw: number

  const getPageType = (route: string): PageType => {
    console.log(route)
    switch (route) {
      case "/":
        return PageType.Landing
      case "/[issue]/[article]":
        return PageType.Article
      case "/nyhed/[slug]":
        return PageType.News
      case "/pdf-article/[slug]":
      case "/pdf-issue/[slug]":
        return PageType.Pdf
      default:
        return PageType.Error
    }
  }
  $: pageType = getPageType($page.route?.id ?? "")

  const closeMenu = () => {
    if ($menuActive) menuActive.set(false)
  }
</script>

{#if ![PageType.News, PageType.Pdf].includes(pageType)}
  <Menu {news} {about} {colophon} {pageType} />
  {#if $currentIssue}
    <ToC issue={$currentIssue} />
  {/if}
{/if}

<svelte:window bind:innerWidth={vw} />

{#if vw < 768 && $menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="pseudo" on:click|preventDefault={closeMenu} />
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
