<script lang="ts">
  import type { PageData } from "./$types"
  import PrintIssue from "#lib/components/print/PrintIssue.svelte"

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()

  const { issue, colophon } = $derived(data)
</script>

{#key data}
  <PrintIssue {issue} {colophon} />
{/key}
