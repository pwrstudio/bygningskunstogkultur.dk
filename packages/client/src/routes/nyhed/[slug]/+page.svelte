<script lang="ts">
  import type { PageData } from "./$types"
  import FullNewsItem from "$lib/components/news/FullNewsItem.svelte"
  import { goto } from "$app/navigation"

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()

  const { news } = $derived(data)

  const goToLandingPage = () => {
    goto("/")
  }
</script>

<div class="single-news-container">
  <div class="single-news-item">
    <FullNewsItem {news} onclose={goToLandingPage} />
  </div>
</div>

<style lang="scss">
  .single-news-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    width: 100dvw;
    background: var(--green);
  }

  .single-news-item {
    width: 100%;
    height: 100dvh;
    overflow-y: scroll;
    max-width: 800px;
    padding-top: 40px;
  }
</style>
