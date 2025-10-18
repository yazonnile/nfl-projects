<script lang="ts">
  import TopMenu from '$lib/components/top-menu.svelte';
  import { resolve } from '$app/paths';

  let { children } = $props();
</script>

<TopMenu
  main={[
    {
      href: resolve('/nfl-results/standing/'),
      text: 'Standing',
      sub: [
        { href: resolve('/nfl-results/standing/overall/'), text: 'Overall' },
        { href: resolve('/nfl-results/standing/conference/'), text: 'Conference' },
        { href: resolve('/nfl-results/standing/division/'), text: 'Division' }
      ]
    },
    {
      href: resolve('/nfl-results/schedule/'),
      text: 'Schedule',
      sub: [
        { href: resolve('/nfl-results/schedule/week/'), text: 'Week' },
        { href: resolve('/nfl-results/schedule/team/'), text: 'Team' },
        { href: resolve('/nfl-results/schedule/division/'), text: 'Division' }
      ]
    }
    // {
    //   href: resolve('/nfl-results/stats/'),
    //   text: 'Stats',
    //   sub: [
    //     { href: resolve('/nfl-results/stats/top/'), text: 'Top' },
    //     { href: resolve('/nfl-results/stats/rookie/'), text: 'Rookie' }
    //   ]
    // }
  ]}
  backButton={{ href: resolve('/fantasy/'), text: 'Fantasy' }}
/>

{@render children?.()}

<!--
screenshot
spoilers
date/time
 -->
