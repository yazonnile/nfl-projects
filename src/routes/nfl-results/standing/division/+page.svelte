<script lang="ts">
  import { nflStanding, nflDivisions } from '$lib/api-data/store';
  import NflGroup from '$lib/components/nfl-group.svelte';
  import type { ID } from '$lib/typing-utils/id';

  const getTeamsIds = (teamsIds: Array<ID>) => {
    return teamsIds.sort((a, b) => nflStanding[a].overallSeed - nflStanding[b].overallSeed);
  };
</script>

<main class="flex flex-wrap justify-around p-4">
  {#each Object.values(nflDivisions) as division}
    <NflGroup name={division.name} teamsIds={getTeamsIds(division.teamsIds)} />
  {/each}
</main>
