<script lang="ts">
  import { goto } from '$app/navigation';
  import { weekNumber } from '$lib/api-data/store';
  import { resolve } from '$app/paths';

  $effect(() => {
    goto(resolve(`/nfl-results/schedule/week/${weekNumber}`), { replaceState: true });
  });
</script>
