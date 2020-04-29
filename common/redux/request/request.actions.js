import {requestTypes} from './request.types';
export const putInitialData = collections =>({
  type:requestTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addRequestSuccess = request => ({
  type: requestTypes.ADD_REQUEST_SUCCESS,
  payload: request
});
export const addRequestThreadStart = request => ({
  type: requestTypes.ADD_REQUEST_THREAD_START,
  payload: request
});
export const addRequestThreadSuccess = request => ({
  type: requestTypes.ADD_REQUEST_THREAD_SUCCESS,
  payload: request
});
export const addRequestThreadFailure = error => ({
  type: requestTypes.ADD_REQUEST_THREAD_FAILURE,
  payload: error
});
export const fetchRequestSuccess = collections =>({
  type:requestTypes.FETCH_REQUEST_SUCCESS,
  payload:collections
});
export const fetchRequestThreadSuccess = collections =>({
  type:requestTypes.FETCH_REQUEST_THREAD_SUCCESS,
  payload:collections
});
export const fetchRequestStatusSuccess = collections =>({
  type:requestTypes.FETCH_REQUEST_STATUS_SUCCESS,
  payload:collections
});
export const addRequestFailure = error => ({
  type: requestTypes.ADD_REQUEST_FAILURE,
  payload: error
});
export const fetchRequestStart = () => ({
  type: requestTypes.FETCH_REQUEST_START
});
export const fetchRequestStatus = () =>({
  type:requestTypes.FETCH_REQUEST_STATUS_START
})
export const fetchRequestThreadStart = (Id) =>({
  type: requestTypes.FETCH_REQUEST_THREAD_START,
  payload:Id
});
export const assignRequestSuccess = (collections) =>({
  type: requestTypes.ASSIGN_REQUEST_SUCCESS,
  payload:collections
})