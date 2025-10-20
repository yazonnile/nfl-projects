<script lang="ts">
  import { nflMatches, nflWeeks } from '$lib/api-data/store';
  import NflMatch from './nfl-match.svelte';
  import NflWeekTeamsOnBye from './nfl-week-teams-on-bye.svelte';
  import type { ID } from '$lib/typing-utils/id';
  import { weekDateState } from '$lib/components/week-date/week-date-state.svelte';
  import type { ApiDataReturnType } from '$lib/typing-utils/api-data-return-type';

  type Props = {
    weekNumber: ApiDataReturnType['weekNumber'];
    allowedTeamsIds?: Array<ID>;
  };

  let { weekNumber, allowedTeamsIds }: Props = $props();

  const { matches, teamsOnBye } = $derived(nflWeeks[weekNumber]);

  const filteredMatches = $derived(
    typeof allowedTeamsIds === 'undefined'
      ? matches
      : matches.filter((matchId) => {
          const { competitors } = nflMatches[matchId];
          return (
            allowedTeamsIds?.includes(competitors.home.teamId) ||
            allowedTeamsIds?.includes(competitors.away.teamId)
          );
        })
  );

  const weekEvents = $derived(
    filteredMatches.reduce(
      (sum, matchId) => {
        const { date } = nflMatches[matchId];
        const dateObj = new Date(date);

        // align second wave games into single time slot (23:25 -> 23:05)
        if (dateObj.getDay() === 0 && dateObj.getHours() === 23 && dateObj.getMinutes() === 25) {
          dateObj.setMinutes(5);
        }

        const dateString = dateObj.toString();

        if (!sum[dateString]) {
          sum[dateString] = [];
        }

        sum[dateString].push(matchId);
        return sum;
      },
      {} as Record<ID, Array<ID>>
    )
  );

  const weekDates = $derived(
    Object.keys(weekEvents).sort((a, b) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
    })
  );

  const transformDate = (date: string): string => {
    const dateObj = new Date(date);
    let dateString = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      weekday: 'short'
    });

    if (dateObj.getDay() === 0 && dateObj.getHours() === 23 && dateObj.getMinutes() === 5) {
      dateObj.setMinutes(25);

      dateString += ` - ${dateObj.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        hour12: false,
        minute: '2-digit'
      })}`;
    }

    return dateString;
  };
</script>

<div class="flex flex-col items-center gap-1 p-2 pt-2 sm:gap-2">
  <h1 class="text-2xl font-bold">Week {weekNumber}</h1>

  <NflWeekTeamsOnBye {teamsOnBye} />

  {#if weekDateState.enabled}
    {#each weekDates as weekDate}
      <h3 class="w-full bg-white/10 p-0.5 px-2 text-left font-bold sm:p-2">
        {transformDate(weekDate)}
      </h3>
      <div
        class="mb-4 grid w-full justify-center gap-2 [grid-template-columns:repeat(auto-fill,minmax(270px,1fr))] lg:gap-4"
      >
        {#each weekEvents[weekDate] as matchId}
          <NflMatch {matchId} />
        {/each}
      </div>
    {/each}
  {:else}
    <div
      class="grid w-full justify-center gap-2 [grid-template-columns:repeat(auto-fill,minmax(270px,1fr))] lg:gap-4"
    >
      {#each filteredMatches as matchId}
        <NflMatch {matchId} />
      {/each}
    </div>
  {/if}
</div>
