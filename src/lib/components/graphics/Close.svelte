<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  height="100%"
  viewBox="0 0 34 34"
  style="overflow:visible;enable-background:new 0 0 34 34;"
  xml:space="preserve"
>
  <rect
    x="-3.1"
    y="13"
    transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.0509 17.0224)"
    width="40.2"
    height="8"
  />
  <rect
    x="-3.1"
    y="13"
    transform="matrix(0.7071 0.7071 -0.7071 0.7071 17.0224 -7.0509)"
    width="40.2"
    height="8"
  />
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
