import { createSelector } from 'reselect';

const uoms = state => state.uom;
export const uomLoading = createSelector(
  [uoms],
  uoms => uoms.uomLoading
);