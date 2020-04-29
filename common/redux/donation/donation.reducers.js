import { donationTypes } from './donation.types';
import { addItemToCart } from './donation.actions';
const INITIAL_STATE = {
    sider: false,
    cartItems: {},
    donations: {},
    replies:{},
    status:{}
};

const donation = (state = INITIAL_STATE, action) => {
    switch (action.type) {
            case 'FETCH_DONATION_REQUEST_THREAD_SUCCESS':
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
    case 'FETCH_DONATION_DETAILS_SUCCESS':
      return{
        ...state,
        donations:{
          ...state.donations,
          [action.payload.DonationRequestOrganization.Id]:{
            ...state.donations[action.payload.DonationRequestOrganization.Id],
            ...action.payload
          }
        }
      }
    case 'FETCH_DONATION_REQUEST_SUCCESS':
      return {
        ...state,
        donations: action.payload.result.reduce((obj, item) => {
          obj[item.DonationRequestOrganization.Id] = item
          return obj
        }, {})
      }
        case donationTypes.QUANTITY_CHANGED:
            return{
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [action.payload.Id]:action.payload
                },
            }
        case donationTypes.ADD_DONATION_ITEM:
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [action.payload.Id]: state.cartItems[action.payload.Id] ? {
                        ...state.cartItems[action.payload.Id],
                        quantity: state.cartItems[action.payload.Id].quantity + 1
                    } : { ...action.payload, quantity: 1 }
                },
            }
        case donationTypes.REMOVE_DONATION_ITEM:
          const filtered = state.cartItems;
          delete filtered[action.payload.Id];
          return{
            ...state,
            cartItems:{
              ...filtered
            }
          }
        case donationTypes.FETCH_ORG_DETAIL_SUCCESS:
            return {
                ...state,
                cartItems:{}
            }
        default:
            return state;
    }
}
export default donation;