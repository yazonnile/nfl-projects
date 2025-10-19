export const spoilerState = $state({
  enabled: false,
  toggle: () => {
    spoilerState.enabled = !spoilerState.enabled;
  }
});
