<script lang="ts">
  import type { Snippet } from 'svelte';
  import { showResultsState } from './show-results-state.svelte';

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

{#if showResultsState.enabled}
  {@render children()}
{/if}
