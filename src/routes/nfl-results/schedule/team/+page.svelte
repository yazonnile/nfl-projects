<script lang="ts">
  import { nflTeams, nflWeeks } from '$lib/api-data/store';
  import NflWeek from '$lib/components/nfl-week.svelte';
  import type { ID } from '$lib/typing-utils/id';

  const teamIds = Object.keys(nflTeams);
  const selectedTeamsIds = $state<Array<ID>>([]);
  const isActiveTeam = (id: string) => {
    return selectedTeamsIds.includes(id);
  };

  const toggleTeam = (id: ID) => {
    if (isActiveTeam(id)) {
      selectedTeamsIds.splice(selectedTeamsIds.indexOf(id), 1);
    } else {
      selectedTeamsIds.push(id);
    }
  };
</script>

<svelte:head>
  <title>NFL Schedule by Team</title>
</svelte:head>

<nav class="-mx-2 flex flex-wrap justify-center gap-2 bg-white/10 px-2 pb-2">
  {#each teamIds as id}
    <button
      aria-label={nflTeams[id].displayName}
      style:background-image={`url(${nflTeams[id].logos.default})`}
      class="w-[calc(20% - 8px)] font-inherit text-(--text-light) border-1 h-12 w-16 min-w-10 cursor-pointer rounded border-gray-500 bg-contain bg-center bg-no-repeat text-center font-bold uppercase hover:border-white"
      class:bg-(--bg-primary-active)!={isActiveTeam(id)}
      onclick={() => toggleTeam(id)}
    >
    </button>
  {/each}
</nav>

{#if selectedTeamsIds.length}
  {#each Object.values(nflWeeks) as week (week.id)}
    <div class="week">
      <NflWeek weekNumber={week.number} allowedTeamsIds={selectedTeamsIds} />
    </div>
  {/each}
{/if}
