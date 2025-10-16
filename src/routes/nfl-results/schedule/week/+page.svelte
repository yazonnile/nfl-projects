<script lang="ts">
  import { goto } from '$app/navigation';
  import { weekNumber } from '$lib/api-data/store';

  goto(`/nfl-results/schedule/week/${weekNumber}`, { replaceState: true });
</script>
