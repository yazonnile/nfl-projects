<script lang="ts">
  import TopMenu from '$lib/components/top-menu.svelte';

  let { children } = $props();
</script>

<TopMenu
  main={[
    {
      href: '/nfl-results/standing',
      text: 'Standing',
      sub: [
        { href: '/nfl-results/standing/overall', text: 'Overall' },
        { href: '/nfl-results/standing/conference', text: 'Conference' },
        { href: '/nfl-results/standing/division', text: 'Division' }
      ]
    },
    {
      href: '/nfl-results/schedule',
      text: 'Schedule',
      sub: [
        { href: '/nfl-results/schedule/week', text: 'Week' },
        { href: '/nfl-results/schedule/team', text: 'Team' },
        { href: '/nfl-results/schedule/division', text: 'Division' }
      ]
    }
    // {
    //   href: '/nfl-results/stats',
    //   text: 'Stats',
    //   sub: [
    //     { href: '/nfl-results/stats/top', text: 'Top' },
    //     { href: '/nfl-results/stats/rookie', text: 'Rookie' }
    //   ]
    // }
  ]}
  backButton={{ href: '/fantasy', text: 'Fantasy' }}
/>

{@render children?.()}

<!--
screenshot
spoilers
date/time
 -->
