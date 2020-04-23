import {donationTypes} from './donation.types';
export const putInitialData = collections =>({
  type:donationTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addItemSuccess = donation => ({
  type: donationTypes.ADD_ITEM_SUCCESS,
  payload: donation
});
export const addDonationSuccess = donation => ({
  type: donationTypes.ADD_DONATION_SUCCESS,
  payload: donation
});
export const addDonationFailure = error => ({
  type: donationTypes.ADD_DONATION_FAILURE,
  payload: error
});
export const fetchDonationRequestStart = () => ({
  type: donationTypes.FETCH_DONATION_REQUEST_START
});
export const fetchDonationRequestThreadStart = (Id) =>({
  type: donationTypes.FETCH_DONATION_REQUEST_THREAD_START,
  payload:Id
});
export const fetchDonationRequestStatus = () =>({
  type:donationTypes.FETCH_DONATION_REQUEST_STATUS_START
});