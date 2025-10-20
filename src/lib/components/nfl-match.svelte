<script lang="ts">
  import { nflMatches, weekNumber } from '$lib/api-data/store';
  import { type ID } from '$lib/typing-utils/id';
  import NflMatchTeam from './nfl-match-team.svelte';

  type Props = {
    matchId: ID;
  };

  let { matchId }: Props = $props();

  const matchData = $derived(nflMatches[matchId]);
  const showRecord = $derived(Number(matchData.weekId) < weekNumber);
</script>

<div class="flex flex-col rounded-md border border-gray-200">
  <NflMatchTeam
    teamId={matchData.competitors.home.teamId}
    score={matchData.competitors.home.score}
    record={showRecord ? matchData.competitors.home.record : null}
  />
  <NflMatchTeam
    teamId={matchData.competitors.away.teamId}
    score={matchData.competitors.away.score}
    record={showRecord ? matchData.competitors.away.record : null}
  />
</div>
