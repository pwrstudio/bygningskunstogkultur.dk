<script lang="ts">
  import type { Article } from "$lib/types/sanity.types"
  import { currentArticleSlug } from "$lib/modules/stores"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: {
    article: Article
  }

  // Make the article reactive to make sure the reload on page navigation
  $: article = data.article
  // Set current article slug
  $: currentArticleSlug.set(article.slug.current)
</script>

{#key data}
  <MetaData post={article} />
  <ArticleComponent {article} />
{/key}
