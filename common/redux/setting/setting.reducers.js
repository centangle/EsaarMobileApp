import { settingTypes } from './setting.types';

const INITIAL_STATE = {
  uoms: {},
  sider: false,
  isLoading: false,
  miniLoading: false,
  uomLoading: false,
};

const setting = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ORGANIZATION_START':
    case 'ADD_ORGANIZATION_START':
    case 'FETCH_ORGANIZATION_DETAIL':
    case 'FETCH_ITEM_START':
    case 'ADD_ITEM_START':
    case 'FETCH_ITEM_DETAIL':
    case 'FETCH_REQUEST_START':
      return {
        ...state,
        isLoading: true
      }
    case 'ORG_REQUESTS_START':
      return {
        ...state,
        miniLoading: true,
      }
    case 'FETCH_ORGANIZATION_SUCCESS':
    case 'ADD_ORGANIZATION_SUCCESS':
    case 'FETCH_ORGANIZATION_DETAIL_SUCCESS':
    case 'FETCH_ITEM_SUCCESS':
    case 'ADD_ITEM_SUCCESS':
    case 'FETCH_ITEM_DETAIL_SUCCESS':
    case 'FETCH_REQUEST_SUCCESS':
      return {
        ...state,
        isLoading: false
      }
    case 'HIDE_SIDER':
      return {
        ...state,
        sider: false,
      }
    case 'SHOW_SIDER':
      return {
        ...state,
        sider: true,
      }
    case settingTypes.ADD_SETTING_START:
      return {
        ...state
      }
    case settingTypes.FETCH_UOM_SUCCESS:
      return {
        ...state,
        uoms: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    default:
      return state;
  }
}
export default setting;