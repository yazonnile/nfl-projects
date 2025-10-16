<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import nflBg from '$lib/assets/nfl-bg.jpeg';
  import '$lib/assets/app.css';

  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div id="app" class={`relative min-h-screen`}>
  {@render children?.()}

  <img
    src={nflBg}
    alt="NFL Background"
    class="-z-1 blur-xs pointer-events-none fixed inset-0 top-0 h-screen w-full object-cover opacity-10"
  />
</div>
