import { requestTypes } from "./request.types";
const toaster = require("../../../web/components/toaster/index");
const INITIAL_STATE = {
  sider: false,
  requests: [],
  replies: {},
  status: {},
  selectedFilters: {},
  detailModal: false,
  openThread: {},
  replyModal: false,
  currentStatus: "",
};

const request = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_REQUEST_THREAD_FAILURE":
    case "ADD_REQUEST_FAILURE":
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error(
          "Notification Message",
          action.payload.result.ExceptionMessage,
          { timeOut: 500000 }
        );
      return {
        ...state,
      };
    case "ADD_REQUEST_THREAD_SUCCESS":
      return {
        ...state,
        replyModal: false,
      };
    case "OPEN_REPLY_MODAL_REQUEST":
      return {
        ...state,
        replyModal: true,
      };
    case "CLOSE_REPLY_MODAL":
      return {
        ...state,
        replyModal: false,
        modal: false,
      };
    case "SET_REQUEST_FILTERS":
      let current = state.selectedFilters[action.payload.from]
        ? state.selectedFilters[action.payload.from]
        : [];
      if (action.payload.clearOld) {
        current = [];
      }
      if (!action.payload.checked) {
        if (!current.find((i) => action.payload.item.Id === i.Id))
          current.push(action.payload.item);
      } else {
        current.splice(current.indexOf(action.payload.item), 1);
      }
      if (action.payload.clearAllExceptCat) {
        state.selectedFilters = {};
      }
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.payload.from]: [...current],
        },
      };
    case "FETCH_ORG_THREAD_DETAIL_START":
      return {
        ...state,
        detailModal: true,
      };
    case "CLOSE_ORG_THREAD_MODAL":
      return {
        ...state,
        detailModal: false,
      };
    case "FETCH_ORG_THREAD_DETAIL_SUCCESS":
      return {
        ...state,
        openThread: action.payload.result,
      };
    case "FETCH_REQUEST_THREAD_SUCCESS":
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.payload.Id]: action.payload.result,
        },
      };
    case "FETCH_REQUEST_STATUS_SUCCESS":
      return {
        ...state,
        status: action.payload.result.reduce((obj, item) => {
          obj[item] = item;
          return obj;
        }, {}),
      };
    case "FETCH_REQUEST_SUCCESS":
      return {
        ...state,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        requests: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item;
          return obj;
        }, {}),
      };
    case "FETCH_ORG_REQUEST_DETAIL_SUCCESS":
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.Id]: {
            ...state.requests[action.payload.Id],
            ...action.payload,
          },
        },
      };
    case "ASSIGN_REQUEST_SUCCESS":
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.result.requestId]: {
            ...state.requests[action.payload.result.requestId],
            IsOpenRequest: false,
          },
        },
      };
    case requestTypes.ADD_REQUEST_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default request;
