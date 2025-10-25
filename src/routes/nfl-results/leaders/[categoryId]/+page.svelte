<script lang="ts">
  import { nflLeaders, nflAthletes, nflTeams, nflRookies } from '$lib/api-data/store';
  import type { NflLeaders } from '$lib/models/nfl-leaders';
  import type { PageProps } from './$types';

  let { params }: PageProps = $props();
  let categoryId = $derived(params.categoryId) as NflLeaders['category'];
  const categoryData = $derived(nflLeaders[categoryId]);
  const maxValue = $derived(Math.max(...categoryData.leaders.map((l) => l.value)));
</script>

<svelte:head>
  <title>NFL Leaders - {categoryId}</title>
</svelte:head>

<div class="pr-22 flex flex-col gap-1 rounded-sm bg-white/20 p-1">
  {#each categoryData.leaders as { value, athleteId }, i (athleteId)}
    {@const athlete = nflAthletes[athleteId]}

    {#if athlete}
      <div
        style:z-index={categoryData.leaders.length - i}
        class="hover:z-30! [&:hover_[data-wrapper]]:bg-(--leaders-row-bg-hover)! [&:hover_[data-photo]]:scale-140 relative flex flex-1 flex-nowrap justify-start rounded-sm p-2 tabular-nums text-black transition-colors duration-200 hover:text-white [&:hover_[data-wrapper]]:gap-4"
      >
        <div class="z-1 relative w-5 shrink-0 text-right">{i + 1}</div>
        <!-- + calc(${value / maxValue}% * --var(--leaders-chart-width)) -->
        <div
          data-wrapper
          style:width={`calc(var(--leaders-info-width) + (${value / maxValue} * (100% - var(--leaders-info-width))))`}
          style:background-color={nflRookies[athleteId]
            ? `var(--leaders-row-bg-rookie)`
            : `var(--leaders-row-bg)`}
          class="absolute left-0 top-0 flex h-full items-center justify-end gap-2 rounded-sm pl-8 font-bold transition-all duration-300"
        >
          <div
            data-name
            class="flex max-w-full shrink-0 flex-col items-end gap-0 overflow-hidden text-ellipsis whitespace-nowrap text-right text-xs leading-3 transition-all duration-300 sm:flex-row sm:items-center sm:gap-2 sm:text-base sm:leading-6"
          >
            {athlete.shortName}
            <img
              src={nflTeams[athlete.teamId].logos.default}
              class="size-4 bg-contain bg-center bg-no-repeat"
              alt={nflTeams[athlete.teamId].abbreviation}
            />
          </div>
          <div
            class="absolute left-[calc(100%+34px)] top-0 h-full whitespace-nowrap leading-10 text-white"
          >
            {value.toFixed(0)}
          </div>
          <img
            data-photo
            fetchpriority="high"
            class="border-3 -mr-5 size-10 rounded-full object-cover transition-transform duration-200"
            style:border-color={`#${nflTeams[athlete.teamId].color}`}
            style:background-color={`#${nflTeams[athlete.teamId].alternateColor}`}
            src={`https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${athlete.id}.png&h=80&w=110&scale=crop`}
            alt={athlete.displayName}
          />
        </div>
      </div>

      <!-- {@const percentage = range > 0 ? ((value - minValue) / range) * 100 : 0}
      <div class="athlete-row">
        <div class="athlete-info">
          <span class="athlete-rank">{i + 1}</span>
          <span class="athlete-name">{athlete.shortName}</span>
          <span class="athlete-team">{nflTeams[athlete.teamId]?.abbreviation}</span>
        </div>
        <div class="value-bar-container">
          <span class="value-text">{value}</span>
          <div class="value-bar" style={`width: ${percentage}%`} data-value={value}></div>
        </div>
      </div> -->
    {/if}
  {/each}
</div>
