<script lang="ts">
  import { page } from "$app/stores"
</script>

<div class="error">
  <div>
    <div>
      {$page.status === 404
        ? "Page not found"
        : ($page.error?.message ?? "Something went wrong")}
    </div>
    <div>Go back to <a href="/">Landing page</a></div>
  </div>
</div>

<style lang="scss">
  .error {
    padding-left: calc(var(--menu-side-width) + var(--margin));
    padding-top: var(--margin);
    height: 100dvh;
    font-family: var(--sans-stack);
    font-size: var(--font-size-large);

    a {
      color: var(--green);
      text-decoration: none;
      &:hover {
        color: var(--black);
      }
    }
  }
</style>
