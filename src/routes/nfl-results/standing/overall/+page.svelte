<script lang="ts">
  import { nflTeams, nflStanding } from '$lib/api-data/store';
  import NflGroup from '$lib/components/nfl-group.svelte';

  const teamsIds = Object.keys(nflTeams).sort(
    (a, b) => nflStanding[a].overallSeed - nflStanding[b].overallSeed
  );
</script>

<main class="flex flex-wrap justify-center py-2 sm:py-4">
  <NflGroup name="Overall" abbreviation="OVR" {teamsIds} class="w-full" />
</main>
