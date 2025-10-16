<script lang="ts">
  import { goto } from '$app/navigation';

  $effect(() => {
    goto('/nfl-results', { replaceState: true });
  });
</script>
