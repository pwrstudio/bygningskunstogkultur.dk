<script lang="ts">
  import type { PageData } from "./$types"
  import { currentArticleSlug } from "$lib/modules/stores"
  import ArticleComponent from "$lib/components/issue/ArticleComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: PageData

  $: currentArticleSlug.set(data.article.slug.current)
</script>

{#key data}
  <MetaData post={data.article} />
  <ArticleComponent article={data.article} />
{/key}
