import { browser } from '$app/environment';

const STORAGE_KEY = 'show-results-enabled';

let enabled = false;
if (browser) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    enabled = stored ? JSON.parse(stored) : false;
  } catch {}
}

export const showResultsState = $state({
  enabled,
  toggle: () => {
    showResultsState.enabled = !showResultsState.enabled;
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(showResultsState.enabled));
      } catch {}
    }
  }
});
