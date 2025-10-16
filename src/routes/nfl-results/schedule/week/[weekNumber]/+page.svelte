<script lang="ts">
  import NflWeek from '$lib/components/nfl-week.svelte';
  import type { PageProps } from './$types';

  let { params }: PageProps = $props();
  let weekNumber = $derived(Number(params.weekNumber));
</script>

<svelte:head>
  <title>NFL Schedule - Week {weekNumber}</title>
</svelte:head>

<NflWeek {weekNumber} />
