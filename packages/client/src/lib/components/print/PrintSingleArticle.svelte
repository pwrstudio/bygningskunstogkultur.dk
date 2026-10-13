<script lang="ts">
  import type { Article, Issue } from "#lib/types/index.js"
  import { onMount } from "svelte"
  import { unlockBodyScroll } from "#lib/modules/utils/index.js"
  import PrintArticleComponent from "#lib/components/print/PrintArticleComponent.svelte"
  import OutputInfo from "#lib/components/print/OutputInfo.svelte"
  import PrintInfo from "#lib/components/print/PrintInfo.svelte"

  interface Props {
    issue: Issue
    post: Article
  }

  let { issue, post }: Props = $props()

  onMount(unlockBodyScroll)
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
