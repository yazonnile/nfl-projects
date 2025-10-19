<script lang="ts">
  import type { Snippet } from 'svelte';
  import { spoilerState } from './spoiler-state.svelte';

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

{#if spoilerState.enabled}
  {@render children()}
{/if}
