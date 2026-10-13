<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import MetaData from "$lib/components/metadata/MetaData.svelte"
  import PrintSingleArticle from "$lib/components/print/PrintSingleArticle.svelte"

  export let data: {
    issue: Issue
    article: Article
  }

  const { article, issue } = data
</script>

{#key data}
  <MetaData post={article} />
  <PrintSingleArticle post={article} {issue} />
{/key}
