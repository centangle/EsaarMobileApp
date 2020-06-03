import { donationTypes } from "./donation.types";
const toaster = require("../../../web/components/toaster/index");

const INITIAL_STATE = {
  sider: false,
  cartItems: {},
  donations: {},
  replies: {},
  status: {},
  selectedFilters: {},
  PrefferedCollectionTime: new Date(),
  AddressLatLong: "",
  detailModal: false,
  replyModal: false,
  openThread: {},
  currentStatus: "",
  current: {},
  type: "",
};

const donation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_REQUEST_THREAD_SUCCESS":
      return {
        ...state,
        replyModal: false,
      };
    case "ADD_DONATION_REQUEST_SUCCESS":
      toaster.success("Notification Message", "Request assigned successfully", {
        timeOut: 500000,
      });
      return {
        ...state,
        replyModal: false,
        donations: {
          ...state.donations,
          [action.payload.result.recordId]: {
            ...state.donations[action.payload.result.recordId],
            CanModeratorSelfAssign: false,
            CanVolunteerSelfAssign: false,
          },
        },
      };
    case "ADD_DONATION_REQUEST_FAILURE":
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error(
          "Notification Message",
          action.payload.result.ExceptionMessage,
          { timeOut: 500000 }
        );
      return {
        ...state,
      };
    case "ADD_DONATION_APPROVAL_SUCCESS":
      toaster.success(
        "Notification Message",
        "Request submitted successfully",
        {
          timeOut: 500000,
        }
      );
      return {
        ...state,
        replyModal: false,
      };
    case "OPEN_MODAL":
    case "OPEN_REPLY_MODAL":
      return {
        ...state,
        type: action.payload.type,
        replyModal: true,
        currentStatus: action.payload.status,
      };
    case "CLOSE_REPLY_MODAL":
      return {
        ...state,
        replyModal: false,
        modal: false,
        detailModal: false,
      };
    case "CHECK_USER_SESSION":
      return {
        ...state,
        AddressLatLong:
          action.payload.latitude + "," + action.payload.longitude,
      };
    case "CHANGE_DONATION_DETAILS":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "SET_DONATION_FILTERS":
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
    case "FETCH_DONATION_REQUEST_THREAD_SUCCESS":
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
    case "FETCH_THREAD_DETAIL_SUCCESS":
      return {
        ...state,
        openThread: action.payload.result,
      };
    case "FETCH_THREAD_DETAIL_START":
      return {
        ...state,
        detailModal: true,
      };
    case "CLOSE_THREAD_MODAL":
      return {
        ...state,
        detailModal: false,
      };
    case "ADD_DONATION_SUCCESS":
      toaster.success(
        "Notification Message",
        "Your request has been successfully submited.",
        { timeOut: 500000 }
      );
      return {
        ...state,
        cartItems: {},
      };
    case "FETCH_DONATION_DETAILS_SUCCESS":
      return {
        ...state,
        current: action.payload,
        donations: {
          ...state.donations,

          [action.payload.DonationRequestOrganization.Id]: {
            ...state.donations[action.payload.DonationRequestOrganization.Id],
            ...action.payload,
          },
        },
      };
    case "FETCH_DONATION_REQUEST_SUCCESS":
      return {
        ...state,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        donations: action.payload.result.reduce((obj, item) => {
          obj[item.DonationRequestOrganization.Id] = item;
          return obj;
        }, {}),
      };
    case donationTypes.QUANTITY_CHANGED:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.Id]: action.payload,
        },
      };
    case donationTypes.UNIT_CHANGED:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.Id]: action.payload,
        },
      };
    case donationTypes.ADD_DONATION_ITEM:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.Id]: state.cartItems[action.payload.Id]
            ? {
                ...state.cartItems[action.payload.Id],
                quantity: state.cartItems[action.payload.Id].quantity + 1,
              }
            : { ...action.payload, quantity: 1 },
        },
      };
    case donationTypes.REMOVE_DONATION_ITEM:
      const filtered = state.cartItems;
      delete filtered[action.payload.Id];
      return {
        ...state,
        cartItems: {
          ...filtered,
        },
      };
    case donationTypes.FETCH_ORG_DETAIL_SUCCESS:
      return {
        ...state,
        cartItems: {},
      };
    default:
      return state;
  }
};
export default donation;
