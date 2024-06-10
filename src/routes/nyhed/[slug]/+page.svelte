<script lang="ts">
  import type { News } from "$lib/types/sanity.types"
  import FullNewsItem from "$lib/components/news/FullNewsItem.svelte"

  export let data: {
    news: News
  }

  const { news } = data

  console.log(news)
</script>

{#key data}
  <FullNewsItem {news} />
{/key}
