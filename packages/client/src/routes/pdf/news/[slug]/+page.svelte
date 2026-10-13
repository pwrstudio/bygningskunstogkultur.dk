<script lang="ts">
  import type { PageData } from "./$types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import PrintSingleNews from "$lib/components/print/PrintSingleNews.svelte"

  export let data: PageData

  const { news } = data
</script>

{#key data}
  <MetaData post={news} />
  <PrintSingleNews {news} />
{/key}
