<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 33.24 64.33"
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
    <clipPath>
      <rect class="cls-1" width="33.24" height="64.33" />
    </clipPath>
  </defs>
  <title>faviconArtboard 4 copy</title>
  <g class="cls-2">
    <polyline class="cls-3" points="0.53 0.53 32.19 32.16 0.53 63.8" />
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
