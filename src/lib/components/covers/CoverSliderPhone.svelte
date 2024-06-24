<script lang="ts">
  import type { Issue } from "$lib/types/sanity.types"
  import Swiper from "swiper"
  import { Pagination, Navigation } from "swiper/modules"
  import { onMount } from "svelte"
  import { get } from "lodash-es"
  import { mapValue } from "$lib/modules/utils"
  import { windowWidth } from "$lib/modules/stores"
  import Cover from "$lib/components/covers/Cover.svelte"

  import "swiper/swiper-bundle.css"
  import "swiper/css/navigation"
  import "swiper/css/pagination"

  export let issues: Issue[] = []

  let coverScale = 1
  let loaded = false

  let swiperMobileElement: HTMLDivElement
  let swiperMobile: Swiper

  // Not exactly sure how this reactive statement works...
  $: if ($windowWidth < 400) {
    coverScale = mapValue($windowWidth, 80, 440, 0, 0.8)
  }

  async function initializeSwipers() {
    if (swiperMobile) swiperMobile.destroy()

    swiperMobile = new Swiper(swiperMobileElement, {
      modules: [Navigation, Pagination],
      touchRatio: 1,
      pagination: {
        el: ".custom-pagination-mobile",
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 10,
    })
  }

  onMount(async () => {
    initializeSwipers()
    // Loading delay to avoid flickering
    await new Promise(resolve => setTimeout(resolve, 100))
    loaded = true
  })
</script>

<div class="coverslider" class:loaded>
  <!-- ARROWS -->
  <div class="middle">
    <!-- SWIPER MOBILE -->
    <div class="swiper-mobile">
      <div class="swiper-container" bind:this={swiperMobileElement}>
        <div class="swiper-wrapper">
          {#each issues.filter(issue => get(issue, "tableOfContents", []).length > 0) as issue}
            <div class="swiper-slide">
              <Cover {issue} scale={coverScale} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- PAGINATION -->
  <div class="bottom">
    <div class="custom-pagination-mobile" />
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .custom-pagination-mobile {
    width: auto;
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
      width: 100%;
      overflow: hidden;
    }

    :global(.swiper-slide) {
      display: flex;
      justify-content: center;
      width: 100% !important;
    }

    :global(.swiper-wrapper) {
      display: flex;
    }

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
      height: 90%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }
</style>
