import { createSelector } from 'reselect';

const organization = state => state.organization;
export const itemsLoading = createSelector(
  [organization],
  organization => organization.itemsLoading
);
export const requestsLoading =createSelector(
  [organization],
  organization => organization.requestsLoading
);
export const membersLoading = createSelector(
  [organization],
  organization => organization.membersLoading
);
 export const volunteerJoining = createSelector(
  [organization],
  organization => organization.volunteerJoining
);
export const moderatorJoining=createSelector(
  [organization],
  organization => organization.moderatorJoining
);
export const memberJoining=createSelector(
  [organization],
  organization => organization.memberJoining
);