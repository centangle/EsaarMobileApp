import { createSelector } from 'reselect';

const items = state => state.item;
export const itemLoading = createSelector(
  [items],
  items => items.itemLoading
);
export const inputLoading = createSelector(
  [items],
  items => items.inputLoading
);