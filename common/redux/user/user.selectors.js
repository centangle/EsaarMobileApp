import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
export const selectSocket = createSelector(
  [selectUser],
  user=>user.socket
);
export const selectSelectedPermissions = createSelector(
  [selectUser],
  user => user.selectedPermissions
);
export const selectUserPermissions = createSelector(
  [selectUser],
  user =>user.userPermissions
);
export const selectToasterMessage = createSelector(
  [selectUser],
  user => user.toasterMessage
);