import { requestTypes } from './request.types';

const INITIAL_STATE = {
  sider: false,
  requests: [],
  replies: {},
  status: {}
};

const request = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST_THREAD_SUCCESS':
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.payload.Id]: action.payload.result
        }
      }
    case 'FETCH_REQUEST_STATUS_SUCCESS':
      return {
        ...state,
        status: action.payload.result.reduce((obj, item) => {
          obj[item] = item
          return obj
        }, {})
      }
    case 'FETCH_REQUEST_SUCCESS':
      return {
        ...state,
        requests: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'ASSIGN_REQUEST_SUCCESS':
      return{
        ...state,
        requests:{
          ...state.requests,
          [action.payload.result.requestId]:{
            ...state.requests[action.payload.result.requestId],
            IsOpenRequest:false
          }
        },
      }
    case requestTypes.ADD_REQUEST_START:
      return {
        ...state
      }
    default:
      return state;
  }
}
export default request;