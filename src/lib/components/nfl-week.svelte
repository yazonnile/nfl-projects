<script lang="ts">
  import { nflMatches, nflWeeks } from '$lib/api-data/store';
  import NflMatch from './nfl-match.svelte';
  import NflWeekTeamsOnBye from './nfl-week-teams-on-bye.svelte';
  import type { ID } from '$lib/typing-utils/id';

  type Props = {
    weekNumber: number;
    allowedTeamsIds?: Array<ID>;
  };

  let { weekNumber, allowedTeamsIds }: Props = $props();

  const { matches, teamsOnBye } = $derived(nflWeeks[weekNumber]);

  const filteredMatches = $derived(
    typeof allowedTeamsIds === 'undefined'
      ? matches
      : matches.filter((matchId) => {
          const { competitors } = nflMatches[matchId];
          return (
            allowedTeamsIds?.includes(competitors.home.teamId) ||
            allowedTeamsIds?.includes(competitors.away.teamId)
          );
        })
  );
</script>

<div class="flex flex-col items-center gap-2 p-4">
  <h1 class="mb-2 text-2xl font-bold">Week {weekNumber}</h1>

  <NflWeekTeamsOnBye {teamsOnBye} />

  <div
    class="grid w-full justify-center gap-4 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]"
  >
    {#each filteredMatches as matchId}
      <NflMatch {matchId} />
    {/each}
  </div>
</div>
