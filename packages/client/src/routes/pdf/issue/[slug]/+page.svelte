<script lang="ts">
  import type { PageData } from "./$types"
  import PrintIssue from "$lib/components/print/PrintIssue.svelte"

  export let data: PageData

  const { issue, colophon } = data
</script>

{#key data}
  <PrintIssue {issue} {colophon} />
{/key}
