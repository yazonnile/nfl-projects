<script lang="ts">
  import { nflTeams, nflWeeks, nflDivisions } from '$lib/api-data/store';
  import NflWeek from '$lib/components/nfl-week.svelte';
  import type { ID } from '$lib/typing-utils/id';

  const teamIds = Object.keys(nflTeams);
  const selectedTeamsIds = $state<Array<ID>>([]);

  const divisionIds = Object.keys(nflDivisions);
  let selectedDivisionId = $state<ID | null>(null);

  const isActiveDivision = (id: ID) => {
    return selectedDivisionId === id;
  };

  const toggleDivision = (id: ID) => {
    selectedDivisionId = isActiveDivision(id) ? null : id;
  };
</script>

<svelte:head>
  <title>NFL Schedule by Division</title>
</svelte:head>

<nav class="-mx-2 flex flex-wrap justify-center gap-2 bg-white/10 px-2 pb-4">
  {#each divisionIds as divisionId}
    <button
      aria-label={nflDivisions[divisionId].name}
      class="font-inherit text-(--text-light) border-1 min-w-50 min-h-12 w-[calc(25%-8px)] max-w-60 cursor-pointer rounded border-gray-500 px-2 py-1 text-center font-bold uppercase hover:border-white"
      class:bg-(--bg-primary-active)!={isActiveDivision(divisionId)}
      onclick={() => toggleDivision(divisionId)}
    >
      <span class="flex w-full justify-center">{nflDivisions[divisionId].name}</span>
      <span class="flex w-full justify-center gap-1">
        {#each nflDivisions[divisionId].teamsIds as teamId}
          <span
            class="h-10 w-1/4 flex-shrink-0 bg-contain bg-center bg-no-repeat"
            style:background-image={`url(${nflTeams[teamId].logos.default})`}
          ></span>
        {/each}
      </span>
    </button>
  {/each}
</nav>

{#if selectedDivisionId}
  {#each Object.values(nflWeeks) as week (week.id)}
    <div class="week">
      <NflWeek
        weekNumber={week.number}
        allowedTeamsIds={nflDivisions[selectedDivisionId].teamsIds}
      />
    </div>
  {/each}
{/if}
