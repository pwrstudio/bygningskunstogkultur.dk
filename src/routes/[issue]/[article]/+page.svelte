<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { currentIssue } from "$lib/modules/stores"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"

  export let data: {
    issue: Issue
    article: Article
  }

  const issue = data.issue

  // Make the article reactive to make sure the reload on page navigation
  $: article = data.article

  $: currentIssue.set(issue)
</script>

{#key data}
  <ArticleComponent {article} {issue} />
{/key}
