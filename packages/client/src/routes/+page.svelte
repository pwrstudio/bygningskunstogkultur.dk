<script lang="ts">
  import { onDestroy } from "svelte"
  import type { PageData } from "./$types"
  import MetaData from "#lib/components/metadata/MetaData.svelte"
  import CoverSlider from "#lib/components/covers/CoverSlider.svelte"
  import CoverSliderPhone from "#lib/components/covers/CoverSliderPhone.svelte"
  import {
    menuOpen,
    newsExtended,
    screenSizePhone,
  } from "#lib/modules/stores/index.js"

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()

  const { issues } = $derived(data)

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
  @use "../lib/styles/variables.scss" as *;

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
