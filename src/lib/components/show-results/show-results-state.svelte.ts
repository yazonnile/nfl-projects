import { persistedToggle } from '$lib/local-storage/persisted-toggle.svelte';

export const showResultsState = persistedToggle('show-results-enabled');
