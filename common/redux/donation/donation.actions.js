import {donationTypes} from './donation.types';
export const putInitialData = collections =>({
  type:donationTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addItemSuccess = donation => ({
  type: donationTypes.ADD_ITEM_SUCCESS,
  payload: donation
});