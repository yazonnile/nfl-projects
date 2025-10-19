<script lang="ts">
  import SpoilerButton from '$lib/components/spoiler/spoiler-button.svelte';
  import WeekDateButton from '$lib/components/week-date/week-date-button.svelte';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
</script>

<div class="-mx-2 flex items-start justify-end gap-2 bg-white/10 pb-4">
  <SpoilerButton />
  <WeekDateButton />
</div>

{@render children?.()}
