<script lang="ts">
  import TopMenu from '$lib/components/top-menu.svelte';
</script>

<svelte:head>
  <title>Fantasy league</title>
</svelte:head>

<TopMenu
  main={[
    // { href: '/fantasy', text: 'Fantasy' },
    // { href: '/fantasy', text: 'Fantasy' }
  ]}
  backButton={{ href: '/nfl-results', text: 'NFL Results' }}
/>

<main class="w-full p-4">
  <h1 class="text-3xl font-bold">FANTASY PAGE</h1>
</main>
