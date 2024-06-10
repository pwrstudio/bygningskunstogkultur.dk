<script lang="ts">
  import type { ImageBlock } from "$lib/types/sanity.types"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import { get, has } from "lodash-es"

  export let block: ImageBlock
</script>

<figure
  class="image"
  style={"background: " + get(block, "backgroundColor.hex", "transparent")}
  class:padded={has(block, "backgroundColor.hex")}
  class:fullwidth={block.fullWidth}
  class:fullheight={block.fullHeight}
>
  <!-- IMAGE -->
  <img
    src={urlFor(block.asset).width(800).quality(90).auto("format").url()}
    alt=""
  />

  <!-- CAPTION -->
  <div class="text">
    {#if has(block, "caption.content")}
      <figcaption>
        <!-- CAPTION -->
        <span class="caption>">
          {@html renderBlockText(block.caption?.content ?? [])}
        </span>
      </figcaption>
    {/if}
  </div>
</figure>

<style lang="scss">
  @import "../../styles/variables.scss";

  .image {
    width: var(--text-width);
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: var(--font-size-small);
    line-height: var(--line-height);
    font-family: var(--sans-stack);
    margin-bottom: var(--line-height);
    // margin-top: 2rem;

    &.fullwidth {
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-height: 80vh;
      }
    }

    &.fullheight {
      width: 100%;
      max-height: unset;
      height: calc(100vh - var(--$menu_bar_height));
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 0;
      padding-top: 0;
      img {
        max-height: 90vh;
      }
    }

    &.padded {
      padding-top: calc(var(--line-height) * 4);
      padding-bottom: calc(var(--line-height) * 4);
    }
  }

  .caption {
    p {
      font-size: var(--font-size-small);
    }
    text-align: left;
    float: left;
  }
</style>
