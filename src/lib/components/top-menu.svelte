<script lang="ts">
  import type { Snippet } from 'svelte';

  interface TopMenuProps {
    children: Snippet;
  }

  let { children }: TopMenuProps = $props();
</script>

<nav class="-mx-2 -mt-2 flex flex-row justify-between gap-4 bg-white/10 p-4">
  {@render children()}
</nav>
