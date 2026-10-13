<script lang="ts">
  import type { PageData } from "./$types"
  import MetaData from "#lib/components/metadata/MetaData.svelte"
  import PrintSinglePage from "#lib/components/print/PrintSinglePage.svelte"

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()

  const { page } = $derived(data)
</script>

{#key data}
  <MetaData post={page} />
  <PrintSinglePage {page} />
{/key}
