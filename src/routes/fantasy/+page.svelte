<script lang="ts">
  import TopMenu from '$lib/components/top-menu.svelte';
  import { resolve } from '$app/paths';
  import BackButton from '$lib/components/back-button.svelte';
</script>

<svelte:head>
  <title>Fantasy league</title>
</svelte:head>

<TopMenu>
  <div class="flex gap-2">
    <BackButton href={resolve('/nfl-results/')}>NFL Results</BackButton>
  </div>

  <div class="flex gap-2"></div>
</TopMenu>

<main class="w-full p-4">
  <h1 class="text-3xl font-bold">FANTASY PAGE</h1>
</main>
