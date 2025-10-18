<script lang="ts">
  import { nflTeams, nflStanding } from '$lib/api-data/store';
  import NflGroup from '$lib/components/nfl-group.svelte';

  const teamsIds = Object.keys(nflTeams).sort(
    (a, b) => nflStanding[a].overallSeed - nflStanding[b].overallSeed
  );
</script>

<main class="flex flex-wrap justify-around p-4">
  <NflGroup name="Overall" {teamsIds} />
</main>
