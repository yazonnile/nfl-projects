<script lang="ts">
  import type { Snippet } from 'svelte';

  interface TopMenuProps {
    children: Snippet;
  }

  let { children }: TopMenuProps = $props();
</script>

<nav
  class="-mx-2 -mt-2 flex flex-col justify-center gap-2 bg-white/10 p-2 lg:flex-row lg:justify-between lg:p-4"
>
  {@render children()}
</nav>
