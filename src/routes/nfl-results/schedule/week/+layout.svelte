<script lang="ts">
  import { nflWeeks } from '$lib/api-data/store';
  import TabsTextual from '$lib/components/tabs-textual.svelte';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();

  const weeks = Object.values(nflWeeks);

  console.log(weeks);
</script>

<svelte:head>
  <title>NFL Schedule by Week</title>
</svelte:head>

<TabsTextual
  tabs={weeks.map((week) => ({
    text: week.number.toString(),
    href: `/nfl-results/schedule/week/${week.id}`
  }))}
/>

{@render children?.()}
