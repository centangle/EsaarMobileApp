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
export const fetchDonationDetailsSuccess = collections=>({
  type: donationTypes.FETCH_DONATION_DETAILS_SUCCESS,
  payload: collections
});
export const fetchDonationItemsSuccess = collections=>({
  type: donationTypes.FETCH_DONATION_ITEMS_SUCCESS,
  payload: collections
});
export const fetchThreadDetailSuccess = collection =>({
  type: donationTypes.FETCH_THREAD_DETAIL_SUCCESS,
  payload: collection
});
export const fetchDonationItemsStart = id=>({
  type: donationTypes.FETCH_DONATION_ITEMS_START,
  payload: id
});
export const fetchDonationRequestStart = (params) => ({
  type: donationTypes.FETCH_DONATION_REQUEST_START,
  params
});
export const assignRequestSuccess = collection => ({
  type: donationTypes.ADD_DONATION_REQUEST_SUCCESS,
  payload:collection
});
export const assignRequestFailure = error => ({
  type: donationTypes.ADD_DONATION_REQUEST_FAILURE,
  payload:error
})
export const fetchDonationDetailsStart = (Id)=>({
  type: donationTypes.FETCH_DONATION_DETAILS_START,
  payload:Id
});
export const fetchDonationRequestSuccess = (collections) => ({
  type: donationTypes.FETCH_DONATION_REQUEST_SUCCESS,
  payload:collections
});
export const addDonationApprovalSuccess = (collections) => ({
  type: donationTypes.ADD_DONATION_APPROVAL_SUCCESS,
  payload:collections
});
export const addDonationApprovalFailure = (error) => ({
  type: donationTypes.ADD_DONATION_APPROVAL_FAILURE,
  payload:error
});
export const fetchDonationRequestThreadStart = (Id) =>({
  type: donationTypes.FETCH_DONATION_REQUEST_THREAD_START,
  payload:Id
});
export const fetchDonationRequestThreadSuccess = (collections) =>({
  type: donationTypes.FETCH_DONATION_REQUEST_THREAD_SUCCESS,
  payload:collections
});
export const fetchDonationRequestStatus = () =>({
  type:donationTypes.FETCH_DONATION_REQUEST_STATUS_START
});

export const fetchRequestStatusSuccess = (collections)=>({
  type:donationTypes.FETCH_REQUEST_STATUS_SUCCESS,
  payload:collections
})