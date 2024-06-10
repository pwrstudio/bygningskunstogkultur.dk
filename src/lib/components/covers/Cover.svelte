<script lang="ts">
  import { fade } from "svelte/transition"
  import type { Issue } from "$lib/types/sanity.types"
  import { urlFor } from "$lib/modules/sanity"
  import Logo from "$lib/components/graphics/Logo.svelte"

  export let issue: Issue
  export let scale = 1

  // ratio of the photo is 460 / 370
  const ratio = 460 / 370
</script>

<a
  class="cover"
  class:empty={!issue.tableOfContents || issue.tableOfContents.length == 0}
  style="transform: scale({scale});"
  in:fade
  href="/{issue.slug.current}"
>
  <div class="inner">
    <div class="logo">
      <Logo />
    </div>
    <h1 class="logo-title">
      {issue.title}
    </h1>
    {#if issue.mainImage?.asset}
      <img
        class="image"
        src={urlFor(issue.mainImage.asset)
          .width(600)
          .height(Math.floor(ratio * 600))
          .quality(90)
          .auto("format")
          .url()}
        alt={issue.title}
      />
    {/if}
  </div>
</a>

<style lang="scss">
  @import "../../styles/variables.scss";

  .cover {
    width: 400px;
    height: 586px;
    padding: calc(var(--margin) / 4);
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    background-color: var(--white);
    position: relative;

    &.empty {
      pointer-events: none;
    }

    &.scalable {
      transform: scale(0.5);
    }

    .inner {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: flex-end;
      position: relative;

      .logo {
        width: 100%;
      }

      .logo-title {
        position: absolute;
        font-family: var(--sans-stack);
        width: 100%;
        display: block;
        text-align: right;
        font-weight: normal;
        font-size: 26px;
        top: -1px;
        overflow: visible;
      }

      .image {
        box-sizing: border-box;
        width: 100%;
        height: auto;
      }
    }

    @include screen-size("small") {
    }
  }
</style>
