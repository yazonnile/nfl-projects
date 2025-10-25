<script lang="ts">
  import { nflLeaders } from '$lib/api-data/store';
  import { resolve } from '$app/paths';
  import { goto } from '$app/navigation';
  import type { LayoutProps } from './$types';
  import type { NflLeaders } from '$lib/models/nfl-leaders';

  let { children, params }: LayoutProps = $props();
  let categoryId = $state<NflLeaders['category']>(params.categoryId as NflLeaders['category']);

  const leadersCategories = Object.values(nflLeaders);

  const onChangeCategory = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    categoryId = target.value as NflLeaders['category'];
    goto(resolve(`/nfl-results/leaders/${categoryId}/`));
  };
</script>

<svelte:head>
  <title>NFL Leaders</title>
</svelte:head>

<div class="flex justify-center py-4">
  <select
    onchange={onChangeCategory}
    class="lg:min-w-1/2 min-w-full rounded border border-gray-500 bg-white/10 px-3 py-2 text-white focus:border-white focus:outline-none"
  >
    {#each leadersCategories as category}
      <option value={category.category}>{category.displayName}</option>
    {/each}
  </select>
</div>

{@render children?.()}
