import { persistedToggle } from '$lib/local-storage/persisted-toggle.svelte';

export const weekDateState = persistedToggle('week-date-enabled');
