<script lang="ts">
  import type { Colophon } from "$lib/types/sanity.types"
  import { renderBlockText } from "$lib/modules/sanity"
  export let colophon: Colophon
</script>

<div id="colophon-bottom" class="news-item">
  <div class="content">
    {#if colophon?.wideColumn?.content}
      <div class="paragraph">
        {@html renderBlockText(colophon.wideColumn.content)}
      </div>
    {/if}
    <div class="narrow-cols">
      {#if colophon?.firstNarrowColumn?.content}
        <div class="narrow-col">
          {@html renderBlockText(colophon.firstNarrowColumn.content)}
        </div>
      {/if}
      {#if colophon?.secondNarrowColumn?.content}
        <div class="narrow-col">
          {@html renderBlockText(colophon.secondNarrowColumn.content)}
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .narrow-cols {
    border-top: var(--border-black);
    margin-top: $margin_xs;
    padding-top: $margin_xs;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;

    :global(p.normal) {
      font-size: 10px;
      line-height: 14px;
    }

    :global(.image) {
      width: 100%;
      margin: 0;
    }

    :global(.image img) {
      height: 16px * 5;
    }

    .narrow-col {
      width: 50%;
    }
  }
</style>
