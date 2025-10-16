<script lang="ts">
  import { nflMatches } from '$lib/api-data/store';
  import { type ID } from '$lib/typing-utils/id';
  import NflMatchTeam from './nfl-match-team.svelte';

  type Props = {
    matchId: ID;
  };

  let { matchId }: Props = $props();

  const matchData = $derived(nflMatches[matchId]);
</script>

<div class="rounded-md border border-gray-200">
  <NflMatchTeam
    teamId={matchData.competitors.home.teamId}
    score={matchData.competitors.home.score}
    record={matchData.competitors.home.record ?? ''}
  />
  <NflMatchTeam
    teamId={matchData.competitors.away.teamId}
    score={matchData.competitors.away.score}
    record={matchData.competitors.away.record ?? ''}
  />
</div>
