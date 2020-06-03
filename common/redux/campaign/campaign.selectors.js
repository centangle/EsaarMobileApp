import { createSelector } from 'reselect';

const campaign = state => state.campaign;
export const itemsLoading = createSelector(
  [campaign],
  campaign => campaign.itemsLoading
);
export const requestsLoading =createSelector(
  [campaign],
  campaign => campaign.requestsLoading
);
export const accountsLoading = createSelector(
  [campaign],
  campaign => campaign.accountsLoading
);
export const officesLoading=createSelector(
   [campaign],
  campaign => campaign.officesLoading
);
export const packagesLoading =createSelector(
  [campaign],
  campaign => campaign.packagesLoading
);
export const campaignsLoading =createSelector(
  [campaign],
  campaign => campaign.campaignsLoading
);
export const membersLoading = createSelector(
  [campaign],
  campaign => campaign.membersLoading
);
 export const volunteerJoining = createSelector(
  [campaign],
  campaign => campaign.volunteerJoining
);
export const moderatorJoining=createSelector(
  [campaign],
  campaign => campaign.moderatorJoining
);
export const memberJoining=createSelector(
  [campaign],
  campaign => campaign.memberJoining
);
export const attachmentsLoading = createSelector(
   [campaign],
  campaign => campaign.attachmentsLoading
)
export const selectForm = createSelector(
  [campaign],
  campaign => campaign.form
);
export const regionsLoading = createSelector(
   [campaign],
  campaign => campaign.regionsLoading
);