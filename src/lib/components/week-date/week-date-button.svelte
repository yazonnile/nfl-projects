<script lang="ts">
  import Button from '../button.svelte';
  import { weekDateState } from './week-date-state.svelte';
  import ToggleActiveIcon from '$lib/components/icons/toggle-active.svelte';
  import ToggleIcon from '$lib/components/icons/toggle.svelte';
</script>

<Button onclick={weekDateState.toggle} active={weekDateState.enabled}>
  Week date
  {#if weekDateState.enabled}
    <ToggleActiveIcon class="-my-3 size-8 shrink-0" />
  {:else}
    <ToggleIcon class="-my-3 size-8 shrink-0" />
  {/if}
</Button>
