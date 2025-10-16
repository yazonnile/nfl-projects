<script lang="ts">
  import { nflStanding, nflTeams } from '$lib/api-data/store';
  import type { ID } from '$lib/typing-utils/id';

  type Props = {
    name: string;
    teamsIds: Array<ID>;
  };

  let { name, teamsIds }: Props = $props();
</script>

<div
  class="mt-10 w-[calc(50%-10px)] max-w-[560px] first:mt-0 [&:nth-child(-n+2)]:mt-0 [&:only-child]:mx-auto [&:only-child]:w-[700px]"
>
  <table
    class="w-full border-collapse border border-white/25 uppercase [&_td]:p-1 [&_td]:text-center"
  >
    <thead>
      <tr class=" font-bold [&_td]:bg-white/25">
        <td class="w-5 text-right"></td>
        <td class="text-left! pl-3! w-auto min-w-[190px]"><b>{name}</b></td>
        <td class="w-[30px] border-l border-white/25">w</td>
        <td class="w-[30px]!">l</td>
        <td class="w-[30px]!">t</td>
        <td class="border-white/25! w-10 border-l">pct</td>
        <td class="border-white/25! w-10 border-l">pf</td>
        <td class="w-10!">pa</td>
        <td class="text-right! w-10">diff</td>
      </tr>
    </thead>
    <tbody>
      {#each teamsIds as teamId, index}
        {@const standing = nflStanding[teamId]}
        {@const team = nflTeams[teamId]}
        {@const pointDifferential = standing.pointsFor - standing.pointsAgainst}
        <tr class="[&:nth-child(2n+1)]:bg-white/15">
          <td class="text-right!">{index + 1}</td>
          <td class="text-left!">
            <div
              class="relative -mx-0.5 -my-1 flex flex-1 flex-row flex-nowrap items-center justify-start overflow-hidden px-2 py-0.5 text-white"
            >
              <div
                class="flex-none pr-1 text-left text-[22px] font-bold leading-[25px] tracking-[1px]"
              >
                <!-- class:text-[#6cff6c]={playoff} -->
                {team.name}
              </div>
            </div>
          </td>
          <td class="border-l border-white/25">{standing.wins}</td>
          <td>{standing.losses}</td>
          <td>{standing.ties}</td>
          <td class="border-l border-white/25 font-bold">
            <span
              class:text-red-400={standing.winPercentage < 0.5}
              class:text-green-400={standing.winPercentage > 0.5}
              class:text-white={standing.winPercentage === 0.5}
              >{standing.winPercentage.toFixed(3)}</span
            >
          </td>
          <td class="border-l border-white/25">{standing.pointsFor}</td>
          <td>{standing.pointsAgainst}</td>
          <td class="text-right! font-bold">
            {#if pointDifferential > 0}
              <span class="text-green-400">+{pointDifferential}</span>
            {:else if pointDifferential < 0}
              <span class="text-red-400">{pointDifferential}</span>
            {:else}
              {pointDifferential}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
