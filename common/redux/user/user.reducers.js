import { userTypes } from './user.types';

const INITIAL_STATE = {
  usersByIds:{},
  socket:false
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        currentUser: action.payload,
        error: null
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
    case userTypes.SAVE_USER_PERMISSION_START:
      return {
        ...state,
        userPermissions: action.payload.next
      }
    case userTypes.CHECK_USER_SESSION:
      return {
        ...state,
        toasterMessage: null
      }
    case userTypes.SIGN_IN_FAILURE:
    case userTypes.SIGN_OUT_FAILURE:
    case userTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        toasterMessage: action.payload
      };
    default:
      return state;
  }
}
export default user;