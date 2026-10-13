<script lang="ts">
  import type { PageData } from "./$types"
  import { currentArticleSlug, currentIssue } from "$lib/modules/stores"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: PageData

  // The issue drives the table of contents in the layout
  $: currentIssue.set(data.issue)
  $: currentArticleSlug.set(data.article.slug.current)
</script>

<!-- Remount on navigation between articles so transitions and scroll positions reset -->
{#key data}
  <MetaData post={data.article} />
  <ArticleComponent article={data.article} issue={data.issue} />
{/key}
