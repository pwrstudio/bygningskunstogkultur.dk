<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { currentArticleSlug, currentIssue } from "$lib/modules/stores"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: {
    issue: Issue
    article: Article
  }

  // Issue is set non-reactively
  const issue = data.issue
  currentIssue.set(issue)

  // Make the article reactive to make sure the reload on page navigation
  $: article = data.article
  // Set current  article slug
  $: currentArticleSlug.set(article.slug.current)
</script>

{#key data}
  <MetaData post={article} />
  <ArticleComponent {article} {issue} />
{/key}
