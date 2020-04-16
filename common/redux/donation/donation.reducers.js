import { donationTypes } from './donation.types';
import { addItemToCart } from './donation.actions';
const INITIAL_STATE = {
    sider: false,
    cartItems: {},
    donations: []
};

const donation = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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