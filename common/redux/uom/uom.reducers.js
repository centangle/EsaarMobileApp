import { uomTypes } from './uom.types';
const toaster = require('../../../web/components/toaster/index');

const INITIAL_STATE = {
  sider: false,
  uoms: [],
  periferalUoms: [],
  modal: false,
  uomLoading: false,
  isRemoving:false,
  current:{}
};
let newUoms = [];
const uom = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: true,
        current:action.payload.type==='UOM'?action.payload.item:''
      }
    case 'ADD_UOM_SUCCESS':
      return{
        ...state,
        modal:false,
        uoms:[...state.uoms,action.payload]
      }
    case 'FETCH_UOM_START':
      return {
        ...state,
        uomLoading: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: false
      }
    case 'REMOvE_UOM_SUCCESS':
      return{
        isRemoving:false
      }
    case 'REMOVE_UOM_START':
      return{
        ...state,
        isRemoving:true
      }
    case 'REMOVE_UOM_FAILURE':
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error("Notification Message", action.payload.result.ExceptionMessage, { timeOut: 10000 })
      return{
        ...state,
        isRemoving:false
      }
    case 'UOM_ORDER_CHANGED':
      return{
        ...state,
        uoms:action.payload
      }
    case 'FETCH_UOM_SUCCESS':
      return {
        ...state,
        uoms: [...action.payload.result],
        uomLoading:false,
        modal:false
      }

    case 'FETCH_PERIFERAL_UOMS_SUCCESS':
      return {
        ...state,
        periferalUoms: [...action.payload.result]
      }
    case 'ADD_UOM_START':
      return {
        ...state
      }
    case 'ADD_UOM_FAILURE':
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error("Error Message", action.payload.result.ExceptionMessage, { timeOut: 50000 })
      return{
        ...state
      }
    default:
      return state;
  }
}
export default uom;