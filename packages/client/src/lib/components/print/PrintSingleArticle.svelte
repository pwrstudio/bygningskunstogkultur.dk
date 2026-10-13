<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import PrintArticleComponent from "$lib/components/print/PrintArticleComponent.svelte"
  import OutputInfo from "$lib/components/print/OutputInfo.svelte"
  import PrintInfo from "$lib/components/print/PrintInfo.svelte"

  export let issue: Issue
  export let post: Article

  onMount(async () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto"
    document.getElementsByTagName("body")[0].style.height = "auto"
  })
</script>

<div class="print-container">
  <!-- PRINT INFO -->
  <PrintInfo />
  <!-- CONTENT -->
  <PrintArticleComponent {post} {issue} />
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
