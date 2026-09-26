import { browser } from '$app/environment';

export function persistedToggle(key: string, initial = false) {
  let enabled = initial;

  if (browser) {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        const parsed: unknown = JSON.parse(stored);
        if (typeof parsed === 'boolean') enabled = parsed;
      }
    } catch {
      // Ignore unreadable storage.
    }
  }

  const state = $state({
    enabled,
    toggle: () => {
      state.enabled = !state.enabled;

      if (!browser) return;

      try {
        localStorage.setItem(key, JSON.stringify(state.enabled));
      } catch {
        // Storage can throw in private mode or when the quota is full.
      }
    }
  });

  return state;
}
