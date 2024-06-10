<script lang="ts">
  import type { AudioBlock } from "$lib/types/sanity.types"
  import { get } from "lodash-es"

  export let block: AudioBlock

  const audioUrl =
    "https://cdn.sanity.io/files/yesqrmft/production/" +
    get(block, "audioFile.asset._ref", "")
      .replace("file-", "")
      .replace("-mp3", ".mp3")

  let time = 0
  let duration = 0
  let paused = true
  const controlsTimeoutDuration = 2500

  let audioEl: HTMLAudioElement

  function handleMousemove(e: MouseEvent) {
    if (e.which !== 1) return // mouse not down
    if (!duration) return // audio not loaded yet
    const { left, right } = this.getBoundingClientRect()
    time = (duration * (e.clientX - left)) / (right - left)
  }

  function handleMousedown(e: MouseEvent) {
    if (!e.target) return

    function handleMouseup() {
      if (paused) audioEl.play()
      else audioEl.pause()
      cancel()
    }

    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup)
    }

    e.target.addEventListener("mouseup", handleMouseup)

    setTimeout(cancel, 200)
  }

  const format = (seconds: number): string => {
    if (isNaN(seconds)) return "..."
    const minutes = Math.floor(seconds / 60)
    let remainingSeconds = Math.floor(seconds % 60)
    let secondsString =
      remainingSeconds < 10
        ? "0" + remainingSeconds
        : remainingSeconds.toString()
    return `${minutes}:${secondsString}`
  }
</script>

<div class="audio-container">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:mousemove={handleMousemove}
    on:mousedown={handleMousedown}
    class="audio"
  >
    <audio
      class="audio-player"
      preload="auto"
      src={audioUrl}
      bind:currentTime={time}
      bind:duration
      bind:paused
      bind:this={audioEl}
    />

    <div class="top-text">
      {#if block.title}
        <div class="audio-title">{block.title}</div>
      {/if}
      <div class="audio-toggle right">{paused ? "PLAY" : "PAUSE"}</div>
    </div>

    <progress value={time / duration || 0} />

    <div class="bottom-text">
      <div class="current-time">{format(time)}</div>
      <div class="total-time right">{format(duration)}</div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .audio-container {
    width: var(--text-width);
    margin-left: auto;
    margin-right: auto;

    @include screen-size("small") {
      width: 100%;
    }

    .audio {
      height: calc(var(--line-height) * 3);
      width: 100%;
      display: block;
      color: black;
      line-height: var(--line-height);
      font-family: var(--sans-stack);
      margin-bottom: var(--line-height);
      margin-top: var(--line-height);
      user-select: none;

      cursor: pointer;

      &:active {
        cursor: grab;
      }
    }

    .top-text,
    .bottom-text {
      height: var(--line-height);
      font-size: var(--font-size-small);
      div {
        width: 50%;
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: calc(var(--line-height) * 2);
        &.right {
          float: right;
          text-align: right;
        }
      }
    }

    progress {
      display: block;
      width: 100%;
      height: calc(var(--line-height) * 2);
      z-index: 80;
      -webkit-appearance: none;
      appearance: none;

      &::-webkit-progress-value {
        background-color: #a4a4a4;
      }

      &::-webkit-progress-bar {
        background-color: #c4c4c4;
      }
    }
  }
</style>
