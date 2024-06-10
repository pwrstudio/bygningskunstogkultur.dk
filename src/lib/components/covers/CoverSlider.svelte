<script lang="ts">
  import type { Issue } from "$lib/types/sanity.types"
  import Swiper from "swiper"
  import { Pagination, Navigation } from "swiper/modules"
  import { onMount, afterUpdate, tick } from "svelte"
  import { get } from "lodash-es"
  import { mapValue } from "$lib/modules/utils"

  import "swiper/swiper-bundle.css"
  import "swiper/css/navigation"
  import "swiper/css/pagination"

  import { newsExtended } from "$lib/modules/stores"

  import Cover from "$lib/components/covers/Cover.svelte"
  import ArrowRight from "$lib/components/graphics/ArrowRight.svelte"
  import ArrowLeft from "$lib/components/graphics/ArrowLeft.svelte"

  export let issues: Issue[] = []

  let vw: number = 0
  let scale = 1
  let coverScale = 1

  let swiperDesktopElement: HTMLDivElement
  let swiperMobileElement: HTMLDivElement

  let swiperDesktop: Swiper
  let swiperMobile: Swiper

  $: {
    if (768 < vw && vw < 1350) {
      scale = mapValue(vw, 769, 1349, 0.2, 0.9)
    } else {
      scale = 1
    }

    if (vw < 400) {
      coverScale = mapValue(vw, 80, 440, 0, 0.8)
    }
  }

  async function initializeSwipers() {
    if (swiperDesktop) swiperDesktop.destroy()
    if (swiperMobile) swiperMobile.destroy()

    await tick()

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

    swiperMobile = new Swiper(swiperMobileElement, {
      modules: [Navigation, Pagination],
      touchRatio: 1,
      navigation: {
        prevEl: ".custom-controls-prev-mobile",
        nextEl: ".custom-controls-next-mobile",
      },
      pagination: {
        el: ".custom-pagination-mobile",
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 10.5,
    })
  }

  onMount(() => {
    vw = window.innerWidth

    if (768 < vw && vw < 1350) {
      scale = mapValue(vw, 769, 1349, 0.2, 0.9)
    } else {
      scale = 1
    }
    if (vw < 400) {
      coverScale = mapValue(vw, 80, 440, 0, 0.8)
    }

    initializeSwipers()
  })

  afterUpdate(() => {
    initializeSwipers()
  })
</script>

<svelte:window bind:innerWidth={vw} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="coverslider"
  on:click={e => {
    newsExtended.set(false)
  }}
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
    <div class="custom-controls-prev-mobile">
      <ArrowLeft />
    </div>

    <!-- SWIPER DESKTOP -->
    <!-- class:scaled={scale !== 1}
    style="transform: scale({scale})" -->
    <div class="swiper-desktop">
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

    <!-- SWIPER MOBILE -->
    <div class="swiper-mobile" bind:this={swiperMobileElement}>
      <div class="swiper-wrapper">
        {#each issues.filter(issue => get(issue, "tableOfContents", []).length > 0) as issue}
          <div class="swiper-slide">
            <Cover {issue} scale={coverScale} />
          </div>
        {/each}
      </div>
    </div>

    <div class="custom-controls-next" class:absolutely={scale !== 1}>
      <ArrowRight />
    </div>
    <div class="custom-controls-next-mobile">
      <ArrowRight />
    </div>
  </div>

  <!-- PAGINATION -->
  <div class="bottom">
    <div class="custom-pagination" />
    <div class="custom-pagination-mobile" />
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

  .custom-controls-prev-mobile,
  .custom-controls-next-mobile,
  .custom-pagination-mobile,
  .swiper-mobile {
    display: none;

    @include screen-size("phone") {
      display: block;
    }
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

    :global(.swiper-container) {
      width: $coverslider_2;
    }

    :global(.swiper-slide) {
      width: 400px !important;
    }

    @include screen-size("phone") {
      :global(.swiper-container) {
        width: $coverslider_1;
        overflow: hidden;
      }
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
          width: 100%;
          position: absolute;
        }
      }

      .custom-controls-prev,
      .custom-controls-next,
      .custom-controls-prev-mobile,
      .custom-controls-next-mobile {
        width: 40px;
        margin: 0 calc(var(--margin) / 2);
        cursor: pointer;
        flex-shrink: 0;
      }

      :global(.custom-controls-prev.swiper-button-disabled),
      :global(.custom-controls-next.swiper-button-disabled),
      :global(.custom-controls-prev-mobile.swiper-button-disabled),
      :global(.custom-controls-next-mobile.swiper-button-disabled) {
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
