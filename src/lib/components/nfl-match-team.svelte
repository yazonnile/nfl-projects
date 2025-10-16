<script lang="ts">
  import { nflTeams } from '$lib/api-data/store';
  import { type ID } from '$lib/typing-utils/id';

  type Props = {
    teamId: ID;
    score: string;
    record: string;
  };

  let { teamId, score, record }: Props = $props();

  const teamData = $derived(nflTeams[teamId]);
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
      <div class="flex-1 self-end text-left text-sm font-bold">{record}</div>
    </div>
    <div class="flex-1 pr-0 text-right text-xl font-bold uppercase leading-6 tracking-wide">
      {score ?? '-'}
    </div>
    <div
      class="absolute inset-0 -z-10 h-full w-full opacity-50"
      style={`background: linear-gradient(to right, transparent 10%, #${teamData.color} 50%);`}
    ></div>
  </div>
{/if}
