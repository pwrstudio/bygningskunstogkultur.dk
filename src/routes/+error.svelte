<div class="error">
  <div>
    <div>Page not found</div>
    <div>Go back to <a href="/">Landing page</a></div>
  </div>
</div>

<style lang="scss">
  .error {
    padding-left: calc(var(--menu-side-width) + var(--margin));
    padding-top: var(--margin);
    height: 100vh;
    font-size: 3rem;
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
