<script lang="ts">
  import type { News } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import PrintSingleNews from "$lib/components/print/PrintSingleNews.svelte"

  export let data: {
    news: News
  }

  const { news } = data
</script>

{#key data}
  <MetaData post={news} />
  <PrintSingleNews {news} />
{/key}
