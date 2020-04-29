import {itemTypes} from './item.types';

const INITIAL_STATE = {
  sider:false,
  items:[],
  periferalItems:[],
  modal:false
};
let newItems = [];
const item = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'OPEN_MODAL':
        return{
          ...state,
          modal:true
        }
      case 'CLOSE_MODAL':
        return{
          ...state,
          modal:false
        }
      case 'ADD_DONATION_APPROVAL_SUCCESS':
        return{
          ...state,
          modal:false
        }
      case 'FETCH_ITEM_SUCCESS':
        return {
          ...state,
          items:[...action.payload.result]
        }
      case 'FETCH_DONATION_ITEMS_SUCCESS':
        return{
          ...state,
          items:[...action.payload.result]
        }
      case 'DONATION_UOM_CHANGED':
        newItems = [];
        state.items && state.items.forEach((item, index)=>{
          if(item && item.Id===action.payload.item.Id){
            item[action.payload.type] = {Id:action.payload[action.payload.type]}
          }
          newItems.push(item);
        });
        return{
          ...state,
          items:[...newItems]
        }
      case 'DONATION_QUANTITY_CHANGED':
        newItems = [];
        state.items && state.items.forEach((item, index)=>{
          if(item && item.Id===action.payload.item.Id){
            item[action.payload.type] = action.payload[action.payload.type]
          }
          newItems.push(item);
        })
        return{
          ...state,
          items:[...newItems]
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