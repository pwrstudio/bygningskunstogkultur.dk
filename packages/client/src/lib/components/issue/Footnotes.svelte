<script lang="ts">
  import type { Article, Footnote, Page } from "$lib/types"
  import { onMount } from "svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { extractFootnotes, scrollToHash } from "$lib/modules/utils"

  interface Props {
    article: Article | Page
    isPrint?: boolean
  }

  let { article, isPrint = false }: Props = $props()

  let footnotes = $derived(extractFootnotes(article.content?.content ?? []))

  function backLink(footnote: Footnote) {
    document
      .getElementById("link-" + footnote._key)
      ?.scrollIntoView({ behavior: "smooth" })
  }

  onMount(() => {
    // Scroll to and from footnotes when the hash changes
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
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
              aria-label={`Back to footnote ${index + 1}`}
              class="back-link"
              onclick={(_) => {
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
  @use "../../styles/variables.scss" as *;

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
