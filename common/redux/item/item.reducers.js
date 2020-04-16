import {itemTypes} from './item.types';

const INITIAL_STATE = {
  sider:false,
  items:[],
  periferalItems:[]
};

const item = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'FETCH_ITEM_SUCCESS':
        return {
          ...state,
          items:[...action.payload.result]
        }
      case 'FETCH_PERIFERAL_ITEMS_SUCCESS':
        return{
          ...state,
          periferalItems:[...action.payload.result]
        }
      case itemTypes.ADD_ITEM_START:
        return {
          ...state
        }
      default:
      return state;
  }
}
export default item;