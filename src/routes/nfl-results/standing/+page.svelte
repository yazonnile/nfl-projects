<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  $effect(() => {
    goto(resolve('/nfl-results/standing/conference'), { replaceState: true });
  });
</script>
