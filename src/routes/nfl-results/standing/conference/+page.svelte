<script lang="ts">
  import { nflStanding, nflConferences, nflTeams } from '$lib/api-data/store';
  import NflGroup from '$lib/components/nfl-group.svelte';
  import type { ID } from '$lib/typing-utils/id';

  const getTeamsIds = (conferenceId: ID) => {
    return Object.keys(nflTeams)
      .filter((teamId: ID) => nflTeams[teamId].conferenceId === conferenceId)
      .toSorted((a, b) => nflStanding[a].playoffSeed - nflStanding[b].playoffSeed);
  };
</script>

<main class="flex flex-wrap justify-around p-4">
  {#each Object.values(nflConferences) as conference}
    <NflGroup name={conference.abbreviation} teamsIds={getTeamsIds(conference.id)} />
  {/each}
</main>
