<script lang="ts">
  import { onDestroy } from "svelte"
  import type { Issue } from "$lib/types/sanity.types"
  import CoverSlider from "$lib/components/covers/CoverSlider.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: { issues: Issue[] }

  const { issues } = data

  import { menuOpen, newsExtended, currentIssue } from "$lib/modules/stores"

  // No current issue as we are on the landing page
  currentIssue.set(undefined)

  onDestroy(() => {
    menuOpen.set(false)
    newsExtended.set(false)
  })
</script>

<MetaData />

<div class="landing">
  <CoverSlider {issues} />
</div>

<style lang="scss">
  @import "../lib/styles/variables.scss";

  .landing {
    background: var(--grey-solid);
    width: calc(100% - var(--menu-width));
    height: 100vh;
    position: relative;
    float: right;
    transition: width 0.2s ease-out;

    @include screen-size("phone") {
      height: calc(100% - var(--menu-side-width));
      width: 100vw;
      overflow: hidden;
    }
  }
</style>
