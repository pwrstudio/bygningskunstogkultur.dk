<script lang="ts">
  import { onDestroy } from "svelte"
  import type { Issue } from "$lib/types/sanity.types"
  import CoverSlider from "$lib/components/covers/CoverSlider.svelte"

  export let data: { issues: Issue[] }

  const { issues } = data

  import {
    menuActive,
    newsExtended,
    extendedPost,
    currentIssue,
  } from "$lib/modules/stores"

  // No current issue as we are on the landing page
  currentIssue.set(undefined)

  let vw: number

  onDestroy(() => {
    menuActive.set(false)
    newsExtended.set(false)
    extendedPost.set({})
  })

  const closeMenu = () => {
    if ($menuActive) {
      menuActive.set(false)
    }
  }
</script>

<svelte:window bind:innerWidth={vw} />

{#if vw < 768 && $menuActive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="pseudo" on:click|preventDefault={closeMenu} />
{/if}

<div class="landing">
  <CoverSlider {issues} />
</div>

<style lang="scss">
  @import "../lib/styles/variables.scss";

  // :local(body) {
  //   background-color: var(--grey-solid);
  // }

  .landing {
    background: var(--grey-solid);
    width: calc(100% - var(--menu-width));
    height: 100vh;
    position: relative;
    float: right;
    transition: width 0.2s ease-out;

    @include screen-size("phone") {
      height: calc(100% - var(--menu-button-width));
      width: 100vw;
      overflow: hidden;
    }
  }

  .pseudo {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
  }
</style>
