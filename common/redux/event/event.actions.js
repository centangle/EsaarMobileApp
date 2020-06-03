import {eventTypes} from './event.types';
export const putInitialData = collections =>({
  type:eventTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addEventSuccess = event => ({
  type: eventTypes.ADD_EVENT_SUCCESS,
  payload: event
});
export const fetchEventSuccess = collections =>({
  type:eventTypes.FETCH_EVENT_SUCCESS,
  payload:collections
});
export const fetchEventDetailSuccess = collections =>({
  type:eventTypes.FETCH_EVENT_DETAIL_SUCCESS,
  payload:collections
});
export const addEventFailure = error => ({
  type: eventTypes.ADD_EVENT_FAILURE,
  payload: error
});
export const fetchEventStart = (params) => ({
  type: eventTypes.FETCH_EVENT_START,
  params
});