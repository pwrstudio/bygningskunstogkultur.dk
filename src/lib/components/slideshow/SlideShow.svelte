<script lang="ts">
  import type { Slide, SanityImageAsset } from "$lib/types/sanity.types"
  import { urlFor, renderBlockText, toPlainText } from "$lib/modules/sanity"
  import { onMount } from "svelte"
  import Swiper from "swiper"
  import { Pagination, Navigation } from "swiper/modules"
  import { windowWidth } from "$lib/modules/stores"

  import "swiper/swiper-bundle.css"
  import "swiper/css/navigation"
  import "swiper/css/pagination"

  export let slides = [] as Slide[]
  export let zoomable = false
  export let mobile = false

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

  // Checks in zoom containers if the original file is big enough, else falls back to a double $windowWidth image
  const zoomImgUrl = (asset: SanityImageAsset) => {
    try {
      // Setup regex for original
      const original = urlFor(asset).quality(90).url()
      const originalDims = /-(\d+)x(\d+)/

      // Setup regex for Double
      const double = urlFor(asset)
        .width($windowWidth * 2)
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
    swiperInstance = new Swiper(swiperContainer, {
      modules: [Pagination, Navigation],
      pagination: {
        el: ".custom-pagination",
        clickable: true,
      },
      spaceBetween: 20,
      autoHeight: mobile,
    })

    swiperInstance.on("slideChange", () => {
      zoomed = false
    })
  })

  let zoomed = false
  let zoomLevel = 1
</script>

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
                alt={toPlainText(slide.caption?.content ?? [])}
              />
            </div>
          {:else}
            <div class="img-container">
              <img
                class="slide-img contain"
                src={urlFor(slide.asset).quality(90).width(1200).url()}
                alt={toPlainText(slide.caption?.content ?? [])}
              />
              {#if slide.caption}
                <div class="caption">
                  {@html renderBlockText(slide.caption?.content ?? [])}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Bottom -->
    <div class="bottom">
      <!-- Pagination -->
      <div class={"custom-pagination"} />

      <!-- Zoom level -->
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
      height: var(--margin);
      position: relative;
      top: 40px;
    }

    .swiper-container {
      height: 100%;
      overflow: hidden;
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
      height: calc(90vh - var(--margin) * 2);

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
      max-height: calc(100vh - var(--margin) * 2.5);
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
      max-height: calc(100% - (var(--margin) * 2));
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
        font-size: var(--font-size-small);
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

  :global(.custom-pagination) {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
</style>
