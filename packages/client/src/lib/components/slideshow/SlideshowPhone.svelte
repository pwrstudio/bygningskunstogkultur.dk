<script lang="ts">
  import type { Slide } from "#lib/types/index.js"
  import {
    urlFor,
    hasAsset,
    renderBlockText,
    toPlainText,
  } from "#lib/modules/sanity/index.js"
  import { onDestroy, onMount } from "svelte"
  import Swiper from "swiper"
  import { Pagination, Navigation } from "swiper/modules"

  import "swiper/swiper-bundle.css"
  import "swiper/css/navigation"
  import "swiper/css/pagination"

  interface Props {
    slides?: any
    zoomable?: boolean
    mobile?: boolean
  }

  let {
    slides = [] as Slide[],
    zoomable = false,
    mobile = false,
  }: Props = $props()

  let swiperContainer = $state<HTMLDivElement>()
  let swiperInstance: Swiper | undefined
  let zoomed = $state(false)
  let zoomLevel = $state(1)

  const toggleZoomButton = () => {
    if (swiperInstance?.slides[swiperInstance.activeIndex]) {
      zoomed = !zoomed
      zoomLevel = zoomLevel === 1 ? 2 : 1
    }
  }

  const toggleZoom = () => {
    const swiper = swiperInstance
    if (swiper?.clickedSlide) {
      if (zoomable) {
        zoomed = !zoomed
        zoomLevel = zoomLevel === 1 ? 2 : 1
      } else {
        swiper.slideNext()
      }
    }
  }

  onMount(() => {
    if (!swiperContainer) return
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

  onDestroy(() => swiperInstance?.destroy())
</script>

<div class="slideshow" class:zoomable>
  <div class="swiper-container" bind:this={swiperContainer}>
    <div class="swiper-wrapper">
      {#each slides.filter(hasAsset) as slide}
        <div class="swiper-slide" onclick={toggleZoom} role="presentation">
          {#if zoomable}
            <div class="zoom-container" class:zoomed>
              <img
                class="slide-img zoomable"
                class:zoomed
                src={urlFor(slide.asset).quality(90).auto("format").url()}
                alt={toPlainText(slide.caption?.content ?? [])}
              />
            </div>
          {:else}
            <div class="img-container">
              <img
                class="slide-img contain"
                src={urlFor(slide.asset)
                  .quality(90)
                  .width(1200)
                  .auto("format")
                  .url()}
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
      <div class={"custom-pagination"}></div>
      <!-- Zoom level -->
      {#if zoomable}
        <div class="zoomLevel">
          <button class="button" onclick={toggleZoomButton}>
            {`${zoomLevel * 100}%`}[±]
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @use "../../styles/variables.scss" as *;

  .slideshow {
    height: 60dvh;
    position: relative;

    .zoomLevel {
      padding-top: var(--margin-xs);

      .button {
        cursor: pointer;
      }
    }

    .bottom {
      height: var(--margin);
      position: absolute;
      bottom: 0;
      top: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
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
      height: 100%;
    }

    :global(.swiper-slide) {
      height: auto;
      user-select: none;
    }

    :global(.img-container) {
      width: 100%;
      height: 80%;
      max-height: calc(100dvh - var(--margin) * 2.5);
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      justify-content: space-between;

      @include screen-size("phone") {
        justify-content: center;
      }

      :global(.slide-img) {
        width: 100%;
        height: 100%;
        object-fit: contain;
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
      width: 200dvw;
      height: auto;
    }

    .caption {
      bottom: 0;
      margin-right: 40px;
      padding-top: 1em;
      padding-inline: 1em;
      :global(p) {
        font-size: var(--font-size-semi-small);
        line-height: 16px;
      }
      :global(p a) {
        text-decoration: underline;
      }
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
    width: auto;
  }
</style>
