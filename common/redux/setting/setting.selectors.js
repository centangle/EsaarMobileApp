import { createSelector } from 'reselect';

const settings = state => state.setting;
export const miniLoading = createSelector(
  [settings],
  settings => settings.miniLoading
);
export const isLoading = createSelector(
  [settings],
  settings => settings.isLoading
);