import {itemTypes} from './item.types';
export const putInitialData = collections =>({
  type:itemTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addItemSuccess = item => ({
  type: itemTypes.ADD_ITEM_SUCCESS,
  payload: item
});
export const fetchItemSuccess = collections =>({
  type:itemTypes.FETCH_ITEM_SUCCESS,
  payload:collections
});
export const fetchItemDetailSuccess = collections =>({
  type:itemTypes.FETCH_ITEM_DETAIL_SUCCESS,
  payload:collections
});
export const addItemFailure = error => ({
  type: itemTypes.ADD_ITEM_FAILURE,
  payload: error
});
export const fetchItemStart = () => ({
  type: itemTypes.FETCH_ITEM_START
});
export const fetchPeriferalItemStart = () =>({
  type:itemTypes.FETCH_PERIFERAL_ITEMS_START
});
export const fetchPeriferalItemSuccess = collections=>({
  type:itemTypes.FETCH_PERIFERAL_ITEMS_SUCCESS,
  payload:collections
})