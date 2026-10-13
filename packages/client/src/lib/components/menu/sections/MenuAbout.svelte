<script lang="ts">
  import type { About } from "#lib/types/index.js"
  import { renderBlockText } from "#lib/modules/sanity/index.js"
  interface Props {
    about: About
  }

  let { about }: Props = $props()
</script>

{#if about?.content?.content}
  <div>
    {@html renderBlockText(about.content.content)}
  </div>
{/if}
