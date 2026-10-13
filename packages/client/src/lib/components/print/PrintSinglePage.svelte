<script lang="ts">
  import type { Page } from "#lib/types/index.js"
  import { onMount } from "svelte"
  import { unlockBodyScroll } from "#lib/modules/utils/index.js"

  import PrintPageComponent from "#lib/components/print/PrintPageComponent.svelte"
  import OutputInfo from "#lib/components/print/OutputInfo.svelte"
  import PrintInfo from "#lib/components/print/PrintInfo.svelte"

  interface Props {
    page: Page
  }

  let { page }: Props = $props()

  onMount(unlockBodyScroll)
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
  @use "../../styles/variables.scss" as *;

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
