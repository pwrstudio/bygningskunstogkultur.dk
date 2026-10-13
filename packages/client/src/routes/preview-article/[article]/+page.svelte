<script lang="ts">
  import type { PageData } from "./$types"
  import ArticleComponent from "#lib/components/issue/ArticleComponent.svelte"
  import MetaData from "#lib/components/metadata/MetaData.svelte"

  let { data }: { data: PageData } = $props()
</script>

{#key data}
  <MetaData post={data.article} />
  <ArticleComponent article={data.article} />
{/key}
