import { eventTypes } from './event.types';

const INITIAL_STATE = {
  sider: false,
  events: [],
  periferalItems: [],
  modal: false,
  form: {},
  eventsLoading:false
};
let newItems = [];
const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: false
      }
    case 'FETCH_EVENT_START':
      return{
        ...state,
        eventsLoading:true,
      }
    case 'FETCH_EVENT_SUCCESS':
      return {
        ...state,
        modal:false,
        eventsLoading:false,
        totalItemsCount: action.payload.totalItemsCount,
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        events: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case eventTypes.ADD_EVENT_START:
      return {
        eventsLoading:true,
        ...state
      }
    default:
      return state;
  }
}
export default event;