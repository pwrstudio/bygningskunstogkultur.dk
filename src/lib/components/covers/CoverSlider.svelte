<script lang="ts">
  import { fade } from "svelte/transition"
  import type { Issue } from "$lib/types/sanity.types"
  import Swiper from "swiper"
  import { Pagination, Navigation } from "swiper/modules"
  import { onMount } from "svelte"
  import { mapValue } from "$lib/modules/utils"

  import "swiper/swiper-bundle.css"
  import "swiper/css/navigation"
  import "swiper/css/pagination"

  import { newsExtended, windowWidth } from "$lib/modules/stores"

  import Cover from "$lib/components/covers/Cover.svelte"
  import ArrowRight from "$lib/components/graphics/ArrowRight.svelte"
  import ArrowLeft from "$lib/components/graphics/ArrowLeft.svelte"

  export let issues: Issue[] = []

  let scale = 1
  let coverScale = 1
  let loaded = false

  let swiperDesktopElement: HTMLDivElement
  let swiperDesktop: Swiper

  // Not exactly sure how these two reactive statements works...
  $: if (768 < $windowWidth && $windowWidth < 1350) {
    scale = mapValue($windowWidth, 769, 1349, 0.2, 0.9)
  } else {
    scale = 1
  }
  $: if ($windowWidth < 400) {
    coverScale = mapValue($windowWidth, 80, 440, 0, 0.8)
  }

  async function initializeSwipers() {
    if (swiperDesktop) swiperDesktop.destroy()

    swiperDesktop = new Swiper(swiperDesktopElement, {
      modules: [Navigation, Pagination],
      touchRatio: 0,
      navigation: {
        prevEl: ".custom-controls-prev",
        nextEl: ".custom-controls-next",
      },
      pagination: {
        el: ".custom-pagination",
        clickable: true,
      },
      slidesPerView: 2,
      spaceBetween: 10.5,
    })
  }

  onMount(async () => {
    initializeSwipers()
    // Loading delay to avoid flickering
    await new Promise(resolve => setTimeout(resolve, 100))
    loaded = true
  })
</script>

<div
  in:fade
  class:loaded
  class="coverslider"
  on:click={e => {
    newsExtended.set(false)
  }}
  role="presentation"
>
  <!-- TITLE -->
  <div class="top">
    <h1 class="edition title">
      <span class="line" />
      <span class="line" />
    </h1>
  </div>

  <!-- ARROWS -->
  <div class="middle">
    <div class="custom-controls-prev" class:absolutely={scale !== 1}>
      <ArrowLeft />
    </div>

    <!-- SWIPER DESKTOP -->
    <div
      class="swiper-desktop"
      class:scaled={scale !== 1}
      style="transform: scale({scale})"
    >
      <div class="swiper-container" bind:this={swiperDesktopElement}>
        <div class="swiper-wrapper">
          {#each issues as issue}
            <div class="swiper-slide">
              <Cover {issue} />
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="custom-controls-next" class:absolutely={scale !== 1}>
      <ArrowRight />
    </div>
  </div>

  <!-- PAGINATION -->
  <div class="bottom">
    <div class="custom-pagination" />
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .custom-controls-prev,
  .custom-controls-next,
  .custom-pagination,
  .swiper-desktop {
    @include screen-size("phone") {
      display: none;
    }

    display: block;
  }

  .custom-controls-prev.absolutely {
    position: absolute;
    z-index: 999;
    left: 0;
  }

  .custom-controls-next.absolutely {
    position: absolute;
    z-index: 999;
    right: 0;
  }

  .coverslider {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    user-select: none;
    padding: 0;
    overflow: hidden;

    opacity: 0;
    &.loaded {
      opacity: 1;
      transition: opacity 0.3s ease-out;
    }

    .swiper-container {
      width: var(--coverslider-2);
      overflow: hidden;
    }

    :global(.swiper-slide) {
      width: 400px !important;
    }

    .title {
      font-family: var(--sans-stack);
      letter-spacing: var(--title-letter-spacing);

      .line {
        display: block;
        font-size: var(--font-size-small);

        &:first-child {
          margin-bottom: 6px;
        }
      }
    }

    .top,
    .bottom {
      height: 10%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      :global(.swiper-pagination-bullet) {
        background: var(--black);
        opacity: 1;
        margin: 0 calc(var(--margin) / 6);
      }

      :global(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
        background: var(--green);
      }
    }

    .middle {
      height: 80%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      .swiper-desktop {
        min-width: 808px;
        position: relative;

        &.scaled {
          position: absolute;
        }
      }

      .custom-controls-prev,
      .custom-controls-next {
        width: 40px;
        margin: 0 calc(var(--margin) / 2);
        cursor: pointer;
        flex-shrink: 0;
      }

      :global(.custom-controls-prev.swiper-button-disabled),
      :global(.custom-controls-next.swiper-button-disabled) {
        opacity: 0.2;
      }
    }

    .edition {
      text-align: center;
      width: 100%;
      padding-left: 20px;
    }
  }

  .custom-pagination {
    width: auto;
  }
</style>
