<script lang="ts">
  import { goto } from '$app/navigation';

  $effect(() => {
    goto('/nfl-results/schedule/team', { replaceState: true });
  });
</script>
