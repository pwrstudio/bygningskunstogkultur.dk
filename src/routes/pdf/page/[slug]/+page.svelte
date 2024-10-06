<script lang="ts">
  import type { Page } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import PrintSinglePage from "$lib/components/print/PrintSinglePage.svelte"

  export let data: {
    page: Page
  }

  const { page } = data
</script>

{#key data}
  <MetaData post={page} />
  <PrintSinglePage {page} />
{/key}
