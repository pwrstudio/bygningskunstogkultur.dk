<script lang="ts">
  import type { Page } from "$lib/types/sanity.types"
  import { onMount } from "svelte"

  import PrintPageComponent from "$lib/components/print/PrintPageComponent.svelte"
  import OutputInfo from "$lib/components/print/OutputInfo.svelte"
  import PrintInfo from "$lib/components/print/PrintInfo.svelte"

  export let page: Page

  onMount(async () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto"
    document.getElementsByTagName("body")[0].style.height = "auto"
  })
</script>

<div class="print-container">
  <!-- PRINT INFO -->
  <PrintInfo />
  <!-- CONTENT -->
  <PrintPageComponent {page} />
  <!-- OUTPUT INFO -->
  <OutputInfo />
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  @page {
    @bottom-center {
      content: counter(page) "/" counter(pages);
      font-family: var(--sans-stack);
      font-size: var(--font-size-print);
    }
  }

  .print-container {
    padding: 2em;
    font-family: var(--sans-stack);
    font-size: var(--font-size-print);
    @media screen {
      max-width: 900px;
    }
  }
</style>
