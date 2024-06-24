<script lang="ts">
  import type { Article, Issue } from "$lib/types/sanity.types"
  import { renderBlockText, urlFor } from "$lib/modules/sanity"
  import { calculateArticleReadingTime } from "$lib/modules/utils"
  import { get } from "lodash-es"
  import Footnotes from "$lib/components/issue/Footnotes.svelte"

  export let post: Article
  export let issue: Issue
</script>

<div class="print-article">
  <!-- HEADER -->
  <header>
    <div class="top-bar">
      <div>Magasin for Bygningskunst og Kultur</div>
      <div>{issue.title}</div>
    </div>
    <!-- TITLE -->
    <div class="title">
      {post.title}
    </div>
    <!-- BYLINE -->
    <div class="byline">
      <div class="text">
        {@html renderBlockText(post.byline?.content ?? [])}

        {#if post.author}
          <div class="author">
            <p class="normal">{post.author}</p>
          </div>
        {/if}
        <!-- READING TIME -->
        <div class="reading-time">
          <p class="normal">{calculateArticleReadingTime(post)} min</p>
        </div>
      </div>
    </div>
  </header>
  <!-- CONTENT -->
  <div class="content">
    {@html renderBlockText(get(post, "content.content", []))}
  </div>
  <!-- FOOTNOTES -->
  <div class="footnotes">
    <Footnotes article={post} isPrint />
  </div>
  <!-- IMAGES -->
  <div class="images">
    {#if post.slideshow && post.slideshow.length > 0}
      {#each post.slideshow as slide}
        <div class="print-img">
          <img src={urlFor(slide.asset).quality(90).width(1200).url()} alt="" />
          {#if slide.caption}
            <div class="caption">
              {@html renderBlockText(get(slide, "caption.content", []))}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/variables.scss";

  .print-article {
    @media print {
      page-break-after: always;
    }
  }

  header {
    width: 100%;
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  :global(.print-article .content div p) {
    font-family: var(--sans-stack);
    font-size: var(--font-size-print) !important;
    line-height: 1.3em;
  }

  :global(.print-article .author p) {
    margin-bottom: 0;
  }

  :global(.print-article .reading-time p) {
    margin-bottom: 0;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  .title {
    margin-top: 0.5em;
    font-size: 48px;
    margin-bottom: 0.5em;
    line-height: normal;
  }

  .footnotes {
    border-top: 1px solid var(--black);
    padding-top: 1em;
    margin-top: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--black);
    margin-bottom: 2em;
  }

  :global(.print-article .footnotes p) {
    font-size: 13px;
  }

  .print-img {
    width: 100%;
    overflow: hidden;
    margin-bottom: 2em;
  }

  :global(.print-img img) {
    max-width: 100%;
  }
</style>
