<script lang="ts">
  import { currentDateAndTime } from "$lib/modules/utils"
</script>

<div class="output-info">
  Created at {currentDateAndTime()}
</div>

<style lang="scss">
  .output-info {
    border-top: 1px solid var(--black);
    padding-top: 1em;
    font-size: var(--font-size-small);
  }
</style>
