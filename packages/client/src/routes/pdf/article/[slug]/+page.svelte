<script lang="ts">
  import type { PageData } from "./$types"
  import MetaData from "#lib/components/metadata/MetaData.svelte"
  import PrintSingleArticle from "#lib/components/print/PrintSingleArticle.svelte"

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()

  const { article, issue } = $derived(data)
</script>

{#key data}
  <MetaData post={article} />
  <PrintSingleArticle post={article} {issue} />
{/key}
