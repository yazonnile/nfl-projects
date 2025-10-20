<script lang="ts">
  import { nflStanding, nflTeams } from '$lib/api-data/store';
  import type { ID } from '$lib/typing-utils/id';
  import { twMerge } from 'tailwind-merge';

  type Props = {
    name: string;
    abbreviation: string;
    teamsIds: Array<ID>;
    class?: string;
  };

  let { name, abbreviation, teamsIds, class: className }: Props = $props();
</script>

<div class={twMerge('max-w-[560px]', className)}>
  <table
    class="w-full border-collapse border border-white/25 text-sm uppercase leading-3 [&_td]:p-1 [&_td]:text-center sm:[&_td]:leading-4 lg:[&_td]:text-base lg:[&_td]:leading-5"
  >
    <thead>
      <tr class="[&_td]:text-xs! leading-1 font-bold tracking-[1px] [&_td]:bg-white/25">
        <td class="w-[25px] min-w-[25px] text-right"></td>
        <td class="text-left! sm:pl-3! min-w-15 w-auto sm:min-w-[150px]"
          ><b class="-ml-3 whitespace-nowrap sm:ml-0">
            <span class="hidden sm:inline">{name}</span>
            <span class="inline sm:hidden">{abbreviation}</span>
          </b></td
        >
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
              class="relative -mx-0.5 -my-1 flex flex-1 flex-row flex-nowrap items-center justify-start overflow-hidden px-1 py-0.5 text-white"
            >
              <div class="flex-none text-left font-bold leading-3 tracking-[1px]">
                <!-- class:text-[#6cff6c]={playoff} -->
                <span class="hidden sm:inline">{team.name}</span>
                <span class="inline sm:hidden">{team.abbreviation}</span>
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
              >{standing.winPercentage.toFixed(2)}</span
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
