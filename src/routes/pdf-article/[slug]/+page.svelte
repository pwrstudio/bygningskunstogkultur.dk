<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { currentIssue } from "$lib/modules/stores"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: {
    issue: Issue
    article: Article
  }

  const issue = data.issue

  // Make the article reactive to reload data on page navigation
  $: article = data.article

  $: currentIssue.set(issue)
</script>

{#key data}
  <MetaData post={article} />
  <ArticleComponent {article} {issue} />
{/key}
