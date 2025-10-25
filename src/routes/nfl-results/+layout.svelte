<script lang="ts">
  import TopMenu from '$lib/components/top-menu.svelte';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import Button from '$lib/components/button.svelte';
  import BackButton from '$lib/components/back-button.svelte';
  import Divider from '$lib/components/divider.svelte';

  let { children } = $props();

  const routeId = $derived(page.url.pathname);
  const isActive = (href: string) => routeId.startsWith(href);
</script>

<TopMenu>
  <div
    class="flex flex-row flex-wrap justify-center gap-2 sm:items-start lg:justify-start [&>*]:w-[calc(33%-16px/3)] sm:[&>*]:w-auto"
  >
    <BackButton href={resolve('/fantasy/')}>Fantasy</BackButton>
    <Button
      href={resolve('/nfl-results/standing/')}
      active={isActive(resolve('/nfl-results/standing/'))}>Standing</Button
    >
    <Button
      href={resolve('/nfl-results/schedule/')}
      active={isActive(resolve('/nfl-results/schedule/'))}>Schedule</Button
    >
    <Button
      href={resolve('/nfl-results/leaders/')}
      active={isActive(resolve('/nfl-results/leaders/'))}>Leaders</Button
    >
  </div>

  {#if isActive(resolve('/nfl-results/standing/'))}
    <Divider />
    <div
      class="flex flex-row flex-wrap justify-center gap-2 sm:items-start lg:justify-start [&>*]:w-[calc(33%-16px/3)] sm:[&>*]:w-auto"
    >
      <Button
        href={resolve('/nfl-results/standing/overall/')}
        active={isActive(resolve('/nfl-results/standing/overall/'))}>Overall</Button
      >
      <Button
        href={resolve('/nfl-results/standing/conference/')}
        active={isActive(resolve('/nfl-results/standing/conference/'))}>Conference</Button
      >
      <Button
        href={resolve('/nfl-results/standing/division/')}
        active={isActive(resolve('/nfl-results/standing/division/'))}>Division</Button
      >
    </div>
  {:else if isActive(resolve('/nfl-results/schedule/'))}
    <Divider />
    <div
      class="flex flex-row flex-wrap justify-center gap-2 sm:items-start lg:justify-start [&>*]:w-[calc(33%-16px/3)] sm:[&>*]:w-auto"
    >
      <Button
        href={resolve('/nfl-results/schedule/week/')}
        active={isActive(resolve('/nfl-results/schedule/week/'))}>Week</Button
      >
      <Button
        href={resolve('/nfl-results/schedule/team/')}
        active={isActive(resolve('/nfl-results/schedule/team/'))}>Team</Button
      >
      <Button
        href={resolve('/nfl-results/schedule/division/')}
        active={isActive(resolve('/nfl-results/schedule/division/'))}>Division</Button
      >
    </div>
  {/if}

  {#if typeof children === 'function'}
    <Divider class="last:hidden" />
  {/if}
</TopMenu>

{@render children?.()}

<!--
screenshot
spoilers
date/time
 -->
