<script lang="ts">
  import type { Page } from "$lib/types/sanity.types"
  import { renderBlockText } from "$lib/modules/sanity"

  import PageMeta from "$lib/components/page/PageMeta.svelte"
  import Footnotes from "$lib/components/issue/Footnotes.svelte"

  export let page: Page
</script>

<div class="page">
  <div class="col">
    <!-- PAGE META -->
    <PageMeta {page} />

    <!-- TEXT -->
    <div class="block main">
      {@html renderBlockText(page.content?.content ?? [])}
    </div>

    <!-- FOOTNOTES -->
    <Footnotes article={page} />
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .page {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-family: var(--sans-stack);
    display: flex;
    flex-flow: row nowrap;
    scroll-snap-align: start;
    padding-left: calc(var(--menu-side-width) * 2);

    @include screen-size("phone") {
      padding-left: 0;
      height: calc(100dvh - var(--menu-side-width));
      flex-flow: column nowrap;
      height: auto;
      overflow-y: auto;
      padding-bottom: 80px;
    }

    .col {
      box-sizing: border-box;
      width: 70ch;
      max-width: 90%;
      height: 100dvh;
      overflow-y: scroll;
      scroll-behavior: smooth;
      padding-left: var(--margin);
      padding-top: var(--margin);
      padding-right: var(--margin);

      @include screen-size("phone") {
        width: 100%;
        padding: var(--margin) calc(var(--margin) / 4);
        padding-bottom: 8em;
      }

      .block {
        &.main {
          margin-top: 1em;
          margin-bottom: var(--margin);
        }

        &.link {
          text-align: center;
        }

        &.next {
          display: block;
          margin-top: 2em;
          text-decoration: none;
          margin-bottom: 6em;
        }
      }
    }

    .title {
      margin-top: 0;
    }
  }

  .article:last-child {
    margin-bottom: calc(var(--menu-side-width) * 2);
    padding-bottom: 100px;
  }

  :global(.graphic) {
    width: 80px;
    margin: 0 auto 12px;
  }
</style>
