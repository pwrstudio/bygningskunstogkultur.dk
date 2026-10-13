<script lang="ts">
  import type { PageData } from "./$types"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  // The layout reads data.issue and data.article for the table of contents
  let { data }: { data: PageData } = $props()
</script>

<!-- Remount on navigation between articles so transitions and scroll positions reset -->
{#key data}
  <MetaData post={data.article} />
  <ArticleComponent article={data.article} issue={data.issue} />
{/key}
