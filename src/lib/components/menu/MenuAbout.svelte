<script lang="ts">
  import type { About } from "$lib/types/sanity.types"
  import { renderBlockText } from "$lib/modules/sanity"
  export let about: About
</script>

{#if about?.content?.content}
  <div>
    {@html renderBlockText(about.content.content)}
  </div>
{/if}
