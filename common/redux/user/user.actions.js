import {userTypes} from './user.types';

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: userTypes.SIGN_IN_FAILURE,
  payload: error
});

export const emailSignInStart = emailAndPassword => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});
export const userPosition = (payload) =>({
  type: userTypes.SET_USER_POSITIION,
  payload
})
export const checkSession = (payload) => ({
  type: userTypes.CHECK_USER_SESSION,
  payload
});
export const refreshLogin = (user) =>({
  type:userTypes.REFRESH_LOGIN,
  payload:user
});
export const loginError = error =>({
  type:userTypes.LOGIN_FAILURE,
  payload:error
})
export const signOutStart = () => ({
  type: userTypes.SIGN_OUT
});

export const signOutSuccess = () => ({
  type: userTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: userTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = userCredentials => ({
  type: userTypes.SIGN_UP_START,
  payload: userCredentials
});
export const loadUserPermission = (permissions)=>({
  type:userTypes.LOAD_USER_PERMISSION,
  payload:{permissions}
})
export const saveUserPermissionStart = (nextTargetKeys, direction, moveKeys,id) => ({
  type:userTypes.SAVE_USER_PERMISSION_START,
  payload:{next:nextTargetKeys, direction:direction, moveKeys:moveKeys,id:id}
});
export const handlePermissionChange = (sourceSelectedKeys, targetSelectedKeys) =>({
  type:userTypes.SELECT_USER_PERMISSION,
  payload:{sourceSelectedKeys, targetSelectedKeys}
})
export const signUpSuccess = ({ user, additionalData }) => ({
  type: userTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData }
});

export const signUpFailure = error => ({
  type: userTypes.SIGN_UP_FAILURE,
  payload: error
});
export const recievedChanges = (data) =>({
  type:userTypes.RECIEVED_CHANGES,
  payload:data
});
export const removeToasterMessage = () =>({
  type:userTypes.REMOVE_TOASTER_MESSAGE
});
export const searchGlobalComplete = (users) =>({
  type:userTypes.SEARCH_GLOBAL_COMPLETE,
  payload:users
});
export const userConnected = (user) =>({
  type:userTypes.USER_CONNECTED,
  payload:user
});
export const userDisconnected = (user)=>({
  type:userTypes.USER_DISCONNECTED,
  payload:user
});
export const youDisconnected = (user)=>({
  type:userTypes.YOU_DISCONNECTED,
  payload:user
});
export const youConnected = (user)=>({
  type:userTypes.YOU_CONNECTED,
  payload:user
})