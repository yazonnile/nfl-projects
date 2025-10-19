export const weekDateState = $state({
  enabled: false,
  toggle: () => {
    weekDateState.enabled = !weekDateState.enabled;
  }
});
