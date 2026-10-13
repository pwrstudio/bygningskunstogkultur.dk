<script lang="ts">
  import type { PageData } from "./$types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import PrintSinglePage from "$lib/components/print/PrintSinglePage.svelte"

  export let data: PageData

  const { page } = data
</script>

{#key data}
  <MetaData post={page} />
  <PrintSinglePage {page} />
{/key}
