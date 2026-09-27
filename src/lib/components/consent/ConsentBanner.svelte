<script lang="ts">
  import { onMount } from "svelte"
  import {
    consentBannerOpen,
    initConsent,
    setConsent,
  } from "$lib/modules/analytics"

  onMount(initConsent)
</script>

{#if $consentBannerOpen}
  <section class="consent-banner" aria-label="Cookies">
    <p class="text">
      Vi vil gerne bruge cookies fra Google Analytics til at måle, hvordan
      magasinet bliver læst. Oplysningerne sendes til Google. Du kan altid ændre
      dit valg under Kolofon i menuen.
    </p>
    <div class="buttons">
      <button class="button" on:click={() => setConsent("denied")}>
        Afvis
      </button>
      <button class="button" on:click={() => setConsent("granted")}>
        Accepter
      </button>
    </div>
  </section>
{/if}

<style lang="scss">
  @use "../../styles/variables.scss" as *;

  .consent-banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100001; // Above the menu
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--margin);
    padding: calc(var(--margin) / 2) var(--margin);
    background: var(--white);
    border-top: var(--border-black);
    font-family: var(--sans-stack);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);

    @include screen-size("phone") {
      flex-flow: column;
      align-items: stretch;
      gap: var(--phone-margin);
      padding: var(--phone-margin);
    }

    @media print {
      display: none;
    }
  }

  .text {
    margin: 0;
    max-width: var(--text-width);
  }

  .buttons {
    display: flex;
    gap: var(--margin-xs);
    margin-left: auto;
    flex-shrink: 0;

    @include screen-size("phone") {
      margin-left: 0;
    }
  }

  // Both choices get the same weight
  .button {
    min-width: 120px;
    height: 3em;
    padding: 0 var(--margin-xs);
    border: var(--border-black);
    text-align: center;
    text-transform: uppercase;
    font-size: var(--font-size-small);
    cursor: pointer;

    &:hover {
      background: var(--black);
      color: var(--white);
    }

    @include screen-size("phone") {
      flex: 1;
    }
  }
</style>
