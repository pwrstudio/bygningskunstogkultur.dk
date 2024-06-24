<script lang="ts">
  import { onDestroy } from "svelte"
  import type { Issue } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import CoverSlider from "$lib/components/covers/CoverSlider.svelte"
  import CoverSliderPhone from "$lib/components/covers/CoverSliderPhone.svelte"
  import {
    menuOpen,
    newsExtended,
    currentIssue,
    screenSizePhone,
  } from "$lib/modules/stores"

  export let data: { issues: Issue[] }

  const { issues } = data

  // No current issue as we are on the landing page
  currentIssue.set(undefined)

  onDestroy(() => {
    menuOpen.set(false)
    newsExtended.set(false)
  })
</script>

<MetaData />

<div class="landing">
  {#if $screenSizePhone}
    <CoverSliderPhone {issues} />
  {:else}
    <CoverSlider {issues} />
  {/if}
</div>

<style lang="scss">
  @import "../lib/styles/variables.scss";

  .landing {
    background: var(--grey-solid);
    width: calc(100dvw - var(--menu-width));
    height: 100dvh;
    position: relative;
    float: right;
    overflow: hidden;

    @include screen-size("phone") {
      height: 100dvh;
      width: 100dvw;
    }
  }
</style>
