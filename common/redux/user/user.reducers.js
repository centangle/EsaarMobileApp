import { userTypes } from './user.types';
const toaster = require('../../../web/components/toaster/index');
const INITIAL_STATE = {
  usersByIds:{},
  socket:false,
  currentUser:null,
  isSigningIn:false,
  isIsSigningUp:false,
  isLogin:true
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'SIGN_UP_SUCCESS':
      return{
        ...state,
        isLogin:true,
        isSigningUp:false,
        isSigningIn:false
      }
    case 'SIGNUP':
      return{
        ...state,
        isLogin:false,
        isSigningUp:false,
        isSigningIn:false
      }
    case userTypes.ADD_USER_START:
      return {
        ...state
      }
    case userTypes.PUT_INITIAL_DATA: {
      if (action.payload.users) {
        return {
          ...state,
          usersByIds: action.payload.users.usersByIds
        };
      } else {
        return {
          ...state
        }
      }

    }
    case userTypes.USER_CONNECTED: {
      if (state.usersByIds[action.payload.payload]) {
        state.usersByIds[action.payload.payload].status = true;
      }
      return {
        ...state,
        usersByIds: { ...state.usersByIds }
      }
    }
    case userTypes.USER_DISCONNECTED: {
      if (state.usersByIds[action.payload.payload]) {
        state.usersByIds[action.payload.payload].status = false;
      }
      return {
        ...state,
        usersByIds: { ...state.usersByIds }
      }
    }
    case userTypes.ADD_MEMBER: {
      return {
        ...state,
        usersByIds: { ...state.usersByIds, [action.payload._id]: action.payload }
      }
    }
    case userTypes.SEARCH_GLOBAL_COMPLETE: {
      return {
        ...state,
        searchResult: action.payload
      }
    }
    case userTypes.SIGN_OUT: {
      return {
        ...state,
        currentUser: null

      }
    }
    case userTypes.SET_SOCKET: {
      return {
        ...state,
        socket: action.payload
      }
    }
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: {...state.currentUser,...action.payload},
        error: null,
        isSigningIn:false
      };
    case userTypes.SELECT_USER_PERMISSION:
      const { sourceSelectedKeys, targetSelectedKeys } = action.payload;
      return {
        ...state,
        selectedPermissions: [...sourceSelectedKeys, ...targetSelectedKeys]
      }
    case userTypes.LOAD_USER_PERMISSION:
      return {
        ...state,
        userPermissions: action.payload.permissions
      }
    case userTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case userTypes.EMAIL_SIGN_IN_START:
      return{
        ...state,
        isSigningIn:true
      }
    case userTypes.SAVE_USER_PERMISSION_START:
      return {
        ...state,
        userPermissions: action.payload.next
      }
    case userTypes.SIGN_UP_SUCCESS:
      return{
        ...state,
        isSigningUp:false
      }
    case userTypes.SIGN_UP_START:
      return{
        ...state,
        isSigningUp:true
      }
    case userTypes.CHECK_USER_SESSION:
      return {
        ...state,
        ...action.payload,
        toasterMessage: null
      }

    case userTypes.SIGN_UP_FAILURE:
      if (action.payload.result && action.payload.result.errors){
        Object.keys(action.payload.result.errors).forEach(key=>{
          toaster.error("Notification Message", action.payload.result.errors[key][0], { timeOut: 5000 })
        })
      }
      if (action.payload.result && action.payload.result.Errors){
        action.payload.result.Errors.forEach(e=>{
          toaster.error("Notification Message", e.Code+':'+e.Description, { timeOut: 500000 })
        })
      }
      return{
        ...state,
        isSigningUp:false
      }
    case userTypes.SIGN_OUT_FAILURE:
    case userTypes.SIGN_IN_FAILURE:
      if(action.payload.result){
        toaster.success("Notification Message", action.payload.result, { timeOut: 5000 })
      }
      return {
        ...state,
        currentUser:null,
        error: action.payload,
        toasterMessage: action.payload,
        isSigningIn:false
      };
    default:
      return state;
  }
}
export default user;