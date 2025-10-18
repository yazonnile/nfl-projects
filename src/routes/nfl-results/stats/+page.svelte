<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  $effect(() => {
    goto(resolve('/nfl-results/stats/top'), { replaceState: true });
  });
</script>
