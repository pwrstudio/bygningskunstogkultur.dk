<script lang="ts">
  import type { VideoBlock } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { get, has } from "lodash-es"

  export let block: VideoBlock

  const videoUrl =
    "https://cdn.sanity.io/files/yesqrmft/production/" +
    get(block, "videoFile.asset._ref", "")
      .replace("file-", "")
      .replace("-mp4", ".mp4")

  // // *** DOM REFERENCES
  let videoEl: HTMLVideoElement

  // *** VARIABLES
  let time = 0
  let duration = 0
  let paused = true
  let showControls = true
  let showControlsTimeout: ReturnType<typeof setTimeout>
  let controlsTimeoutDuration = 1500

  function handleMousemove(e: MouseEvent & { currentTarget: HTMLElement }) {
    // Make the controls visible, but fade out after
    // 1.5 seconds of inactivity
    clearTimeout(showControlsTimeout)
    showControlsTimeout = setTimeout(
      () => (showControls = false),
      controlsTimeoutDuration,
    )
    showControls = true

    if (e.which !== 1) return // mouse not down
    if (!duration) return // video not loaded yet

    const { left, right } = e.currentTarget.getBoundingClientRect()
    time = (duration * (e.clientX - left)) / (right - left)
  }

  function handleMousedown(e: MouseEvent) {
    if (!e.target) return
    const target: EventTarget = e.target

    function handleMouseup() {
      if (paused) {
        videoEl.play()
      } else {
        videoEl.pause()
      }
      cancel()
    }

    function cancel() {
      target.removeEventListener("mouseup", handleMouseup)
    }

    target.addEventListener("mouseup", handleMouseup)

    setTimeout(cancel, 200)
  }

  // *** ON MOUNT
  onMount(async () => {
    if (block.autoPlay) {
      let promise = videoEl.play()
      if (promise !== undefined) {
        promise.catch((err) => {
          console.log(err)
        })
      }
    }
  })
</script>

<figure
  class="video"
  class:padded={has(block, "backgroundColor.hex")}
  style={"background: " + get(block, "backgroundColor.hex", "transparent")}
>
  <video
    class="video-player"
    preload="metadata"
    loop={true}
    muted={block.autoPlay}
    src={videoUrl}
    on:mousemove={handleMousemove}
    on:mousedown={handleMousedown}
    bind:currentTime={time}
    bind:duration
    bind:paused
    bind:this={videoEl}
  ></video>

  {#if !block.autoPlay}
    <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
      <div class="buttons">
        {#if paused}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="0.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-play play"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="0.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-pause pause"
          >
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        {/if}
      </div>
    </div>
  {/if}
</figure>

<style lang="scss">
  @use "../../styles/variables.scss" as *;

  .video {
    width: var(--text-width);
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: var(--font-size-small);
    line-height: var(--line-height);
    font-family: var(--sans-stack);
    margin-bottom: var(--line-height);
    margin-top: var(--line-height);
    color: var(--white);

    position: relative;
    display: flex;
    justify-content: center;

    cursor: pointer;

    .controls {
      transition: opacity 1s;
    }

    .buttons {
      position: absolute;
      position: absolute;
      top: 50%;
      left: 50%;

      width: 160px;
      height: 160px;

      @include screen-size("small") {
        width: 80px;
        height: 80px;
      }

      transform: translateX(-50%) translateY(-50%);
      pointer-events: none;

      color: white;

      svg {
        width: 100%;
      }
    }

    .play {
      position: relative;
      left: 4px;
    }
  }
</style>
