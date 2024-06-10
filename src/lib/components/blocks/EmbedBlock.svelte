<script lang="ts">
  import type { EmbedBlock } from "$lib/types/sanity.types"
  import getVideoId from "get-video-id"
  import { renderBlockText } from "$lib/modules/sanity"

  export let block: EmbedBlock
</script>

<figure class="embed">
  <!-- // YOUTUBE -->
  {#if block.url && block.url.includes("youtube")}
    <div class="youtube-container">
      <iframe
        width="720"
        height="480"
        title="paletten"
        src={"https://www.youtube.com/embed/" + getVideoId(block.url).id}
        frameborder="no"
        allow="autoplay; fullscreen"
        allowfullscreen
      />
    </div>
  {/if}

  <!-- // VIMEO -->
  {#if block.url && block.url.includes("vimeo")}
    <div class="vimeo-container">
      <iframe
        width="720"
        height="480"
        title="video"
        src={"https://player.vimeo.com/video/" + getVideoId(block.url).id}
        frameborder="no"
        scrolling="no"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen
      />
    </div>
  {/if}

  <!-- // SOUNDCLOUD -->
  {#if block.url.includes("soundcloud")}
    <div class="soundcloud-container">
      <iframe
        width="100%"
        height="300"
        title="video"
        src={"https://w.soundcloud.com/player/?url=" +
          block.url +
          "&color=%23fffff"}
        frameborder="no"
        scrolling="no"
        allow="autoplay"
      />
    </div>
  {/if}

  <!-- CAPTION -->
  {#if block.caption?.content}
    <figcaption class="caption">
      {@html renderBlockText(block.caption.content)}
    </figcaption>
  {/if}
</figure>

<style lang="scss">
  @import "../../styles/variables.scss";

  .embed {
    width: var(--text-width);
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: var(--font-size-small);
    line-height: var(--line-height);
    font-family: var(--sans-stack);
    margin-bottom: var(--line-height);
    margin-top: var(--line-height);

    .youtube-container,
    .vimeo-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 720px;
      width: 100%;
      margin-bottom: 0.5em;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }

    .soundcloud-container {
      // height: 300px;
      width: 100%;
      overflow: hidden;
      max-width: 100%;
      margin-bottom: 0.5em;

      iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
  }
</style>
