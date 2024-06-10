<script lang="ts">
  import type { Slide, SanityImageAsset } from "$lib/types/sanity.types"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import { onMount } from "svelte"
  import Swiper from "swiper"
  import { Pagination, Navigation } from "swiper/modules"
  import { get } from "lodash-es"

  import "swiper/swiper-bundle.css"
  import "swiper/css/navigation"
  import "swiper/css/pagination"

  export let slides = [] as Slide[]
  export let zoomable = false
  export let mobile = false

  let vw = 0
  let vh = 0

  let swiperContainer: HTMLDivElement
  let swiperInstance: Swiper

  const toggleZoomButton = () => {
    if (swiperInstance.slides[swiperInstance.activeIndex]) {
      zoomed = !zoomed
      zoomLevel = zoomLevel === 1 ? 2 : 1
    }
  }

  const toggleZoom = () => {
    if (swiperInstance.clickedSlide) {
      if (zoomable) {
        zoomed = !zoomed
        zoomLevel = zoomLevel === 1 ? 2 : 1
      } else {
        swiperInstance.slideNext()
      }
    }
  }

  // Checks in zoom containers if the original file is big enough, else falls back to a double vw image
  const zoomImgUrl = (asset: SanityImageAsset) => {
    try {
      // Setup regex for original
      const original = urlFor(asset).quality(90).url()
      const originalDims = /-(\d+)x(\d+)/

      // Setup regex for Double
      const double = urlFor(asset)
        .width(vw * 2)
        .quality(90)
        .url()
      const doubleDims = /w=(\d+)/

      const originalDimensions = original.match(originalDims)
      const doubleDimensions = double.match(doubleDims)

      const originalW = originalDimensions[1]
      const doubleW = doubleDimensions[1]

      // Compare sizes...
      if (Number(originalW) > Number(doubleW)) {
        return original
      } else {
        return double
      }
    } catch (err) {
      console.log(err)
      return ""
    }
  }

  const scrollThrough = (e: MouseEvent) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const scrollW = e.currentTarget.scrollWidth
      const scrollH = e.currentTarget.scrollHeight
      const fracX = x / rect.width
      const fracY = y / rect.height
      const toX = fracX * (scrollW - rect.width)
      const toY = fracY * (scrollH - rect.height)
      if (zoomed) {
        e.currentTarget.scrollLeft = toX
        e.currentTarget.scrollTop = toY
      }
    }
  }

  onMount(() => {
    vw = window.innerWidth
    vh = window.innerHeight

    swiperInstance = new Swiper(swiperContainer, {
      modules: [Pagination, Navigation],
      pagination: {
        el: "#custom-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      spaceBetween: 8,
      autoHeight: mobile,
    })

    swiperInstance.on("slideChange", () => {
      zoomed = false
    })
  })

  let zoomed = false
  let zoomLevel = 1
</script>

<svelte:window bind:innerWidth={vw} bind:innerHeight={vh} />

<div class="slideshow" class:zoomable>
  <div class="swiper-container" bind:this={swiperContainer}>
    <div class="swiper-wrapper">
      {#each slides as slide}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="swiper-slide" on:click={toggleZoom}>
          {#if zoomable}
            <div
              class="zoom-container"
              class:zoomed
              on:mousemove={scrollThrough}
            >
              <img
                class="slide-img zoomable"
                class:zoomed
                src={zoomImgUrl(slide.asset)}
                alt={slide.asset.alt}
              />
            </div>
          {:else}
            <div class="img-container">
              <img
                class="slide-img contain"
                src={urlFor(slide.asset).quality(90).width(1200).url()}
                alt={slide.asset.alt}
              />
              {#if slide.caption}
                <div class="caption">
                  {@html renderBlockText(get(slide, "caption.content", []))}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination"></div>

    {#if zoomable}
      <div class="zoomLevel">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="button" on:click={toggleZoomButton}>
          {`${zoomLevel * 100}%`}[±]
        </span>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .slideshow {
    height: 100%;

    &.zoomable {
      @include screen-size("small") {
        height: 70%;
        margin-top: 10px;
        margin-bottom: 100px;
      }
    }

    .zoomLevel {
      padding-top: var(--margin-xs);

      .button {
        cursor: pointer;
      }
    }

    .bottom {
      height: $margin;
    }

    :global(.swiper-pagination) {
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }

    :global(.swiper-pagination-bullet) {
      background: var(--grey-solid);
      opacity: 1;
      margin: 0 calc(var(--margin) / 6);
    }

    :global(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
      background: var(--black);
    }

    :global(.swiper-wrapper) {
      height: calc(90vh - #{$margin * 2});

      @include screen-size("small") {
        height: 100%;
      }
    }

    :global(.swiper-slide) {
      height: auto;
      user-select: none;
    }

    :global(.img-container) {
      width: 100%;
      height: 100%;
      max-height: calc(100vh - #{$margin * 2.5});
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      justify-content: space-between;

      @include screen-size("phone") {
        justify-content: center;
      }
    }

    :global(.zoom-container) {
      overflow: scroll;
      cursor: zoom-in;
      scroll-behavior: unset;
      margin-top: 10px;
      margin-left: 10px;
      height: calc(100% - 20px);
      width: calc(100% - 20px);
    }

    :global(.slide-img) {
      max-width: 100%;
      max-height: calc(100% - #{$margin * 2});
      padding-bottom: var(--margin-xs);
      background: white;
    }

    :global(.slide-img.contain) {
      object-fit: contain;
    }

    :global(.slide-img.cover) {
      object-fit: cover;
    }

    :global(.slide-img.zoomable) {
      height: 100%;
      object-fit: contain;
      object-position: center;
      margin: 0 auto;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    :global(.slide-img.zoomed) {
      padding: 0;
      margin: 0;
      width: unset;
      height: unset;
      object-fit: unset;
      max-width: none;
      max-height: none;
      cursor: zoom-out;
      transform: unset;
      position: unset;
      left: unset;
      top: unset;
    }

    :global(.slide-img.is-svg.zoomed) {
      width: 200vw;
      height: auto;
    }

    .caption {
      bottom: 0;
      bottom: 0;
      margin-right: 40px;
      :global(p) {
        font-size: 16px;
        line-height: 20px;
      }
      :global(p a) {
        text-decoration: underline;
      }
    }

    @include screen-size("small") {
    }
  }

  :global(.zoomable .swiper-slide) {
    background: #f2f2f2;
  }
</style>
