<script lang="ts">
  import { page } from "$app/stores"
  import type { News, About, Colophon } from "$lib/types/sanity.types"
  import { currentIssue } from "$lib/modules/stores"
  import Menu from "$lib/components/menu/Menu.svelte"
  import ToC from "$lib/components/table-of-contents/ToC.svelte"

  export let data: {
    about: About
    colophon: Colophon
    news: News[]
  }

  const { colophon, news, about } = data

  $: landing = $page.route.id === "/"
</script>

<Menu {news} {about} {colophon} {landing} />
{#if $currentIssue}
  <ToC issue={$currentIssue} />
{/if}

<slot />
