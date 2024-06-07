<svg
  class="icon"
  id="Layer_1"
  data-name="Layer 1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 64.33 33.24"
>
  <defs>
    <style>
      .cls-1,
      .cls-3 {
        fill: none;
      }

      .cls-2 {
        clip-path: url(#clip-path);
      }

      .cls-3 {
        stroke: #231f20;
        stroke-width: 1.5px;
      }
    </style>
    <clipPath id="clip-path">
      <rect class="cls-1" width="64.33" height="33.24" />
    </clipPath>
  </defs>
  <title>Arrow Down</title>
  <g class="cls-2">
    <polyline class="cls-3" points="63.8 0.53 32.16 32.19 0.53 0.53" />
  </g>
</svg>

<style lang="scss">
  @import "../../styles/variables.scss";

  svg {
    &:hover {
      rect {
        fill: var(--grey-solid);
      }
      @include screen-size("small") {
        rect {
          fill: black;
        }
      }
    }
    &:active {
      rect {
        fill: var(--grey-solid);
      }
    }
  }
</style>
