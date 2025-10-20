<script lang="ts">
  import Button from '../button.svelte';
  import { showResultsState } from './show-results-state.svelte';
  import ToggleActiveIcon from '$lib/components/icons/toggle-active.svelte';
  import ToggleIcon from '$lib/components/icons/toggle.svelte';
</script>

<Button onclick={showResultsState.toggle} active={showResultsState.enabled}>
  Show results
  {#if showResultsState.enabled}
    <ToggleActiveIcon class="-my-3 size-8 shrink-0" />
  {:else}
    <ToggleIcon class="-my-3 size-8 shrink-0" />
  {/if}
</Button>
