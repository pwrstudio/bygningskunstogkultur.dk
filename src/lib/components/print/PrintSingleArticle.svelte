<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import PrintArticleComponent from "$lib/components/print/PrintArticleComponent.svelte"
  import OutputInfo from "$lib/components/print/OutputInfo.svelte"

  export let issue: Issue
  export let post: Article

  onMount(async () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto"
    document.getElementsByTagName("body")[0].style.height = "auto"
  })
</script>

<div class="print-container">
  <!-- PRINT INFO -->
  <div class="print-info">
    <div>Print this page to PDF (CMD + P) to save a copy of this issue.</div>
  </div>
  <!-- CONTENT -->
  <PrintArticleComponent {post} {issue} />
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

  .print-info {
    background: var(--green);
    padding: 40px;
    height: 30vh;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
    align-items: center;

    @media print {
      display: none;
    }
  }
</style>
