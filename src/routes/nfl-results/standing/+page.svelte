<script lang="ts">
  import { goto } from '$app/navigation';

  $effect(() => {
    goto('/nfl-results/standing/conference', { replaceState: true });
  });
</script>
