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
export const accountsLoading = createSelector(
  [organization],
  organization => organization.accountsLoading
);
export const officesLoading=createSelector(
   [organization],
  organization => organization.officesLoading
);
export const packagesLoading =createSelector(
  [organization],
  organization => organization.packagesLoading
);
export const campaignsLoading =createSelector(
  [organization],
  organization => organization.campaignsLoading
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
export const attachmentsLoading = createSelector(
   [organization],
  organization => organization.attachmentsLoading
)
export const selectForm = createSelector(
  [organization],
  organization => organization.form
);
export const regionsLoading = createSelector(
   [organization],
  organization => organization.regionsLoading
);