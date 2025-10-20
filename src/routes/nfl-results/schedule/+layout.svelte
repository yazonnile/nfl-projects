<script lang="ts">
  import SpoilerButton from '$lib/components/show-results/show-results-button.svelte';
  import WeekDateButton from '$lib/components/week-date/week-date-button.svelte';
  import type { LayoutProps } from './$types';

  let { children }: LayoutProps = $props();
</script>

<div
  class="-mx-2 flex flex-row flex-wrap justify-center gap-2 bg-white/10 px-2 pb-2 sm:items-end lg:justify-end lg:px-4 lg:pb-4 [&>*]:w-[calc(50%-4px)] sm:[&>*]:w-auto"
>
  <SpoilerButton />
  <WeekDateButton />
</div>

{@render children?.()}
