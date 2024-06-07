<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { currentIssue } from "$lib/modules/stores"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"

  export let data: {
    issue: Issue
    article: Article
  }

  const { issue, article } = data

  currentIssue.set(issue)
</script>

<ArticleComponent {article} {issue} />
