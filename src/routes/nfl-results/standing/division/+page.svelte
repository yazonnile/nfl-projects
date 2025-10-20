<script lang="ts">
  import { nflStanding, nflDivisions } from '$lib/api-data/store';
  import NflGroup from '$lib/components/nfl-group.svelte';
  import type { ID } from '$lib/typing-utils/id';

  const getTeamsIds = (teamsIds: Array<ID>) => {
    return teamsIds.sort((a, b) => nflStanding[a].overallSeed - nflStanding[b].overallSeed);
  };
</script>

<main class="-mx-2 flex w-[calc(100%+16px)] flex-wrap justify-center gap-4 p-2 sm:p-4">
  {#each Object.values(nflDivisions) as division}
    <NflGroup
      name={division.name}
      abbreviation={division.name.slice(0, 5) + '.'}
      teamsIds={getTeamsIds(division.teamsIds)}
      class="w-full lg:w-[calc(50%-8px)]"
    />
  {/each}
</main>
