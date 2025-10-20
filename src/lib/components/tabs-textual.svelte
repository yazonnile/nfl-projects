<script lang="ts">
  import { page } from '$app/state';
  import type { RouteId } from '$app/types';

  type Props = {
    tabs: Array<{ href: string; text: string }>;
  };

  let { tabs }: Props = $props();
  const routeId = $derived(page.url.pathname as RouteId);
  const isActiveTab = (href: string) => href === routeId;
</script>

<nav class="-mx-2 flex flex-wrap justify-center gap-2 bg-white/10 px-2 pb-2 lg:px-4 lg:pb-4">
  {#each tabs as { href, text }}
    <a
      {href}
      class="w-[calc(20% - 8px)] font-inherit text-(--text-light) border-1 min-w-10 cursor-pointer rounded border-gray-500 px-2 py-1 text-center font-bold uppercase hover:border-white"
      class:bg-(--bg-primary-active)!={isActiveTab(href)}
    >
      {text}
    </a>
  {/each}
</nav>
