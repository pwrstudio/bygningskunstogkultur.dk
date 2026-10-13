<script lang="ts">
  import type { PageData } from "./$types"
  import PageComponent from "$lib/components/page/PageComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: PageData
</script>

{#key data}
  <MetaData post={data.page} />
  <PageComponent page={data.page} />
{/key}
