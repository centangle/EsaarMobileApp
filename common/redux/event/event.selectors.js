import { createSelector } from 'reselect';

const event = state => state.event;
export const eventsLoading = createSelector(
  [event],
  event => event.eventsLoading
);