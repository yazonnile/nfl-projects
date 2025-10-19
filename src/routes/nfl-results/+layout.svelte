<script lang="ts">
  import TopMenu from '$lib/components/top-menu.svelte';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import Button from '$lib/components/button.svelte';
  import BackButton from '$lib/components/back-button.svelte';
  import SpoilerButton from '$lib/components/spoiler/spoiler-button.svelte';
  import WeekDateButton from '$lib/components/week-date/week-date-button.svelte';

  let { children } = $props();

  const routeId = $derived(page.url.pathname);
  const isActive = (href: string) => routeId.startsWith(href);
</script>

<TopMenu>
  <div class="flex items-start gap-2">
    <BackButton href={resolve('/fantasy/')}>Fantasy</BackButton>
    <Button
      href={resolve('/nfl-results/standing/')}
      active={isActive(resolve('/nfl-results/standing/'))}>Standing</Button
    >
    <Button
      href={resolve('/nfl-results/schedule/')}
      active={isActive(resolve('/nfl-results/schedule/'))}>Schedule</Button
    >
    <!-- <Button href={resolve('/nfl-results/stats/')} active={isActive(resolve('/nfl-results/stats/'))}
      >Stats</Button
    > -->
  </div>

  <div class="flex items-start gap-2">
    {#if isActive(resolve('/nfl-results/standing/'))}
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
    {:else if isActive(resolve('/nfl-results/schedule/'))}
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
      <!-- {:else if isActive(resolve('/nfl-results/stats/'))}
      <Button
        href={resolve('/nfl-results/stats/top/')}
        active={isActive(resolve('/nfl-results/stats/top/'))}>Top</Button
      >
      <Button
        href={resolve('/nfl-results/stats/rookie/')}
        active={isActive(resolve('/nfl-results/stats/rookie/'))}>Rookie</Button
      > -->
    {/if}
  </div>
</TopMenu>

{@render children?.()}

<!--
screenshot
spoilers
date/time
 -->
