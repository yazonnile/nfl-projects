<script lang="ts">
  import { nflTeams, nflStanding } from '$lib/api-data/store';
  import { type NflCompetitor } from '$lib/models/nfl-competitor';
  import { type ID } from '$lib/typing-utils/id';
  import Spoiler from './spoiler/spoiler.svelte';

  type Props = {
    teamId: ID;
    score: NflCompetitor['score'];
    record: NflCompetitor['record'];
  };

  let { teamId, score, record }: Props = $props();

  const teamData = $derived(nflTeams[teamId]);
  const teamStanding = $derived(nflStanding[teamId]);
  const teamRecord = $derived.by(() => {
    if (teamStanding.ties) {
      return `${teamStanding.wins}-${teamStanding.ties}-${teamStanding.losses}`;
    }

    return `${teamStanding.wins}-${teamStanding.losses}`;
  });
</script>

{#if teamData}
  <div
    class="relative flex flex-1 flex-row flex-nowrap items-center justify-end overflow-hidden px-2 py-0.5 text-white"
  >
    <div
      class="mr-2 h-10 w-10 flex-shrink-0 bg-contain bg-center bg-no-repeat"
      style:background-image={`url(${teamData.logos.default})`}
    ></div>
    <div class="flex items-end">
      <div class="flex-none pr-1 text-left text-xl font-bold uppercase leading-6 tracking-wide">
        {teamData.name}
      </div>
      <div class="flex-1 self-end text-left text-sm font-bold">
        <Spoiler>{record ? `${teamRecord} (${record})` : teamRecord}</Spoiler>
      </div>
    </div>
    <div class="flex-1 pr-0 text-right text-xl font-bold uppercase leading-6 tracking-wide">
      <Spoiler>{score ?? '-'}</Spoiler>
    </div>
    <div
      class="absolute inset-0 -z-10 h-full w-full opacity-50"
      style={`background: linear-gradient(to right, transparent 10%, #${teamData.color} 50%);`}
    ></div>
  </div>
{/if}
