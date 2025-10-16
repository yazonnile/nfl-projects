<script lang="ts">
  import { page } from '$app/state';
  import type { RouteId } from '$app/types';
  import BackButton from './back-button.svelte';
  import Button from './button.svelte';

  interface Link {
    text: string;
    href: string;
  }

  export interface TopMenuProps {
    main: Array<Link & { sub?: Array<Link> }>;
    backButton: Link;
  }

  let { main, backButton }: TopMenuProps = $props();

  const routeId = $derived(page.url.pathname as RouteId);
  const subRoutes = $derived.by(() => {
    for (const { href, sub } of main) {
      if (routeId.startsWith(href)) {
        return sub ?? [];
      }
    }
    return [];
  });
</script>

<nav class="-mx-2 -mt-2 flex flex-row justify-between gap-4 bg-white/10 p-4">
  <div class="flex gap-2">
    <BackButton href={backButton.href}>{backButton.text}</BackButton>

    {#each main as { href, text }}
      <Button {href} active={routeId.startsWith(href)}>{text}</Button>
    {/each}
  </div>

  <div class="flex gap-2">
    {#each subRoutes as { href, text }}
      <Button {href} active={routeId.startsWith(href)}>{text}</Button>
    {/each}
  </div>
</nav>
