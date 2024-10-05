<script lang="ts">
  import type { Page } from "$lib/types/sanity.types"
  import PageComponent from "$lib/components/page/PageComponent.svelte"
  import MetaData from "$lib/components/metadata/MetaData.svelte"

  export let data: {
    page: Page
  }

  // Make the page data reactive to reload on navigation
  $: page = data.page
</script>

<MetaData post={page} />
<PageComponent {page} />
