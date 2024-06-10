<script lang="ts">
  import type { News } from "$lib/types/sanity.types"
  import FullNewsItem from "$lib/components/news/FullNewsItem.svelte"
  import { goto } from "$app/navigation"

  export let data: {
    news: News
  }

  const { news } = data

  const goToLandingPage = () => {
    goto("/")
  }
</script>

<div class="single-news-container">
  <div class="single-news-item">
    <FullNewsItem {news} on:close={goToLandingPage} />
  </div>
</div>

<style lang="scss">
  .single-news-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: var(--green);
  }

  .single-news-item {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    max-width: 800px;
    padding-top: 40px;
  }
</style>
