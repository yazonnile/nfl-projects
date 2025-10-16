<script lang="ts">
  import { nflTeams } from '$lib/api-data/store';
  import type { ID } from '$lib/typing-utils/id';

  type Props = {
    teamsOnBye: Array<ID>;
  };

  let { teamsOnBye }: Props = $props();

  let teamsList = $derived(teamsOnBye.map((teamId) => nflTeams[teamId].abbreviation));
</script>

{#if teamsOnBye.length}
  <h4 class="mb-2 font-bold">BYE: {teamsList.join(', ')}</h4>
{/if}
