<script lang="ts">
  import type { Colophon, Issue } from "$lib/types/sanity.types"
  import PrintIssue from "$lib/components/print/PrintIssue.svelte"

  export let data: {
    issue: Issue
    colophon: Colophon
  }

  const { issue, colophon } = data
</script>

{#key data}
  <PrintIssue {issue} {colophon} />
{/key}
