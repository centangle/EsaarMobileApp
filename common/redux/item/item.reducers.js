import { itemTypes } from "./item.types";
const toaster = require("../../../web/components/toaster/index");

const INITIAL_STATE = {
  sider: false,
  items: [],
  periferalItems: [],
  rootItems: [],
  modal: false,
  logo: null,
  itemSaving: false,
  current: {},
  fetching: false,
  selectedFilters: { Item: [] },
};
let newItems = [];
const item = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPEN_REPLY_MODAL":
      return {
        ...state,
        modal: false,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: true,
        current: action.payload.type === "ITEM" ? action.payload.item : "",
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
      };
    case "ADD_ITEM_START":
      return {
        ...state,
        itemSaving: true,
      };
    case "ADD_ITEM_SUCCESS":
      return {
        ...state,
        modal: false,
        itemSaving: false,
      };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        logo: action.uploadType === "ItemLogo" ? action.meta : null,
      };
    case "ADD_ITEM_FAILURE":
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error(
          "Notification Message",
          action.payload.result.ExceptionMessage,
          { timeOut: 100000 }
        );
      return {
        ...state,
      };
    case "ADD_DONATION_APPROVAL_SUCCESS":
      return {
        ...state,
        modal: false,
      };
    case "FETCH_ITEM_SUCCESS":
      return {
        ...state,
        items: [...action.payload.result],
        modal: false,
      };
    case "FETCH_DONATION_ITEMS_SUCCESS":
      return {
        ...state,
        items: [...action.payload.result],
      };
    case "DONATION_UOM_CHANGED":
      newItems = [];
      state.items &&
        state.items.forEach((item, index) => {
          if (item && item.Id === action.payload.item.Id) {
            item[action.payload.type] = {
              Id: action.payload[action.payload.type],
            };
          }
          newItems.push(item);
        });
      return {
        ...state,
        items: [...newItems],
      };
    case "DONATION_QUANTITY_CHANGED":
      newItems = [];
      state.items &&
        state.items.forEach((item, index) => {
          if (item && item.Id === action.payload.item.Id) {
            item[action.payload.type] = action.payload[action.payload.type];
          }
          newItems.push(item);
        });
      return {
        ...state,
        items: [...newItems],
      };
    case "FETCH_PERIFERAL_ITEMS_START":
    case "FETCH_ROOT_ITEMS_START":
      return {
        ...state,
        fetching: true,
      };
    case "FETCH_PERIFERAL_ITEMS_SUCCESS":
      return {
        ...state,
        periferalItems: [...action.payload.result],
        fetching: false,
      };
    case "FETCH_ROOT_ITEMS_SUCCESS":
      return {
        ...state,
        rootItems: [...action.payload.result],
        fetching: false,
      };
    case itemTypes.ADD_ITEM_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default item;
