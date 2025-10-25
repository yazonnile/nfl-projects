<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { nflLeaders } from '$lib/api-data/store';

  $effect(() => {
    goto(resolve('/nfl-results/leaders/passingYards/'), { replaceState: true });
  });
</script>

{#each Object.keys(nflLeaders) as categoryId (categoryId)}
  <a href={resolve(`/nfl-results/leaders/${categoryId}/`)} class="hidden">{categoryId}</a>
{/each}
