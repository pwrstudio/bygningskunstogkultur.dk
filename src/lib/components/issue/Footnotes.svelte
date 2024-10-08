<script lang="ts">
  import type { Article, Footnote, Page } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { extractFootnotes, scrollToHash } from "$lib/modules/utils"

  export let article: Article | Page
  export let isPrint: boolean = false

  $: footnotes = extractFootnotes(article.content?.content ?? [])

  function backLink(footnote: Footnote) {
    let backLinkTarget = document.querySelector("#" + "link-" + footnote._key)
    if (backLinkTarget) {
      backLinkTarget.scrollIntoView({ behavior: "smooth" })
    }
  }

  onMount(() => {
    // Listen to changes to the hash to scroll to and from footnotes
    window.addEventListener("hashchange", scrollToHash)
  })
</script>

{#if footnotes && footnotes.length > 0}
  <div class="footnotes">
    <div class="footnotes-header">NOTER</div>
    <ol>
      {#each footnotes as footnote, index}
        <li id={"note-" + footnote._key}>
          {@html renderBlockText(footnote.content?.content ?? [])}
          {#if !isPrint}
            <button
              aria-label={"Go to footnote " + index + 1}
              class="back-link"
              on:click={_ => {
                backLink(footnote)
              }}
            >
              ↩
            </button>
          {/if}
        </li>
      {/each}
    </ol>
  </div>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .footnotes {
    font-size: var(--font-size-small);
    padding-bottom: 4em;
    width: 100%;
    overflow: hidden;

    @include screen-size("phone") {
      padding-bottom: 0;
    }

    :global(p) {
      font-size: 16px;
      line-height: 20px;
      display: inline;
      margin-bottom: 0;
    }

    ol {
      li {
        padding-left: 20px;
        margin-bottom: 10px;
      }
    }
  }

  .footnotes-header {
    margin-left: 1em;
  }

  .back-link {
    cursor: pointer;
    font-size: 12px;
  }
</style>
