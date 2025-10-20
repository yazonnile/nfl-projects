<script lang="ts">
  import { nflStanding, nflConferences, nflTeams } from '$lib/api-data/store';
  import NflGroup from '$lib/components/nfl-group.svelte';
  import type { ID } from '$lib/typing-utils/id';

  const getTeamsIds = (conferenceId: ID) => {
    return Object.keys(nflTeams)
      .filter((teamId: ID) => nflTeams[teamId].conferenceId === conferenceId)
      .sort((a, b) => nflStanding[a].playoffSeed - nflStanding[b].playoffSeed);
  };
</script>

<main class="-mx-2 flex w-[calc(100%+16px)] flex-wrap justify-center gap-4 p-2 sm:p-4">
  {#each Object.values(nflConferences) as conference}
    <NflGroup
      name={conference.abbreviation}
      abbreviation={conference.abbreviation}
      teamsIds={getTeamsIds(conference.id)}
      class="w-full lg:w-[calc(50%-8px)]"
    />
  {/each}
</main>
